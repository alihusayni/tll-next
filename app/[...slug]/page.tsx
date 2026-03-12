import { notFound, redirect } from 'next/navigation';
import InternalTemplate from '@/templates/internal-template';
import { getContentBySlug, generateStaticParams as generateContentPaths, getRelatedArticles, isValidCategory } from '@/lib/content';
import type { Metadata } from 'next';
import Script from 'next/script';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const allPaths = generateContentPaths();
  
  // Filter out paths that are single-segment categories (should be handled by [category] route)
  return allPaths
    .filter(pathObj => {
      const path = pathObj.slug.join('/');
      const segments = path.split('/');
      // Exclude if it's a single segment that's a valid category
      if (segments.length === 1 && isValidCategory(segments[0])) {
        return false;
      }
      return true;
    });
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
  
  // Check if this is a valid category and should be handled by the category route
  if (slug.length === 1 && isValidCategory(slug[0])) {
    redirect(`/${slug[0]}`);
  }
  
  const content = getContentBySlug(slugPath);

  if (!content) {
    notFound();
  }

  const { meta } = content;
  
  // Get related articles from the same category
  const relatedArticles = getRelatedArticles(slugPath, 3);
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

  const INVALID_PATHS = [
    '/asylum-humanitarian-relief/asylum',
    '/deportation-defense',
    '/us-immigrant-visas/employment-based-immigration',
    '/citizenship-naturalization',
    '/us-nonimmigrant-visas/student-visas',
    '/us-immigrant-visas/family-based-immigration/fiance-visas',
    '/us-immigrant-visas/family-based-immigration/marriage-visas',
    '/us-immigrant-visas/employment-based-immigration/eb-1',
    '/us-immigrant-visas/employment-based-immigration/h-1b',
    '/us-immigrant-visas/diversity-visa-lottery',
  ];

  let currentPath = '';
  slug.forEach((segment, index) => {
    currentPath += '/' + segment;
    const segmentName = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
    
    // Omit the 'item' property if it's an intermediate page that doesn't exist to prevent 404s
    const breadcrumbItem: any = {
      "@type": "ListItem",
      "position": index + 2,
      "name": segmentName,
    };
    
    if (!INVALID_PATHS.includes(currentPath)) {
      breadcrumbItem.item = `https://www.tuanlelaw.com${currentPath}`;
    }
    
    breadcrumbList.push(breadcrumbItem);
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
      <InternalTemplate content={content} slug={slugPath} relatedArticles={relatedArticles} />
    </>
  );
}