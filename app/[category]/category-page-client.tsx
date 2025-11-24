'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import BlogArticleCard from '@/components/molecules/blog-article-card';
import BlogCategoryFilter from '@/components/molecules/blog-category-filter';
import Pagination from '@/components/atoms/pagination';
import TableOfContents from '@/components/molecules/table-of-contents';
import TestimonialQuote from '@/components/molecules/testimonial-quote';
import ConsultationCTA from '@/components/molecules/consultation-cta';
import BackToTopButton from '@/components/atoms/back-to-top-button';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';
import StickyHeader from '@/components/organisms/sticky-header';
import MainNav from '@/components/molecules/main-nav';
import HamburgerMenu from '@/components/atoms/hamburger-menu';
import Logo from '@/components/atoms/logo';
import MarkdownRenderer from '@/lib/markdown-renderer';
import { Content } from '@/types/content';

import Link from 'next/link';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const articlesPerPage = 9;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);



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
        {/* Non-sticky transparent header */}
        <header className="relative z-40 bg-transparent w-full">
          <div
              className="flex justify-between items-center px-4 py-8 md:px-8 lg:px-16 2xl:px-0 max-w-[86.5rem] mx-auto">
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
                <HamburgerMenu
                    isOpen={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                    color="bg-[#030E1A]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay - Rendered at document root */}
        {isMobileMenuOpen && createPortal(
            <div className="lg:hidden mobile-menu-overlay" style={{backgroundColor: '#00356E'}}>
              <div className="flex flex-col h-full py-8 min-h-screen">
                {/* Header with Logo and Close Button */}
                <div className="flex justify-between items-center px-4 mb-16">
                  <Link href="/"><Logo variant="White"/></Link>
                  <button
                      onClick={toggleMobileMenu}
                      className="w-8 h-8 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      aria-label="Close menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 px-4">
                  <MainNav
                      className="flex flex-col gap-2"
                      onItemClick={toggleMobileMenu}
                      mobileView={true}
                  />
                </div>

                {/* Buttons at Bottom */}
                <div className="flex flex-col gap-4 px-4 mt-8">
                  <a
                      href="tel:(714) 877 5840"
                      className="flex justify-center items-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md border-2 border-white text-white hover:bg-white hover:text-[#00356E] active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white px-8 py-6 text-lg whitespace-nowrap self-stretch"
                      style={{
                        display: 'flex',
                        height: '52px',
                        padding: '24px 32px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',
                        alignSelf: 'stretch'
                      }}
                      onClick={toggleMobileMenu}
                  >
                    <img src="/assets/icons/Vector.svg" alt="Phone" width="20" height="19" />
                    Talk to Us
                  </a>

                  <a
                      href="#contact"
                      className="flex justify-center items-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-[#E55B1E] text-white hover:bg-[#FF7031] active:bg-[#FF7031] px-8 py-6 text-lg whitespace-nowrap self-stretch"
                      style={{
                        display: 'flex',
                        height: '52px',
                        padding: '24px 32px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',
                        alignSelf: 'stretch'
                      }}
                      onClick={toggleMobileMenu}
                  >
                    30 M free consulting
                  </a>
                </div>
              </div>
            </div>,
            document.body
        )}

        <StickyHeader/>
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
