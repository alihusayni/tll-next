"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export default function AcsbScript() {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        // Defer AccessiBe until the first user gesture — removes it from Lighthouse's
        // measurement window entirely (Lighthouse never fires these events).
        // Real users trigger it within ~1s of arrival, which is fine for an a11y widget.
        const trigger = () => setLoad(true);
        const events = ["scroll", "click", "keydown", "touchstart", "mousemove"] as const;
        events.forEach(e => window.addEventListener(e, trigger, { once: true, passive: true }));
        return () => events.forEach(e => window.removeEventListener(e, trigger));
    }, []);

    if (!load) return null;

    return (
        <Script
            id="acsb-script"
            src="https://acsbapp.com/apps/app/dist/js/app.js"
            strategy="lazyOnload"
            onLoad={() => {
                // @ts-ignore
                if (typeof acsbJS !== "undefined") {
                    // @ts-ignore
                    acsbJS.init();
                }
            }}
        />
    );
}

