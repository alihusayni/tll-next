import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from './category-page-client';
import { 
  getCategoryArticles,
  getCategoryFeaturedArticles,
  isValidCategory,
  getContentCategories,
  getContentBySlug
} from '@/lib/content';
import SiteHeader from '@/components/organisms/site-header';

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

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getContentCategories();
  
  // Filter out 'all-articles' and map to params
  return categories
    .filter(cat => cat.id !== 'all-articles')
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
  
  // Fetch featured articles for this category
  const featuredArticles = getCategoryFeaturedArticles(category);
  
  // Fetch all articles for this category
  const allArticles = getCategoryArticles(category);
  
  // Transform featured articles for the client component
  const transformedFeaturedArticles = featuredArticles.map(article => ({
    title: article.meta.h1 || article.meta.title || '',
    category: categoryLabel,
    excerpt: extractExcerpt(article.content),
    date: formatDate(article.meta.publishedTime || article.meta.date || ''),
    readTime: article.meta.readTime || '5 min read',
    image: article.meta.ogImage || article.meta.imageSrc || '/assets/articles/default.png',
    link: `/${article.slug}`,
  }));
  
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
      <div className="bg-[#204586]">
        <div className="max-w-[1512px] mx-auto px-4 md:px-8 lg:px-16">
          <SiteHeader />
        </div>
      </div>
      <CategoryPageClient
        categoryLabel={categoryLabel}
        categoryContent={categoryContent}
        categorySlug={category}
        featuredArticles={transformedFeaturedArticles}
        allArticles={transformedAllArticles}
      />
    </>
  );
}

