'use client';

import { useState } from 'react';
import BlogCategoryCard from '@/components/molecules/blog-category-card';
import BlogCategoryFilter from '@/components/molecules/blog-category-filter';
import Pagination from '@/components/atoms/pagination';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';
import Header from '@/components/organisms/header';
import MarkdownRenderer from '@/lib/markdown-renderer';
import { Content } from '@/types/content';
import ArticleBody from '@/components/organisms/article-body';

interface Article {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
}

interface CategoryPageClientProps {
  categoryLabel: string;
  categoryContent: Content | null;
  categorySlug: string;
  allArticles: Article[];
  categories: Array<{ id: string; label: string }>;
}

export default function CategoryPageClient({
  categoryLabel,
  categoryContent,
  categorySlug,
  allArticles,
  categories,
}: CategoryPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;



  // Calculate pagination
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = allArticles.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Scroll to top of page, accounting for sticky header
    const headerHeight = 80; // Approximate header height
    window.scrollTo({
      top: headerHeight,
      behavior: 'smooth'
    });
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all-articles') {
      window.location.href = '/resources';
    } else {
      window.location.href = `/${categoryId}`;
    }
  };

  return (
    <div className="bg-[#E8EDF2]">
      <Header variant="light" />
      <Header variant="sticky" />
      
      {/* Category Filter Section - Background extends to infinity */}
      <section className="bg-[#E8EDF2] pt-8 px-4 md:px-8 lg:px-16 2xl:px-0 m-0">
        <div className="max-w-[86.5rem] mx-auto">
          <BlogCategoryFilter
            categories={categories}
            activeCategory={categorySlug}
            onCategoryChange={handleCategoryChange}
            infinityBorder={true}
            showBorder={paginatedArticles.length === 0}
          />
        </div>
      </section>

      {/* Articles Section - Background extends to infinity */}
      {paginatedArticles.length > 0 && (
        <section id="articles-section" className="bg-[#E1E6EB] lg:py-8 px-4 sm:px-8 lg:px-16 2xl:px-0 m-0 relative">
           {/* Border extending to infinity */}
           <div className="absolute left-0 right-0 top-0 h-px bg-[#D2D5D9] z-0"></div>
          <div className="max-w-[86.5rem] mx-auto">
            {/* Articles Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            <div className="flex flex-col pt-4 sm:pt-8 gap-10">
              <div className="flex flex-wrap gap-4 justify-start">
                {paginatedArticles.map((article, index) => (
                  <BlogCategoryCard
                    key={index}
                    title={article.title}
                    date={article.date}
                    readTime={article.readTime}
                    image={article.image}
                    link={article.link}
                    className="w-full lg:w-[calc(33.333%-0.667rem)]"
                  />
                ))}
                {/* Add placeholder cards only when paginating within same category to maintain height */}
                {totalPages > 1 && Array.from({ length: Math.max(0, 9 - paginatedArticles.length) }).map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="flex gap-4 p-4 rounded-[1rem] min-w-0 flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] opacity-0 pointer-events-none h-[7.625rem]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Pagination - Only show when there are multiple pages */}
              {totalPages > 1 && (
                <div className="flex justify-center pb-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Markdown Content Section */}
      {categoryContent && (
        <>
          {/* Simple Title Section */}
          <section className="bg-[#E8EDF2] py-8 px-4 md:px-8 lg:px-16 2xl:px-0 m-0">
            <div className="max-w-[86.5rem] mx-auto">
              <div className="py-4 md:py-8">
                <h1 className="font-inter-tight font-semibold text-[2.25rem] md:text-[3.75rem] lg:text-[5.75rem] leading-tight md:leading-[3.75rem] lg:leading-[6.125rem] tracking-[-0.02em] text-[#071C32]">
                  {categoryContent.meta.h1 || categoryContent.meta.title || categoryLabel}
                </h1>
              </div>
            </div>
          </section>
          <ArticleBody
            headings={categoryContent.headings}
            content={<MarkdownRenderer content={categoryContent.content} />}
          />
        </>
      )}

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
