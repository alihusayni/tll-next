import { NextRequest, NextResponse } from "next/server";

const GA4_MEASUREMENT_ID = "G-9CL0P20FC0";

const BLOCKED_IPS = (process.env.ANALYTICS_BLOCKED_IPS || "")
    .split(",").map((ip: string) => ip.trim()).filter(Boolean);

function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return "";
}

export async function POST(request: NextRequest) {
    // Read secret inside handler — NOT at module level.
    // Module-level reads can cache an empty string on Vercel cold starts.
    const secret = process.env.GA4_API_SECRET ?? "";
    const GA4_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${secret}`;

    try {
        const clientIp = getClientIp(request);
        if (clientIp && BLOCKED_IPS.includes(clientIp)) {
            return new NextResponse(null, { status: 204 });
        }

        const text = await request.text();
        const body = JSON.parse(text) as { client_id?: string; events?: unknown[] };

        if (!body?.client_id || !Array.isArray(body?.events)) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        if (body.events.length > 25) {
            body.events = body.events.slice(0, 25);
        }

        const userAgent = request.headers.get("user-agent") || "";

        await fetch(GA4_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(clientIp ? { "x-forwarded-for": clientIp } : {}),
            },
            body: JSON.stringify({
                client_id: body.client_id,
                events: body.events,
                ...(clientIp ? { user_ip_override: clientIp } : {}),
                ...(userAgent ? { user_agent: userAgent } : {}),
            }),
        }).catch(() => {});

        return new NextResponse(null, { status: 204 });
    } catch {
        return new NextResponse(null, { status: 204 });
    }
}
