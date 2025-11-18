import { notFound } from 'next/navigation';
import InternalTemplate from '@/templates/internal-template';
import { getContentBySlug, generateStaticParams as generateContentPaths } from '@/lib/content';
import type { Metadata } from 'next';
import Script from 'next/script';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return generateContentPaths();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const content = getContentBySlug(slugPath);

  if (!content) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const { meta } = content;
  const title = meta.metaTitle || meta.h1 || meta.title || 'Untitled';
  const description = meta.metaDescription || meta.summary || meta.description || '';
  const ogImage = meta.ogImage || meta.imageSrc;
  const canonicalUrl = `https://www.tuanlelaw.com/${slugPath}`;

  return {
    title,
    description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.ogTitle || title,
      description: meta.ogDescription || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url: canonicalUrl,
      type: 'article',
      publishedTime: meta.publishedTime,
      modifiedTime: meta.modifiedTime,
      authors: meta.author ? [meta.author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle || title,
      description: meta.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: meta.robots || 'index,follow',
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const content = getContentBySlug(slugPath);

  if (!content) {
    notFound();
  }

  const { meta } = content;
  const title = meta.metaTitle || meta.h1 || meta.title || 'Untitled';
  const description = meta.metaDescription || meta.summary || meta.description || '';
  const ogImage = meta.ogImage || meta.imageSrc;
  const canonicalUrl = `https://www.tuanlelaw.com/${slugPath}`;

  // Generate breadcrumb list
  const breadcrumbList = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.tuanlelaw.com"
    }
  ];

  let currentPath = '';
  slug.forEach((segment, index) => {
    currentPath += '/' + segment;
    const segmentName = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
    breadcrumbList.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": segmentName,
      "item": `https://www.tuanlelaw.com${currentPath}`
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": ogImage ? [ogImage] : undefined,
    "author": meta.author ? {
      "@type": "Person",
      "name": meta.author
    } : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "Tuan Le Law",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tuanlelaw.com/assets/logo/Logo-Blue.png"
      }
    },
    "datePublished": meta.publishedTime,
    "dateModified": meta.modifiedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>
      <InternalTemplate content={content} slug={slugPath} />
    </>
  );
}