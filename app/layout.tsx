import type {Metadata} from "next";
import {Inter_Tight} from "next/font/google";
import "./globals.css";
import Script from "next/script";

const interTight = Inter_Tight({
    subsets: ["latin"],
    variable: "--font-inter-tight",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Tuan Le Law",
    description: "Professional legal services provided by Tuan Le Law",
};

function GoogleAnalytics(props: { gaId: string }) {
    return null;
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <Script id="clarity-script" strategy="afterInteractive">
                {`
              (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "su6z9ts9pv");
                    `}
            </Script>
            <Script src="https://cdn.callrail.com/companies/279209440/d53c12ea0f73fbb1a92b/12/swap.js"
                    strategy="lazyOnload"/>
            <GoogleAnalytics gaId="G-9CL0P20FC0"/>
        </head>
        <body className={`${interTight.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}
