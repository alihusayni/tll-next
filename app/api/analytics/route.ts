import { NextRequest, NextResponse } from 'next/server';

const GA4_MEASUREMENT_ID = 'G-9CL0P20FC0';
const GA4_API_SECRET = process.env.GA4_API_SECRET || '';
const GA4_ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body?.client_id || !Array.isArray(body?.events)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }
        if (body.events.length > 25) body.events = body.events.slice(0, 25);

        // Fire-and-forget — don't await so the client gets a fast 204
        fetch(GA4_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: body.client_id, events: body.events }),
        }).catch(() => {});

        return new NextResponse(null, { status: 204 });
    } catch {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
}
