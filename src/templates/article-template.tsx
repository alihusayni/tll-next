import ArticleHero from '../components/organisms/article-hero';
import ArticleBody from '../components/organisms/article-body';

interface TocItem {
  href: string;
  label: string;
  isActive?: boolean;
}

interface Content {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumb: string;
  date: string;
  readTime: string;
  tocItems: TocItem[];
  bodyContent: string;
}

interface ArticleTemplateProps {
  content: Content;
}

export default function ArticleTemplate({ content }: ArticleTemplateProps) {
  return (
    <div>
      <ArticleHero {...content} />
      <ArticleBody tocItems={content.tocItems} content={content.bodyContent} />
    </div>
  );
}