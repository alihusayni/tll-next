import { Metadata } from 'next';
import { Suspense } from 'react';
import ResourcesPageClient from './resources-page-client';
import { 
  getAllResourceArticles, 
  getFeaturedArticles, 
  getContentCategories 
} from '@/lib/content';
import SiteHeader from '@/components/organisms/site-header';

export const metadata: Metadata = {
  title: 'Blog | Immigration Law Resources & Insights',
  description: 'News and insights on all things related to immigration law by Tuan Le. Expert guidance on US visas, citizenship, deportation defense, and more.',
  keywords: 'immigration law blog, visa resources, immigration news, citizenship guides, deportation defense, immigration attorney insights',
  openGraph: {
    title: 'Blog | Immigration Law Resources & Insights',
    description: 'News and insights on all things related to immigration law by Tuan Le. Expert guidance on US visas, citizenship, deportation defense, and more.',
    url: 'https://www.tuanlelaw.com/resources',
    type: 'website',
    images: [
      {
        url: 'https://www.tuanlelaw.com/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tuan Le Law - Immigration Law Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Immigration Law Resources & Insights',
    description: 'News and insights on all things related to immigration law by Tuan Le.',
  },
  alternates: {
    canonical: 'https://www.tuanlelaw.com/resources',
  },
  robots: 'index,follow',
};

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper function to extract excerpt from content
function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n+/g, ' ') // Replace newlines with space
    .trim();
  
  if (plainText.length <= maxLength) return plainText;
  
  // Cut at the last complete word before maxLength
  const excerpt = plainText.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  return excerpt.substring(0, lastSpace) + '...';
}

export default function ResourcesPage() {
  // Fetch all articles
  const allArticles = getAllResourceArticles();
  
  // Fetch featured articles
  const featuredArticles = getFeaturedArticles();
  
  // Get categories
  const categories = getContentCategories();

  // Transform articles for the client component
  const transformedFeaturedArticles = featuredArticles.map(article => {
    const topLevelFolder = article.slug.split('/')[0];
    const categoryLabel = categories.find(cat => cat.id === topLevelFolder)?.label || topLevelFolder;
    
    return {
      title: article.meta.h1 || article.meta.title || '',
      categoryId: topLevelFolder, // Use ID for filtering
      category: categoryLabel, // Use label for display
      excerpt: extractExcerpt(article.content),
      date: formatDate(article.meta.publishedTime || article.meta.date || ''),
      readTime: article.meta.readTime || '5 min read',
      image: article.meta.ogImage || article.meta.imageSrc || '/assets/articles/default.png',
      link: `/${article.slug}`,
    };
  });

  const transformedAllArticles = allArticles.map(article => {
    const topLevelFolder = article.slug.split('/')[0];
    const categoryLabel = categories.find(cat => cat.id === topLevelFolder)?.label || topLevelFolder;
    
    return {
      title: article.meta.h1 || article.meta.title || '',
      categoryId: topLevelFolder, // Use ID for filtering
      category: categoryLabel, // Use label for display
      excerpt: extractExcerpt(article.content),
      date: formatDate(article.meta.publishedTime || article.meta.date || ''),
      readTime: article.meta.readTime || '5 min read',
      image: article.meta.ogImage || article.meta.imageSrc || '/assets/articles/default.png',
      link: `/${article.slug}`,
    };
  });

  return (
    <>
      <div className="bg-[#204586]">
        <div className="max-w-[1512px] mx-auto px-4 md:px-8 lg:px-16">
          <SiteHeader />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResourcesPageClient
          featuredArticles={transformedFeaturedArticles}
          allArticles={transformedAllArticles}
          categories={categories}
        />
      </Suspense>
    </>
  );
}

