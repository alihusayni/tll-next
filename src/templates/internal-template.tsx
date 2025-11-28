'use client';

import ArticleHero from '@/components/organisms/article-hero';
import ArticleBody from '@/components/organisms/article-body';
import ContactSection from "@/components/organisms/contact-section";
import SiteFooter from "@/components/organisms/site-footer";
import Header from '@/components/organisms/header';

import BlogArticleCard from '@/components/molecules/blog-article-card';
import MarkdownRenderer from '@/lib/markdown-renderer';
import {Content} from '@/types/content';




interface InternalTemplateProps {
    content: Content;
    slug: string;
    categories?: Array<{ id: string; label: string }>;
    relatedArticles?: Content[];
}

function generateBreadcrumbText(slug: string): { display: string; slugs: string[] } {
    if (slug === 'index') return {display: 'Home', slugs: []};

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
    if (breadcrumbDisplayParts.length === 0) return {display: 'Home', slugs: []};

    return {display: 'Home / ' + breadcrumbDisplayParts.join(' / '), slugs: breadcrumbSlugs};
}

export default function InternalTemplate({content, slug, categories, relatedArticles = []}: InternalTemplateProps) {
    const {display: breadcrumbDisplay, slugs: breadcrumbSlugs} = generateBreadcrumbText(slug);

    // Get title from meta with fallbacks
    const title = content.meta.h1 || content.meta.title || 'Untitled';
    const description = content.meta.summary || content.meta.description || '';

    // Get image from meta with fallback
    const imageSrc = content.meta.ogImage || content.meta.imageSrc || '/assets/blog/blog_post.png';
    const imageAlt = content.meta.imageAlt || 'Featured image illustrating the article topic';

    // Get date from meta with fallback
    const rawDate = content.meta.date || content.meta.publishedTime || '';
    const date = rawDate ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(rawDate)) : '';

    // Get read time from meta
    const readTime = content.meta.readTime || '';

    return (
        <div className="bg-[#E8EDF2]">
            <Header variant="light" />
            <Header variant="sticky" />

            
            <ArticleHero
                title={title}
                subtitle={description}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                breadcrumb={{display: breadcrumbDisplay, slugs: breadcrumbSlugs}}
                date={date}
                readTime={readTime}
                author="Tuan Le"
            />
            <ArticleBody
                headings={content.headings}
                content={<MarkdownRenderer content={content.content}/>}
            />
            
            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
                <div className="bg-[#E8EDF2] border-t border-[#E1E3E5] flex flex-col items-center pb-16 pt-16 px-4 md:px-8 lg:px-16 w-full">
                    <div className="box-border flex flex-col gap-8 items-start pb-8 pt-0 px-0 w-full max-w-[86.5rem]">
                        <div className="flex flex-col gap-8 items-start max-w-[108rem] overflow-hidden w-full">
                            {/* Related Articles Title */}
                            <div className="flex flex-wrap gap-8 md:gap-16 items-end justify-end max-w-[108rem] w-full">
                                <div className="flex flex-[1_0_0] flex-col gap-8 md:gap-[3.125rem] items-start min-h-px min-w-[17.5rem]">
                                    <div className="flex flex-col gap-5 items-start w-full">
                                        <p className="font-inter-tight font-semibold text-[1.875rem] md:text-[2.25rem] lg:text-[3.25rem] leading-tight md:leading-[3.125rem] lg:leading-[3.75rem] tracking-[-0.02em] text-[#071C32] max-w-[31rem] w-full">
                                            Related Articles
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Related Articles Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                                {relatedArticles.map((article: Content) => {
                                    const title = article.meta.h1 || article.meta.title || 'Untitled';
                                    const description = article.meta.summary || article.meta.description || '';
                                    const date = article.meta.publishedTime ? new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }).format(new Date(article.meta.publishedTime)) : '';
                                    const readTime = article.meta.readTime || '';
                                    const imageSrc = article.meta.ogImage || article.meta.imageSrc || '/assets/blog/blog_post.png';
                                    const category = article.slug.split('/')[0].split('-').map((word: string) => 
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' ');

                                    return (
                                        <BlogArticleCard
                                            key={article.slug}
                                            title={title}
                                            category={category}
                                            excerpt={article.meta.description || ''}
                                            date={date}
                                            readTime={readTime}
                                            image={imageSrc}
                                            link={`/${article.slug}`}
                                            className="w-full"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <ContactSection/>
            <SiteFooter/>
        </div>
    );
}