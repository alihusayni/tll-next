import ArticleTemplate from '@/templates/article-template';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: PageProps) {
  // Placeholder content - in Phase 11, this will be fetched based on slug
  const content = {
    title: 'How to Speed Up Your Immigration Case with USCIS: 6 Proven Tips',
    subtitle: 'Applying for a U.S. visa, green card, or citizenship through the United States Citizenship and Immigration Services (USCIS) can feel like watching paint dry—especially when you\'re racing against time.',
    imageSrc: '/assets/blog/blog_post.png',
    imageAlt: 'Immigration case illustration',
    breadcrumb: 'Home / How to Speed Up Your Immigration Case with USCIS: 6 Proven Tips',
    date: 'March 30, 2025',
    readTime: '12 min read',
  };

  return <ArticleTemplate content={content} />;
}