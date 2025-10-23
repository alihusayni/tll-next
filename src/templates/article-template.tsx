import ArticleHero from '../components/organisms/article-hero';
import ArticleBody from '../components/organisms/article-body';
import ContactSection from "@/components/organisms/contact-section";
import SiteFooter from "@/components/organisms/site-footer";
import MarkdownRenderer from '../lib/markdown-renderer';
import { Content } from '@/types/content';

interface ArticleTemplateProps {
    content: Content;
    slug: string;
}

function generateBreadcrumb(slug: string): { display: string; slugs: string[] } {
    const parts = slug.split('-').map(part => {
        // Handle acronyms
        if (part.toUpperCase() === 'SEO' || part.toUpperCase() === 'GBP') {
            return part.toUpperCase();
        }
        // Capitalize first letter
        return part.charAt(0).toUpperCase() + part.slice(1);
    });

    return {
        display: 'Home / ' + parts.join(' '),
        slugs: [slug]
    };
}

export default function ArticleTemplate({ content, slug }: ArticleTemplateProps) {
    const breadcrumb = generateBreadcrumb(slug);

    return (
        <div>
            <ArticleHero
                title={content.meta.title || content.meta.h1 || 'Untitled'}
                subtitle={content.meta.description || content.meta.summary || ''}
                imageSrc={content.meta.imageSrc || '/assets/blog/blog_post.png'}
                imageAlt={content.meta.imageAlt || 'Article image'}
                breadcrumb={breadcrumb}
                date={content.meta.date || content.meta.publishedTime || ''}
                readTime={content.meta.readTime || ''}
            />
            <ArticleBody headings={content.headings} content={<MarkdownRenderer content={content.content} />} />
            <ContactSection/>
            <SiteFooter/>
        </div>
    );
}