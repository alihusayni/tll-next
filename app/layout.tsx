import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google";

import "./globals.css";
import Script from "next/script";
import AcsbScript from "@/components/AcsbScript";

const interTight = Inter_Tight({
    subsets: ["latin"],
    variable: "--font-inter-tight",
    display: "swap",
});
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "optional",
});

export const metadata: Metadata = {
    title: "Expert Immigration Lawyer in Orange County, CA | Tuan Le Law",
    description: "Get professional immigration legal services from Tuan Le Law in Orange County, CA. Specializing in visas, green cards, asylum, and citizenship applications.",
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { other: { 'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
        : {}),
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Preconnect to third-party origins to reduce connection latency */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* Preconnect to image CDN so the TCP+TLS handshake completes before the LCP image loads */}
                <link rel="preconnect" href="https://qxwyml8xuwxdgws0.public.blob.vercel-storage.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://acsbapp.com" />
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    strategy="afterInteractive"
                >
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LegalService",
                        "name": "Tuan Le Law",
                        "description": "Professional immigration legal services specializing in visas, green cards, asylum, and citizenship applications.",
                        "url": "https://www.tuanlelaw.com",
                        "telephone": "+1-714-877-5840",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Orange",
                            "addressRegion": "CA",
                            "addressCountry": "US"
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "United States"
                        },
                        "serviceType": [
                            "Immigration Law",
                            "Visa Applications",
                            "Green Card Applications",
                            "Asylum Applications",
                            "Citizenship Applications",
                            "Deportation Defense"
                        ],
                        "priceRange": "$$"
                    })}
                </Script>
                <AcsbScript />

                {/* Google Tag Manager \u2014 lazyOnload: fires after page is fully idle */}
                <Script
                    id="gtm-script"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KP4TXX5K');`,
                    }}
                />
            </head>
            <body className={`${interTight.variable} ${inter.variable} antialiased`}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-KP4TXX5K"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {children}
            </body>
        </html>
    );
}
