import { NextRequest, NextResponse } from 'next/server';

const GA4_MEASUREMENT_ID = 'G-9CL0P20FC0';
const GA4_API_SECRET = process.env.GA4_API_SECRET || '';
const GA4_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;


// IPs to exclude — set ANALYTICS_BLOCKED_IPS in Vercel env vars (comma-separated)
const BLOCKED_IPS = (process.env.ANALYTICS_BLOCKED_IPS || "")
    .split(",")
    .map(ip => ip.trim())
    .filter(Boolean);

function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return "";
}

export async function POST(request: NextRequest) {
    try {
        // Block internal/developer IPs before forwarding to Google
        const clientIp = getClientIp(request);
        if (clientIp && BLOCKED_IPS.includes(clientIp)) {
            return new NextResponse(null, { status: 204 });
        }

        const body = await request.json();
        if (!body?.client_id || !Array.isArray(body?.events)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }
        if (body.events.length > 25) body.events = body.events.slice(0, 25);

        // Fire-and-forget — don't await so the client gets a fast 204
        const userAgent = request.headers.get('user-agent') || '';

        fetch(GA4_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(clientIp ? { 'x-forwarded-for': clientIp } : {}),
            },
            body: JSON.stringify({
                client_id: body.client_id,
                events: body.events,
                // Forward real visitor IP for accurate geographic data in GA4
                ...(clientIp ? { user_ip_override: clientIp } : {}),
                // Forward user agent for device/browser detection
                ...(userAgent ? { user_agent: userAgent } : {}),
            }),
        }).catch(() => {});

        return new NextResponse(null, { status: 204 });
    } catch {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
}
