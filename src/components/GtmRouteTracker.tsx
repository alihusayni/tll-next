'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Declare dataLayer for TypeScript
declare global {
    interface Window {
        dataLayer: Record<string, unknown>[];
    }
}

/**
 * Pushes a page_view event to window.dataLayer on every Next.js route change.
 * GTM's "Page View" trigger only fires on hard reloads. For SPA navigation
 * via <Link>, we manually push so GA4 tags inside GTM record every pageview.
 *
 * The FIRST render is skipped — GTM fires gtm.js on load which already
 * triggers the initial page view via the container's built-in DOM Ready / Window Loaded trigger.
 */
export default function GtmRouteTracker() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the initial mount — GTM's own initialisation handles the first pageview
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'page_view',
            page_path: pathname,
            page_title: document.title,
            page_location: window.location.href,
        });
    }, [pathname]);

    return null;
}
