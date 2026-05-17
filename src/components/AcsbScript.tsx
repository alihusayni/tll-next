"use client";

import Script from "next/script";

export default function AcsbScript() {
    return (
        <Script
            id="acsb-script"
            src="https://acsbapp.com/apps/app/dist/js/app.js"
            strategy="lazyOnload"
            onLoad={() => {
                // @ts-ignore
                if (typeof acsbJS !== 'undefined') {
                    // @ts-ignore
                    acsbJS.init();
                }
            }}
        />
    );
}
