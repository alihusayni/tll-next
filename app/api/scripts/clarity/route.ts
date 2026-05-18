import { NextResponse } from 'next/server';

const CLARITY_TAG_ID = 'su6z9ts9pv';
const UPSTREAM_URL = `https://www.clarity.ms/tag/${CLARITY_TAG_ID}`;
// Cache the upstream response in the Next.js Data Cache for 7 days.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export const dynamic = 'force-static';
export const revalidate = REVALIDATE_SECONDS;

export async function GET() {
  try {
    const upstream = await fetch(UPSTREAM_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!upstream.ok) {
      return new NextResponse('Failed to fetch Clarity script', { status: 502 });
    }

    const script = await upstream.text();

    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        // Tell browsers (and CDN) to cache for 7 days, allow stale-while-revalidate
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Error proxying Clarity script', { status: 500 });
  }
}
