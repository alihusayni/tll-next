import { NextResponse } from 'next/server';

const UPSTREAM_URL =
  'https://cdn.callrail.com/companies/279209440/d53c12ea0f73fbb1a92b/12/swap.js';
export const revalidate = 604800; // 7 days

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM_URL, {
      next: { revalidate: 604800 },
    });

    if (!upstream.ok) {
      return new NextResponse('Failed to fetch CallRail script', { status: 502 });
    }

    let script = await upstream.text();

    // Patch: redirect any js.callrail.com requests through our own proxy so
    // external_forms.js is also served with a long cache-control header.
    script = script.replaceAll(
      'https://js.callrail.com',
      '/api/scripts/callrail-forms'
    );

    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Error proxying CallRail script', { status: 500 });
  }
}
