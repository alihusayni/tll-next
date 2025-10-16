'use client';

import ArticleHero from '../components/organisms/article-hero';
import ArticleBody from '../components/organisms/article-body';
import ContactSection from "@/components/organisms/contact-section";
import SiteFooter from "@/components/organisms/site-footer";
import MarkdownRenderer from '../lib/markdown-renderer';
import { Content, Heading } from '@/types/content';

interface ArticleTemplateProps {
    content: Content;
    slug: string;
}

function generateBreadcrumb(slug: string): string {
    const parts = slug.split('-').map(part => {
        // Handle acronyms
        if (part.toUpperCase() === 'SEO' || part.toUpperCase() === 'GBP') {
            return part.toUpperCase();
        }
        // Capitalize first letter
        return part.charAt(0).toUpperCase() + part.slice(1);
    });

    return 'Home / ' + parts.join(' ');
}

function headingsToTocItems(headings: Heading[]): { href: string; label: string; isActive?: boolean }[] {
    return headings.map((heading, index) => ({
        href: `#${heading.id}`,
        label: heading.text,
        isActive: index === 0,
    }));
}

export default function ArticleTemplate({ content, slug }: ArticleTemplateProps) {
    const breadcrumb = generateBreadcrumb(slug);
    const tocItems = headingsToTocItems(content.headings);

    return (
        <div>
            <ArticleHero
                title={content.meta.title}
                subtitle={content.meta.description}
                imageSrc={content.meta.imageSrc}
                imageAlt={content.meta.imageAlt}
                breadcrumb={breadcrumb}
                date={content.meta.date}
                readTime={content.meta.readTime}
            />
            <ArticleBody tocItems={tocItems} content={<MarkdownRenderer source={content.content} />} />
            <ContactSection/>
            <SiteFooter/>
        </div>
    );
}