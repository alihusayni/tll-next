'use client';

import { useEffect, useRef } from 'react';

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

            events.forEach((e) => window.removeEventListener(e, load));
        };

        const events: (keyof WindowEventMap)[] = [
            'click',
            'scroll',
            'touchstart',
            'keydown',
        ];

        events.forEach((e) =>
            window.addEventListener(e, load, { once: true, passive: true })
        );

        const timer = setTimeout(load, 5000);

        return () => {
            clearTimeout(timer);
            events.forEach((e) => window.removeEventListener(e, load));
        };
    }, []);

    return null;
}
