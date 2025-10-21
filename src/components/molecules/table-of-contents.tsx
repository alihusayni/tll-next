'use client';

import { useEffect, useState } from 'react';
import TocLink from '../atoms/toc-link';
import { Heading } from '@/types/content';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Only include h2 headings
  const tocHeadings = headings.filter(heading => heading.level === 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    tocHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tocHeadings]);

  const getIndentClass = (level: number): string => {
    switch (level) {
      case 2:
        return '';
      case 3:
        return 'ml-4';
      case 4:
        return 'ml-8';
      case 5:
        return 'ml-12';
      case 6:
        return 'ml-16';
      default:
        return '';
    }
  };

  const getFontSizeClass = (level: number): string => {
    switch (level) {
      case 2:
        return 'text-[18px]';
      case 3:
        return 'text-[16px]';
      default:
        return 'text-base';
    }
  };

  return (
    <div className="bg-[#F5F7FA] rounded-2xl px-4 py-8 w-full lg:w-80 sticky top-8 border border-[#E1E6EB]">
      <h3 className="text-[24px] font-inter-tight font-semibold text-[#49535D] leading-[32px] mb-6">
        Table of content
      </h3>
      <nav>
        <ul className="space-y-3">
          {tocHeadings.map((heading, index) => (
            <li
              key={index}
              className={`${getIndentClass(heading.level)} ${getFontSizeClass(heading.level)}`}
            >
              <TocLink href={`#${heading.id}`} isActive={activeId === heading.id}>
                {heading.text.replace(/\*\*/g, '').replace(/&nbsp;/g, ' ').replace(/&bull;/g, '').trim()}
              </TocLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}