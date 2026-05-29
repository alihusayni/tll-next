'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { sendPageView } from '@/lib/analytics';

export default function Analytics() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // Slight delay so the page title is updated before sending
            const timer = setTimeout(() => sendPageView(), 100);
            return () => clearTimeout(timer);
        }
        sendPageView();
    }, [pathname]);

    return null;
}
