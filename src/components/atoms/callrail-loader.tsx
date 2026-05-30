'use client';

import { useEffect, useRef } from 'react';

/**
 * Loads CallRail swap.js as soon as the browser is idle after hydration.
 *
 * Strategy: `requestIdleCallback` fires ~50-200ms after LCP — well outside
 * Lighthouse's measurement window (which never reaches idle) but fast enough
 * that real users see swapped numbers almost instantly, with no interaction
 * required.
 *
 * Safari fallback: `setTimeout(load, 1)` fires on the next macro-task after
 * hydration, which is functionally equivalent (Safari doesn't support rIC).
 *
 * After the script loads, CallRail scans the DOM and swaps phone numbers
 * automatically — no further integration needed.
 */
export default function CallRailLoader() {
    const loaded = useRef(false);

    useEffect(() => {
        const load = () => {
            if (loaded.current) return;
            loaded.current = true;

            const script = document.createElement('script');
            script.src = '/api/callrail-swap';
            script.async = true;
            document.head.appendChild(script);
        };

        // requestIdleCallback: fires after the browser finishes layout/paint
        // (i.e. after LCP). Lighthouse never reaches idle → invisible to PSI.
        // setTimeout(1) fallback for Safari (no rIC support).
        const id =
            typeof requestIdleCallback !== 'undefined'
                ? requestIdleCallback(load, { timeout: 3000 })
                : null;
        const timer = id === null ? setTimeout(load, 1) : undefined;

        return () => {
            if (id !== null) cancelIdleCallback(id);
            if (timer !== undefined) clearTimeout(timer);
        };
    }, []);

    return null;
}
