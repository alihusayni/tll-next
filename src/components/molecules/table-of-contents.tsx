'use client';

import { useState, useEffect, useRef } from 'react';
import { Heading } from '@/types/content';

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

// Helper function to render markdown in heading text
function renderMarkdownText(text: string) {
  // Remove ** for bold (we'll handle styling via CSS)
  let processed = text.replace(/\*\*(.+?)\*\*/g, '$1');
  // Remove * for italic
  processed = processed.replace(/\*(.+?)\*/g, '$1');
  // Remove ` for code
  processed = processed.replace(/`(.+?)`/g, '$1');
  // Remove other common markdown symbols
  processed = processed.replace(/~~(.+?)~~/g, '$1'); // strikethrough
  
  return processed;
}

export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);

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

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (activeId && wrapperRef.current) {
      const button = wrapperRef.current.querySelector(`[data-id="${activeId}"]`) as HTMLElement;
      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Show all headings
  const tocHeadings = headings;

  if (tocHeadings.length === 0) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `::-webkit-scrollbar { display: none; }` }} />
      <div className={`bg-[#E1E6EB] rounded-[1rem] overflow-hidden h-auto max-h-[calc(100vh-8rem)] ${className}`}>
      <div className="flex flex-col gap-4 p-6 md:p-8 w-full h-full">
        <h2 className="font-inter-tight font-semibold text-xl md:text-[1.5rem] leading-7 md:leading-8 text-[#49535D]">
          Table of contents
        </h2>
        <nav className="flex flex-col gap-4 max-h-[calc(100vh-8rem-5rem)] overflow-y-auto mb-6 md:mb-8" ref={wrapperRef}>
            {tocHeadings.map((heading) => {
              const isActive = activeId === heading.id;
              // Calculate indentation based on heading level (h1=0, h2=1rem, h3=2rem, etc.)
              const indentLevel = Math.max(0, heading.level - 1);
              const paddingLeft = indentLevel * 1; // 1rem per level

              return (
                <button
                  key={heading.id}
                  data-id={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  style={{ paddingLeft: `${paddingLeft}rem` }}
                  className={`
                    text-left text-sm leading-5 tracking-[-0.0175rem] transition-colors whitespace-normal break-words
                    ${isActive
                      ? 'font-inter font-semibold text-[#E55B1E]'
                      : 'font-inter font-medium text-[#49535D] hover:text-[#E55B1E]'
                    }

                  `}
                >
                  {renderMarkdownText(heading.text)}
                </button>
              );
            })}
        </nav>
      </div>
    </div>
    </>
  );
}
