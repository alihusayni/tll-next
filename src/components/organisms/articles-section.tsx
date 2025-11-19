import React from 'react';
import ArticleCard from '../molecules/article-card';
import LinkButton from '../atoms/link-button';
import { getAllContent } from '@/lib/content';
import ArticlesSectionClient from './articles-section-client';

const getLatestArticles = () => {
  const allContent = getAllContent();

  // Sort by publishedTime descending (latest first)
  const sortedContent = allContent
    .filter(content => content.meta.publishedTime)
    .sort((a, b) => {
      const dateA = new Date(a.meta.publishedTime || '');
      const dateB = new Date(b.meta.publishedTime || '');
      return dateB.getTime() - dateA.getTime();
    });

  // Take the first 10 (latest)
  return sortedContent.slice(0, 10).map(content => ({
    title: content.meta.h1 || content.meta.title || '',
    description: content.meta.summary || content.meta.description || '',
    image: content.meta.ogImage || content.meta.imageSrc || '/assets/articles/default.png',
    link: `/${content.slug}`,
  }));
};

export default function ArticlesSection() {
  const articles = getLatestArticles();

  return <ArticlesSectionClient articles={articles} />;
}