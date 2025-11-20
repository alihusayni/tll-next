'use client';

import React, { useRef } from 'react';
import ArticleCard from '../molecules/article-card';
import LinkButton from '../atoms/link-button';

interface Article {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ArticlesSectionClientProps {
  articles: Article[];
}

export default function ArticlesSectionClient({ articles }: ArticlesSectionClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeftState, setScrollLeftState] = React.useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current && canScrollLeft) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && canScrollRight) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="bg-[#E8EDF2] py-32 px-16 lg:py-32 lg:px-16 md:py-24 md:px-8 xl:px-0 sm:py-16 sm:px-4">
      <div className="mx-auto max-w-[86.5rem]">
        <div className="flex flex-col gap-16 lg:gap-16 md:gap-16 sm:gap-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-5">
              <h2 className="font-inter-tight font-semibold text-lg leading-[1.222] uppercase text-[#747D85]">
                Articles
              </h2>
              <h1 className="font-inter-tight font-semibold text-[2.125rem] lg:text-[3.25rem] md:text-[2.125rem] sm:text-[2.125rem] leading-[1.235] lg:leading-[1.235] md:leading-[1.235] sm:leading-[1.235] tracking-[-0.02em] text-[#071C32]">
                Latest Articles
              </h1>
            </div>
            <LinkButton text="See All Articles" href="#" textColor="text-[#49535D]" />
          </div>
          <div className="flex flex-col gap-16">
            <div
              ref={scrollRef}
              className={`flex gap-4 overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
            >
              {articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  description={article.description}
                  image={article.image}
                  link={article.link}
                />
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-14 h-14 bg-white rounded-[30px] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-transparent hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-14 h-14 bg-white rounded-[30px] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-transparent hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}