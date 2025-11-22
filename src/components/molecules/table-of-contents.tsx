'use client';

import { useState, useEffect } from 'react';
import { Heading } from '@/types/content';

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);
        
        if (visibleHeadings.length > 0) {
          // Get the first visible heading (topmost)
          const topmostHeading = visibleHeadings[0];
          setActiveId(topmostHeading);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0,
      }
    );

    // Observe only h2 headings
    const h2Headings = headings.filter((h) => h.level === 2);
    h2Headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filter to only show h2 headings
  const tocHeadings = headings.filter((h) => h.level === 2);

  if (tocHeadings.length === 0) {
    return null;
  }

  return (
    <div className={`bg-[#E1E6EB] rounded-2xl overflow-hidden ${className}`}>
      <div className="flex flex-col gap-4 p-6 md:p-8 w-full">
        <h2 className="font-inter-tight font-semibold text-xl md:text-2xl leading-7 md:leading-8 text-[#49535D]">
          Table of content
        </h2>
        <nav className="flex flex-col gap-4">
          {tocHeadings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  text-left text-sm leading-5 tracking-[-0.28px] transition-colors whitespace-normal break-words
                  ${isActive 
                    ? 'font-inter font-semibold text-[#E55B1E]' 
                    : 'font-inter font-medium text-[#49535D] hover:text-[#E55B1E]'
                  }

                `}
              >
                {heading.text}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
