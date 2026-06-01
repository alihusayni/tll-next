'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        dataLayer?: any[];
        gtag?: (...args: any[]) => void;
        GA_LOADED?: boolean;
    }
}

export default function Analytics() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);
    const gaId = 'G-9CL0P20FC0';

    useEffect(() => {
        const loadGA = () => {
            if (window.GA_LOADED) return;
            window.GA_LOADED = true;

            // Inject the GA script tag
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            script.async = true;
            document.head.appendChild(script);

            // Initialize gtag and dataLayer
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag() {
                window.dataLayer!.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', gaId, {
                page_path: window.location.pathname,
            });
        };

        // Delay loading by 4 seconds (idle timeout)
        const timer = setTimeout(loadGA, 4000);

        // Or load immediately upon any user interaction
        const interactions = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];
        
        const triggerLoad = () => {
            loadGA();
            clearTimeout(timer);
            interactions.forEach(event => {
                window.removeEventListener(event, triggerLoad);
            });
        };

        interactions.forEach(event => {
            window.addEventListener(event, triggerLoad, { passive: true });
        });

        return () => {
            clearTimeout(timer);
            interactions.forEach(event => {
                window.removeEventListener(event, triggerLoad);
            });
        };
    }, []);

    // Track client-side route transitions
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (window.gtag) {
            window.gtag('config', gaId, {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return null;
}
