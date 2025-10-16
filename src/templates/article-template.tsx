import ArticleHero from '../components/organisms/article-hero';

interface Content {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumb: string;
  date: string;
  readTime: string;
}

interface ArticleTemplateProps {
  content: Content;
}

export default function ArticleTemplate({ content }: ArticleTemplateProps) {
  return (
    <div>
      <ArticleHero {...content} />
      {/* Placeholder for TOC and Body - to be implemented in Phase 11 */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
          <p>Article content will be rendered here in Phase 11.</p>
        </div>
      </div>
    </div>
  );
}