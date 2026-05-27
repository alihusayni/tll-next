import ArticleHero from '../components/organisms/article-hero';
import ArticleBody from '../components/organisms/article-body';
import MarkdownRenderer from '../lib/markdown-renderer';
import { Content } from '@/types/content';
import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/organisms/contact-section'));
const SiteFooter = dynamic(() => import('@/components/organisms/site-footer'));

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
            <main>
            <ArticleHero
                title={content.meta.title || content.meta.h1 || 'Untitled'}
                subtitle={content.meta.description || content.meta.summary || ''}
                imageSrc={content.meta.imageSrc || 'https://tuanlelaw.s3.amazonaws.com/assets/blog/blog_post.png'}
                imageAlt={content.meta.imageAlt || 'Featured image illustrating the article topic'}
                breadcrumb={breadcrumb}
                date={content.meta.date || content.meta.publishedTime || ''}
                readTime={content.meta.readTime || ''}
                author={content.meta.author || 'Tuan Le'}
            />
            <ArticleBody headings={content.headings} content={<MarkdownRenderer content={content.content} />} />
            <ContactSection/>
            </main>
            <SiteFooter/>
        </div>
    );
}