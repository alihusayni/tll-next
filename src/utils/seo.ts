import type { Metadata } from "next";

export function generateMetadata(
  title: string,
  description: string,
  path?: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tuanlelaw.com";
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return {
    title: `${title} | Tuan Le Law`,
    description,
    openGraph: {
      title: `${title} | Tuan Le Law`,
      description,
      url,
      siteName: "Tuan Le Law",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Tuan Le Law`,
      description,
    },
  };
}