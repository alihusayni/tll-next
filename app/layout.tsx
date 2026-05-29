import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google";

import "./globals.css";
import Script from "next/script";
import AcsbScript from "@/components/AcsbScript";
import { GoogleAnalytics } from '@next/third-parties/google';

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
                {/*
                  No manual preconnects or image preloads needed:
                  - fonts.googleapis/gstatic: Next.js self-hosts Google Fonts (/_next/static/media/) — those origins are never contacted.
                  - Blob CDN preconnect: hero image goes through /_next/image (same Vercel origin), not direct Blob.
                  - Image preload: <Image priority fetchPriority="high"> in HeroSection auto-generates a complete
                    preload covering all deviceSizes (640w, 750w, 828w, 1080w, ...). A second manual preload
                    starting at 828w caused TWO simultaneous fetches on 375px@2x mobile — competing for bandwidth.
                */}

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

                <GoogleAnalytics gaId="G-9CL0P20FC0" />
            </head>
            <body className={`${interTight.variable} ${inter.variable} antialiased`}>

                {children}

            </body>
        </html>
    );
}
