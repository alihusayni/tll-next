import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuan Le Law",
  description: "Professional legal services provided by Tuan Le Law",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
