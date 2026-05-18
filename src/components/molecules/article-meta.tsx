interface ArticleMetaProps {
  date: string;
  readTime: string;
}

export default function ArticleMeta({ date, readTime }: ArticleMetaProps) {
  return (
    <div className="flex items-center justify-center gap-4 text-base leading-6 text-[#49535D] font-inter font-medium">
      {date && <span>{date}</span>}
      {date && readTime && <div className="w-px h-5 bg-[#BBBCBF]"></div>}
      {readTime && <span>{readTime}</span>}
    </div>
  );
}