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
    display: "swap",
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
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.clarity.ms" />
                <link rel="dns-prefetch" href="https://cdn.callrail.com" />
                <link rel="dns-prefetch" href="https://acsbapp.com" />
                <Script id="clarity-script" strategy="afterInteractive">
                    {`
              (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "su6z9ts9pv");
                    `}
                </Script>
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    strategy="beforeInteractive"
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
                <Script src="https://cdn.callrail.com/companies/279209440/d53c12ea0f73fbb1a92b/12/swap.js"
                    strategy="lazyOnload" />
                <AcsbScript />

                {/* GA4 — lazyOnload keeps gtag off the critical render path */}
                <Script
                    id="_next-ga-init"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window['dataLayer'] = window['dataLayer'] || [];
                            function gtag(){window['dataLayer'].push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-9CL0P20FC0');
                        `,
                    }}
                />
                <Script
                    id="_next-ga"
                    strategy="lazyOnload"
                    src="https://www.googletagmanager.com/gtag/js?id=G-9CL0P20FC0"
                />
            </head>
            <body className={`${interTight.variable} ${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
