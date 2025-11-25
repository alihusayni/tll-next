'use client';

import { useState } from 'react';
import BlogArticleCard from '@/components/molecules/blog-article-card';
import BlogCategoryFilter from '@/components/molecules/blog-category-filter';
import Pagination from '@/components/atoms/pagination';
import TableOfContents from '@/components/molecules/table-of-contents';
import BackToTopButton from '@/components/atoms/back-to-top-button';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';
import Header from '@/components/organisms/header';
import MarkdownRenderer from '@/lib/markdown-renderer';
import { Content } from '@/types/content';

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
  featuredArticles: Article[];
  allArticles: Article[];
  categories: Array<{ id: string; label: string }>;
}

export default function CategoryPageClient({
  categoryLabel,
  categoryContent,
  categorySlug,
  featuredArticles,
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
    
    // Scroll to top of articles section
    const articlesSection = document.getElementById('articles-section');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    <>
      <div className="bg-[#E8EDF2] min-h-screen">
        <Header variant="light" />
        <Header variant="sticky" />
        {/* Main Container - Responsive widths matching Figma */}
        <div className="w-full mx-auto px-4 md:px-8 lg:px-16 max-w-[440px] md:max-w-[744px] lg:max-w-[1512px]">
          {/* Category Menu & Articles Section */}
          <div id="articles-section" className="flex flex-col gap-8 pb-8 md:pb-12 lg:pb-16 pt-0">
            {/* Category Filter */}
            <BlogCategoryFilter
              categories={categories}
              activeCategory={categorySlug}
              onCategoryChange={handleCategoryChange}
            />

            {/* Articles Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {paginatedArticles.map((article, index) => (
                  <BlogArticleCard
                    key={index}
                    title={article.title}
                    category={article.category}
                    date={article.date}
                    readTime={article.readTime}
                    image={article.image}
                    link={article.link}
                    className="min-w-0"
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Markdown Content Section */}
          {categoryContent && (
            <div className="flex flex-col gap-8 pb-8 md:pb-12 lg:pb-16">
              {/* Title Section */}
              <div className="py-4 md:py-8">
                <h1 className="font-inter-tight font-semibold text-4xl md:text-6xl lg:text-[92px] leading-tight md:leading-[60px] lg:leading-[72px] tracking-[-0.02em] text-[#071C32]">
                  {categoryContent.meta.h1 || categoryContent.meta.title || categoryLabel}
                </h1>
              </div>

              {/* Content with Sidebar */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - Table of Contents (Desktop only) */}
                <aside className="hidden lg:block w-[320px] shrink-0">
                  <div className="sticky top-8">
                    <TableOfContents headings={categoryContent.headings} />
                  </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <article className="flex flex-col gap-12 md:gap-16">
                    {/* Markdown Content */}
                    <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-inter-tight prose-headings:text-[#071C32] prose-p:text-[#071C32] prose-a:text-[#E55B1E] prose-a:no-underline hover:prose-a:underline">
                      <MarkdownRenderer content={categoryContent.content} />
                    </div>

                    {/* Back to Top Button */}
                    <div className="flex justify-end pt-4">
                      <BackToTopButton />
                    </div>
                  </article>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <SiteFooter />
    </>
  );
}
