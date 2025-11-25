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
      <div className="bg-[#E8EDF2] box-border flex flex-col gap-8 items-center pb-16 pt-8 px-4 sm:px-8 lg:px-16 2xl:px-0 relative shrink-0 w-full max-w-[86.5rem]">
        {/* Title & Description */}
        <div className="flex flex-col gap-8 items-start px-0 py-8 w-full">
          <p className="font-inter-tight font-semibold text-[3.25rem] lg:text-[5.75rem] leading-tight md:leading-[3.75rem] lg:leading-[4.5rem] tracking-[-0.115rem] text-[#071C32] max-w-[31rem]">
            Blog
          </p>
          <p className="font-inter-tight font-medium text-xl lg:text-2xl leading-[1.75rem] text-[#747D85] w-full">
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
            <div className="flex flex-col gap-8 items-start max-w-[86.5rem]l overflow-hidden w-full">
              {/* Featured Articles Title */}
              <div className="flex flex-wrap gap-8 md:gap-16 items-end justify-end max-w-[86.5rem] w-full">
                <div className="flex flex-[1_0_0] flex-col gap-8 md:gap-[3.125rem] items-start min-h-px min-w-[17.5rem]">
                  <div className="flex flex-col gap-5 items-start w-full">
                    <p className="font-inter-tight font-semibold text-[2.125rem] lg:text-[3.25rem] leading-[2.625rem] lg:leading-[3.75rem] tracking-[-0.043rem] lg:tracking-[-0.065rem] text-[#071C32] max-w-[31rem] w-full">
                      Featured Articles
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured Articles Grid */}
              <div className="flex gap-4 sm:gap-8 w-full overflow-x-auto scrollbar-hide">
                {featuredArticles.map((article, index) => (
                  <BlogArticleCard
                    key={index}
                    title={article.title}
                    category={article.category}
                    date={article.date}
                    readTime={article.readTime}
                    image={article.image}
                    link={article.link}
                    className="min-w-[23.5rem] lg:min-w-[27.5rem]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Articles Section */}
          <div
            id="recent-articles"
            className="box-border flex flex-col gap-8 items-start max-w-4xl px-0 py-8 md:py-16 lg:py-32 w-full"
          >
            <div className="flex flex-col gap-8 items-start max-w-7xl overflow-hidden w-full">
              {/* Recent Articles Title */}
              <div className="border-b border-[#D2D5D9] box-border flex flex-wrap gap-0 items-end justify-end max-w-7xl pb-4 pt-0 px-0 w-full">
                <div className="flex flex-[1_0_0] flex-col gap-8 md:gap-[3.125rem] items-start min-h-px min-w-[17.5rem]">
                  <div className="flex flex-col gap-5 items-start w-full">
                    <p className="font-inter-tight font-semibold text-2xl md:text-3xl lg:text-[2.5rem] leading-tight md:leading-[2.8125rem] lg:leading-[3.125rem] tracking-[-0.02em] text-[#071C32] max-w-[31rem] w-full">
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

