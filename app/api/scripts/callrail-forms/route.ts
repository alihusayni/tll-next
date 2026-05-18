import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy for CallRail's dynamically-loaded external_forms.js.
 * swap.js injects this script at runtime from js.callrail.com with a
 * timestamp query string (?t=...). Lighthouse flags it because the CDN
 * response has a short cache TTL and ships legacy polyfills.
 *
 * By routing through here we:
 *  1. Re-attach a long Cache-Control header so browsers cache it for 7 days.
 *  2. Move the request to our own origin, removing it from the 3rd-party bucket.
 *
 * The swap.js script is patched (via next.config rewrites) to call
 * /api/scripts/callrail-forms instead of js.callrail.com.
 */

const UPSTREAM_BASE = 'https://js.callrail.com';
// Cache fetched content in Next.js Data Cache for 7 days
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export const dynamic = 'force-dynamic'; // query params vary per request

export async function GET(request: NextRequest) {
  // Reconstruct the upstream URL preserving the full path + query string
  const { pathname, search } = new URL(request.url);
  // Strip our own prefix: /api/scripts/callrail-forms → keep the rest
  const upstreamPath = pathname.replace(/^\/api\/scripts\/callrail-forms/, '');
  const upstreamUrl = `${UPSTREAM_BASE}${upstreamPath || '/'}${search}`;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: {
        // Forward a plausible referer so CallRail doesn't block headless requests
        Referer: 'https://www.tuanlelaw.com/',
        'User-Agent': request.headers.get('user-agent') ?? 'Mozilla/5.0',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!upstream.ok) {
      return new NextResponse(`Upstream error: ${upstream.status}`, {
        status: 502,
      });
    }

    const script = await upstream.text();

    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Error proxying CallRail forms script', {
      status: 500,
    });
  }
}
