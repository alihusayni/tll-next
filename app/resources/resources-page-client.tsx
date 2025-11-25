'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogArticleCard from '@/components/molecules/blog-article-card';
import BlogArticleListItem from '@/components/molecules/blog-article-list-item';
import BlogCategoryFilter from '@/components/molecules/blog-category-filter';
import Pagination from '@/components/atoms/pagination';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';

interface Article {
  title: string;
  categoryId: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
}

interface Category {
  id: string;
  label: string;
}

interface ResourcesPageClientProps {
  featuredArticles: Article[];
  allArticles: Article[];
  categories: Category[];
}

export default function ResourcesPageClient({
  featuredArticles,
  allArticles,
  categories,
}: ResourcesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'all-articles';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const articlesPerPage = 10;

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all-articles') {
      return allArticles;
    }
    return allArticles.filter(article => article.categoryId === activeCategory);
  }, [activeCategory, allArticles]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
    
    // Update URL
    const params = new URLSearchParams();
    if (categoryId !== 'all-articles') {
      params.set('category', categoryId);
    }
    router.push(`/resources?${params.toString()}`, { scroll: false });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Update URL
    const params = new URLSearchParams();
    if (activeCategory !== 'all-articles') {
      params.set('category', activeCategory);
    }
    if (page !== 1) {
      params.set('page', page.toString());
    }
    router.push(`/resources?${params.toString()}`, { scroll: true });
    
    // Scroll to top of recent articles section
    const recentSection = document.getElementById('recent-articles');
    if (recentSection) {
      recentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <div className="bg-[#E8EDF2] flex flex-col items-center min-h-screen w-full">
      {/* Blog Hub Section */}
      <div className="bg-[#E8EDF2] box-border flex flex-col gap-8 items-center pb-16 pt-8 px-4 md:px-8 lg:px-16 relative shrink-0 w-full max-w-[1512px]">
        {/* Title & Description */}
        <div className="flex flex-col gap-8 items-start px-0 py-8 w-full">
          <p className="font-inter-tight font-semibold text-5xl md:text-7xl lg:text-[92px] leading-tight md:leading-[60px] lg:leading-[72px] tracking-[-0.02em] text-[#071C32] max-w-[496px]">
            Blog
          </p>
          <p className="font-inter-tight font-medium text-lg md:text-xl lg:text-2xl leading-[22px] text-[#747D85] w-full">
            News and insights on all things related to law by Tuan le
          </p>
        </div>

        {/* Category Filter */}
        <BlogCategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Featured Articles */}
        <div className="box-border flex flex-col items-center pb-0 pt-8 px-0 w-full">
          <div className="box-border flex flex-col gap-8 items-start pb-8 pt-0 px-0 w-full">
            <div className="flex flex-col gap-8 items-start max-w-[1728px] overflow-hidden w-full">
              {/* Featured Articles Title */}
              <div className="flex flex-wrap gap-8 md:gap-16 items-end justify-end max-w-[1728px] w-full">
                <div className="flex flex-[1_0_0] flex-col gap-8 md:gap-[50px] items-start min-h-px min-w-[280px]">
                  <div className="flex flex-col gap-5 items-start w-full">
                    <p className="font-inter-tight font-semibold text-3xl md:text-4xl lg:text-[52px] leading-tight md:leading-[50px] lg:leading-[60px] tracking-[-0.02em] text-[#071C32] max-w-[496px] w-full">
                      Featured Articles
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                {featuredArticles.map((article, index) => (
                  <BlogArticleCard
                    key={index}
                    title={article.title}
                    category={article.category}
                    date={article.date}
                    readTime={article.readTime}
                    image={article.image}
                    link={article.link}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Articles Section */}
          <div
            id="recent-articles"
            className="box-border flex flex-col gap-8 items-start max-w-[1024px] px-0 py-8 md:py-16 lg:py-32 w-full"
          >
            <div className="flex flex-col gap-8 items-start max-w-[1728px] overflow-hidden w-full">
              {/* Recent Articles Title */}
              <div className="border-b border-[#D2D5D9] box-border flex flex-wrap gap-0 items-end justify-end max-w-[1728px] pb-4 pt-0 px-0 w-full">
                <div className="flex flex-[1_0_0] flex-col gap-8 md:gap-[50px] items-start min-h-px min-w-[280px]">
                  <div className="flex flex-col gap-5 items-start w-full">
                    <p className="font-inter-tight font-semibold text-2xl md:text-3xl lg:text-[40px] leading-tight md:leading-[45px] lg:leading-[50px] tracking-[-0.02em] text-[#071C32] max-w-[496px] w-full">
                      Recent Articles
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Articles List */}
              <div className="flex flex-col gap-8 items-center w-full">
                {paginatedArticles.length > 0 ? (
                  paginatedArticles.map((article, index) => (
                    <BlogArticleListItem
                      key={index}
                      title={article.title}
                      category={article.category}
                      excerpt={article.excerpt}
                      date={article.date}
                      readTime={article.readTime}
                      image={article.image}
                      link={article.link}
                      className="w-full"
                    />
                  ))
                ) : (
                  <p className="text-center text-[#747D85] py-8">No articles found in this category.</p>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          )}
        </div>
      </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <SiteFooter />
      </>
  );
}

