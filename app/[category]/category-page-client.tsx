'use client';

import { useState } from 'react';
import BlogArticleCard from '@/components/molecules/blog-article-card';
import BlogArticleListItem from '@/components/molecules/blog-article-list-item';
import Pagination from '@/components/atoms/pagination';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';
import ArticleHero from '@/components/organisms/article-hero';
import ArticleBody from '@/components/organisms/article-body';
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
}

export default function CategoryPageClient({
  categoryLabel,
  categoryContent,
  categorySlug,
  featuredArticles,
  allArticles,
}: CategoryPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // Generate breadcrumb for category markdown content
  function generateBreadcrumbText(slug: string): { display: string; slugs: string[] } {
    if (slug === 'index') return { display: 'Home', slugs: [] };

    const slugParts = slug.split('/');
    const displayParts = slugParts.map(part => {
      // Handle acronyms
      if (part.toUpperCase() === 'SEO' || part.toUpperCase() === 'GBP') {
        return part.toUpperCase();
      }
      // Capitalize first letter and replace hyphens with spaces
      return part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    });

    // Exclude the last part for breadcrumbs
    const breadcrumbDisplayParts = displayParts.slice(0, -1);
    const breadcrumbSlugs = slugParts.slice(0, -1);
    if (breadcrumbDisplayParts.length === 0) return { display: 'Home', slugs: [] };

    return { display: 'Home / ' + breadcrumbDisplayParts.join(' / '), slugs: breadcrumbSlugs };
  }

  // Calculate pagination
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = allArticles.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Scroll to top of recent articles section
    const recentSection = document.getElementById('recent-articles');
    if (recentSection) {
      recentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Prepare article hero data if category content exists
  let articleHeroData = null;
  if (categoryContent) {
    const { display: breadcrumbDisplay, slugs: breadcrumbSlugs } = generateBreadcrumbText(categorySlug);
    
    const title = categoryContent.meta.h1 || categoryContent.meta.title || categoryLabel;
    const description = categoryContent.meta.summary || categoryContent.meta.description || '';
    const imageSrc = categoryContent.meta.ogImage || categoryContent.meta.imageSrc || '/assets/blog/blog_post.png';
    const imageAlt = categoryContent.meta.imageAlt || 'Featured image illustrating the article topic';
    
    const rawDate = categoryContent.meta.date || categoryContent.meta.publishedTime || '';
    const date = rawDate ? new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(rawDate)) : '';
    
    const readTime = categoryContent.meta.readTime || '';

    articleHeroData = {
      title,
      subtitle: description,
      imageSrc,
      imageAlt,
      breadcrumb: { display: breadcrumbDisplay, slugs: breadcrumbSlugs },
      date,
      readTime
    };
  }

  return (
    <>
      <div className="bg-[#E8EDF2]">
        {/* Render Article Hero and Body if category content exists */}
        {categoryContent && articleHeroData && (
          <>
            <ArticleHero
              title={articleHeroData.title}
              subtitle={articleHeroData.subtitle}
              imageSrc={articleHeroData.imageSrc}
              imageAlt={articleHeroData.imageAlt}
              breadcrumb={articleHeroData.breadcrumb}
              date={articleHeroData.date}
              readTime={articleHeroData.readTime}
            />
            <ArticleBody
              headings={categoryContent.headings}
              content={<MarkdownRenderer content={categoryContent.content} />}
            />
          </>
        )}

        {/* Category Hub Section */}
        <div className="bg-[#E8EDF2] flex flex-col items-center min-h-screen w-full">
          <div className="bg-[#E8EDF2] box-border flex flex-col gap-8 items-center pb-16 pt-0 px-4 md:px-8 lg:px-16 relative shrink-0 w-full max-w-[1512px]">
            {/* Title & Description - Only show if no category content */}
            {!categoryContent && (
              <div className="flex flex-col gap-8 items-start px-0 py-8 w-full">
                <p className="font-inter-tight font-semibold text-5xl md:text-7xl lg:text-[92px] leading-tight md:leading-[60px] lg:leading-[72px] tracking-[-0.02em] text-[#071C32] max-w-[496px]">
                  {categoryLabel}
                </p>
                <p className="font-inter-tight font-medium text-lg md:text-xl lg:text-2xl leading-[22px] text-[#747D85] w-full">
                  News and insights on all things related to law by Tuan le
                </p>
              </div>
            )}

            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
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
              </div>
            )}

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

