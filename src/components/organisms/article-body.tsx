import TableOfContents from '../molecules/table-of-contents';

interface TocItem {
  href: string;
  label: string;
  isActive?: boolean;
}

interface ArticleBodyProps {
  tocItems: TocItem[];
  content: string; // Placeholder for HTML content
}

export default function ArticleBody({ tocItems, content }: ArticleBodyProps) {
  return (
    <section className="bg-[#E8EDF2] px-4 md:px-8 lg:px-16 pb-16 lg:pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
          {/* TOC */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
            <TableOfContents items={tocItems} />
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <div
              className="markdown-body prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}