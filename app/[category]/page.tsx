import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from './category-page-client';
import {
  getCategoryArticles,
  isValidCategory,
  getContentCategories,
  getContentBySlug
} from '@/lib/content';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
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

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getContentCategories();

  // Filter out 'all-articles' and 'resources' (handled by static route) and map to params
  return categories
    .filter(cat => cat.id !== 'all-articles' && cat.id !== 'resources')
    .map(cat => ({
      category: cat.id,
    }));
}

// Generate metadata for the category page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  if (!isValidCategory(category)) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }
  
  const categories = getContentCategories();
  const categoryData = categories.find(cat => cat.id === category);
  const categoryLabel = categoryData?.label || category;
  
  return {
    title: `${categoryLabel} | Immigration Law Resources & Insights`,
    description: `News and insights on ${categoryLabel.toLowerCase()} by Tuan Le. Expert guidance on US visas, citizenship, deportation defense, and more.`,
    keywords: `${categoryLabel}, immigration law, visa resources, immigration news, immigration attorney insights`,
    openGraph: {
      title: `${categoryLabel} | Immigration Law Resources & Insights`,
      description: `News and insights on ${categoryLabel.toLowerCase()} by Tuan Le. Expert guidance on US visas, citizenship, deportation defense, and more.`,
      url: `https://www.tuanlelaw.com/${category}`,
      type: 'website',
      images: [
        {
          url: 'https://www.tuanlelaw.com/assets/og-image.png',
          width: 1200,
          height: 630,
          alt: `Tuan Le Law - ${categoryLabel}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryLabel} | Immigration Law Resources & Insights`,
      description: `News and insights on ${categoryLabel.toLowerCase()} by Tuan Le.`,
    },
    alternates: {
      canonical: `https://www.tuanlelaw.com/${category}`,
    },
    robots: 'index,follow',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Exclude "resources" from dynamic routing (handled by static route)
  if (category === 'resources') {
    notFound();
  }

  // Check if category is valid
  if (!isValidCategory(category)) {
    notFound();
  }
  
  // Get category label
  const categories = getContentCategories();
  const categoryData = categories.find(cat => cat.id === category);
  const categoryLabel = categoryData?.label || category;
  
  // Try to fetch markdown content for the category
  const categoryContent = getContentBySlug(category);
  

  // Fetch all articles for this category
  const allArticles = getCategoryArticles(category);
  

  
  // Transform all articles for the client component
  const transformedAllArticles = allArticles.map(article => ({
    title: article.meta.h1 || article.meta.title || '',
    category: categoryLabel,
    excerpt: extractExcerpt(article.content),
    date: formatDate(article.meta.publishedTime || article.meta.date || ''),
    readTime: article.meta.readTime || '5 min read',
    image: article.meta.ogImage || article.meta.imageSrc || '/assets/articles/default.png',
    link: `/${article.slug}`,
  }));
  
  return (
    <>
      <CategoryPageClient
        categoryLabel={categoryLabel}
        categoryContent={categoryContent}
        categorySlug={category}
        allArticles={transformedAllArticles}
        categories={categories}
      />
    </>
  );
}

