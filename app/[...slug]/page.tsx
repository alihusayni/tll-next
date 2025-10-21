import { notFound } from 'next/navigation';
import InternalTemplate from '@/templates/internal-template';
import { getContentBySlug, generateStaticParams as generateContentPaths } from '@/lib/content';
import type { Metadata } from 'next';

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

  return {
    title,
    description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle || title,
      description: meta.ogDescription || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
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

  return <InternalTemplate content={content} slug={slugPath} />;
}