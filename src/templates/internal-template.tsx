'use client';

import ArticleHero from '@/components/organisms/article-hero';
import ArticleBody from '@/components/organisms/article-body';
import ContactSection from "@/components/organisms/contact-section";
import SiteFooter from "@/components/organisms/site-footer";
import StickyHeader from '@/components/organisms/sticky-header';
import MainNav from '@/components/molecules/main-nav';
import HamburgerMenu from '@/components/atoms/hamburger-menu';
import BlogCategoryFilter from '@/components/molecules/blog-category-filter';
import BlogArticleCard from '@/components/molecules/blog-article-card';
import MarkdownRenderer from '@/lib/markdown-renderer';
import Logo from '@/components/atoms/logo';
import Link from 'next/link';
import {Content} from '@/types/content';
import {useState, useEffect} from 'react';
import {createPortal} from 'react-dom';



interface InternalTemplateProps {
    content: Content;
    slug: string;
    categories?: Array<{ id: string; label: string }>;
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

export default function InternalTemplate({content, slug, categories}: InternalTemplateProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all-articles');
    const [categoriesState, setCategoriesState] = useState<Array<{ id: string; label: string }>>([]);

    const {display: breadcrumbDisplay, slugs: breadcrumbSlugs} = generateBreadcrumbText(slug);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
    };

    useEffect(() => {
        // Use categories from props if provided, otherwise use empty array
        if (categories) {
            setCategoriesState(categories);
        }
    }, [categories]);

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
            {/* Non-sticky transparent header */}
            <header className="relative z-40 bg-transparent w-full">
                <div
                    className="flex justify-between items-center px-4 py-8 md:px-8 lg:px-16 xl:px-0 max-w-[86.5rem] mx-auto">
                    <Link href="/"><Logo variant="Blue"/></Link>
                    <div className="flex items-center gap-8">
                        <div className="hidden lg:flex">
                            <MainNav className="flex gap-10" customTextColor="text-[#030E1A]"/>
                        </div>
                        <a href="tel:(714) 877 5840"
                           className="hidden lg:flex items-center group justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 border-[#071C32] text-[#071C32] hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white px-6 py-4 text-base h-12 whitespace-nowrap">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" className="fill-[#071C32] group-hover:fill-white">
                                <path
                                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                                        fill="currentColor"/>
                                </svg>
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
            
            <BlogCategoryFilter
                categories={categoriesState}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                className="w-full mb-16 max-w-[86.5rem] mx-auto justify-center"
            />
            
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
            <div className="bg-[#E8EDF2] box-border flex flex-col items-center pb-16 pt-16 px-4 md:px-8 lg:px-16 w-full">
                <div className="box-border flex flex-col gap-8 items-start pb-8 pt-0 px-0 w-full max-w-[1512px]">
                    <div className="flex flex-col gap-8 items-start max-w-[1728px] overflow-hidden w-full">
                        {/* Related Articles Title */}
                        <div className="flex flex-wrap gap-8 md:gap-16 items-end justify-end max-w-[1728px] w-full">
                            <div className="flex flex-[1_0_0] flex-col gap-8 md:gap-[50px] items-start min-h-px min-w-[280px]">
                                <div className="flex flex-col gap-5 items-start w-full">
                                    <p className="font-inter-tight font-semibold text-3xl md:text-4xl lg:text-[52px] leading-tight md:leading-[50px] lg:leading-[60px] tracking-[-0.02em] text-[#071C32] max-w-[496px] w-full">
                                        Related Articles
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Related Articles Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full">
                            {/* Sample related articles - these should be fetched based on category/tags */}
                            <BlogArticleCard
                                title="Understanding the EB-2 Visa Requirements"
                                category="US Immigrant Visas"
                                date="March 15, 2025"
                                readTime="8 min read"
                                image="/assets/articles/article1.png"
                                link="/resources/us-immigrant-visas/understanding-eb-2-visa-requirements"
                                className="w-full"
                            />
                            <BlogArticleCard
                                title="How to Prepare for Your Immigration Interview"
                                category="US Visas"
                                date="March 10, 2025"
                                readTime="12 min read"
                                image="/assets/articles/article2.png"
                                link="/resources/us-visas/prepare-immigration-interview"
                                className="w-full"
                            />
                            <BlogArticleCard
                                title="Common Mistakes in USCIS Applications"
                                category="Resources"
                                date="March 5, 2025"
                                readTime="10 min read"
                                image="/assets/articles/article3.png"
                                link="/resources/common-mistakes-uscis-applications"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <ContactSection/>
            <SiteFooter/>
        </div>
    );
}