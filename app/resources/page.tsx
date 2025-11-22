import { Metadata } from 'next';
import { Suspense } from 'react';
import ResourcesPageClient from './resources-page-client';
import { 
  getAllResourceArticles, 
  getFeaturedArticles, 
  getContentCategories 
} from '@/lib/content';
import StickyHeader from '@/components/organisms/sticky-header';
import MainNav from '@/components/molecules/main-nav';
import HamburgerMenu from '@/components/atoms/hamburger-menu';
import Logo from '@/components/atoms/logo';
import Link from 'next/link';

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
      {/* Non-sticky transparent header */}
      <header className="relative z-40 bg-[#E8EDF2] w-full">
        <div
            className="flex justify-between items-center px-4 py-8 md:px-8 lg:px-16 xl:px-0 max-w-[86.5rem] mx-auto">
            <Link href="/"><Logo variant="Blue"/></Link>
            <div className="flex items-center gap-8">
                <div className="hidden lg:flex">
                    <MainNav className="flex gap-10" customTextColor="text-[#030E1A]"/>
                </div>
                <a href="tel:(714) 877 5840"
                   className="hidden lg:flex items-center group justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 border-[#071C32] text-[#071C32] hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white px-6 py-4 text-base h-12 whitespace-nowrap">

                    <img src="/assets/icons/Vector.svg" alt="Phone" width="20" height="19" className="group-hover:invert" />

                    Talk to Us
                </a>

                {/* Mobile Hamburger Menu */}
                <div className="lg:hidden">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21M3 6H21M3 18H21" stroke="#030E1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
      </header>

      <StickyHeader/>
      
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

