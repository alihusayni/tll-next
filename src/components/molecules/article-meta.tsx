interface ArticleMetaProps {
  date: string;
  readTime: string;
}

export default function ArticleMeta({ date, readTime }: ArticleMetaProps) {
  // Placeholder implementation
  return (
    <div className="flex items-center justify-center gap-4 text-base text-gray-500">
      <span>{date}</span>
      <div className="w-px h-5 bg-gray-300"></div>
      <span>{readTime}</span>
    </div>
  );
}