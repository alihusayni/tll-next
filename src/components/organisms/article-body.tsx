import TableOfContents from '../molecules/table-of-contents';
import CtaBox from './cta-box';
import QuoteBox from '../molecules/quote-box';
import { ReactNode } from 'react';
import { Heading } from '@/types/content';

interface ArticleBodyProps {
  headings: Heading[];
  content: ReactNode;
}

export default function ArticleBody({ headings, content }: ArticleBodyProps) {
  return (
    <section className="bg-[#E8EDF2] pb-16 lg:pb-32 max-w-[71.5rem] mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8">
          {/* TOC */}
          <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-32 lg:self-start">
            <TableOfContents headings={headings} />
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <div className="markdown-body prose prose-lg max-w-none">
              {content}
            </div>

            {/* Demo components */}
            <div className="my-16">
              <QuoteBox
                quote="Tuan Le is an excellent immigration lawyer who helped me through the entire process of obtaining an I-601 waiver for my wife in 9.5 months. He has been patient and informative with all my questions regarding this process."
                author="Tuyen Vu"
              />
            </div>

            <div className="my-16">
              <CtaBox />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}