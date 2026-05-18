'use client';

import React, {useRef} from 'react';
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
  // Use refs for drag state — avoids triggering a React re-render (which invalidates
  // styles) before we read scrollLeft in onMouseDown, which would be a forced reflow.
  const startXRef = useRef(0);
  const scrollLeftStateRef = useRef(0);

  // Cached layout measurements — read once via ResizeObserver, not on every interaction
  const cardWidthRef = useRef(0);
  const gapRef = useRef(0);
  // Also cache scroll container dimensions so smoothScroll never reads from the DOM
  // in a hot path after a write (which forces a reflow).
  const scrollWidthRef = useRef(0);
  const clientWidthRef = useRef(0);

  const velocityRef = useRef(0);
  const lastXRef = useRef<number>(0);
  const rAFRef = useRef<number>(null);
  const isDownRef = useRef(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

  // Measure card width + gap once on mount and whenever the container resizes.
  // Avoids calling getComputedStyle() and offsetWidth on every button click.
  const updateLayoutCache = () => {
      if (!scrollRef.current) return;
      const firstCard = scrollRef.current.children[0] as HTMLElement | undefined;
      if (firstCard) {
          cardWidthRef.current = firstCard.getBoundingClientRect().width;
      }
      const style = getComputedStyle(scrollRef.current);
      gapRef.current = parseFloat(style.gap) || parseFloat(style.columnGap) || 0;
      // Cache container geometry so smoothScroll never reads live DOM in a hot path
      scrollWidthRef.current = scrollRef.current.scrollWidth;
      clientWidthRef.current = scrollRef.current.clientWidth;
  };

    const scrollCheckRafRef = useRef<number | null>(null);
  const checkScroll = () => {
      // Throttle via rAF: at most one layout read per frame instead of one per scroll event
      if (scrollCheckRafRef.current) return;
      scrollCheckRafRef.current = requestAnimationFrame(() => {
          scrollCheckRafRef.current = null;
          if (!scrollRef.current) return;
          const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
          // Keep container cache in sync
          scrollWidthRef.current = scrollWidth;
          clientWidthRef.current = clientWidth;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      });
  };

  React.useEffect(() => {
      checkScroll();
      updateLayoutCache();
      const ref = scrollRef.current;
      if (ref) {
          ref.addEventListener('scroll', checkScroll, { passive: true });
          // Keep card size cache fresh on resize
          const ro = new ResizeObserver(() => updateLayoutCache());
          ro.observe(ref);
          return () => {
              ref.removeEventListener('scroll', checkScroll);
              ro.disconnect();
          };
      }
  }, []);

  const smoothScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    // Cancel any existing momentum/scroll animation
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);

    // Use cached measurements — zero live DOM reads to avoid forced reflows
    const cardWidth = cardWidthRef.current || 0;
    const gapValue = gapRef.current;
    const scrollLeft = scrollRef.current.scrollLeft; // safe: reading scrollLeft alone doesn't force reflow when no style was recently invalidated
    const clientWidth = clientWidthRef.current;
    const scrollWidth = scrollWidthRef.current;

    // Calculate card centers
    const cardSpacing = cardWidth + gapValue;
    const containerCenter = scrollLeft + clientWidth / 2;

    // Find current centered card index
    let currentIndex = Math.round((containerCenter - cardWidth / 2) / cardSpacing);
    currentIndex = Math.max(0, Math.min(currentIndex, articles.length - 1));

    // Determine target index
    const targetIndex = direction === 'left'
      ? Math.max(0, currentIndex - 1)
      : Math.min(articles.length - 1, currentIndex + 1);

    // Calculate target scroll position to center the target card
    const targetCardCenter = targetIndex * cardSpacing + cardWidth / 2;
    const targetScroll = targetCardCenter - clientWidth / 2;

    // Clamp to bounds
    const clampedTarget = Math.max(0, Math.min(targetScroll, scrollWidth - clientWidth));

    const start = scrollLeft;
    const distance = clampedTarget - start;
    const duration = 500; // ms
    const startTime = performance.now();

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animateScroll = (currentTime: number) => {
      if (!scrollRef.current) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      scrollRef.current.scrollLeft = start + (distance * ease);

      if (progress < 1) {
        rAFRef.current = requestAnimationFrame(animateScroll);
      }
    };

    rAFRef.current = requestAnimationFrame(animateScroll);
  };

  const scrollLeft = () => smoothScroll('left');
  const scrollRight = () => smoothScroll('right');

  const startMomentum = () => {
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    
    const momentumLoop = () => {
      if (!scrollRef.current) return;
      
      scrollRef.current.scrollLeft -= velocityRef.current * 2;
      velocityRef.current *= 0.95; // Friction
      
      if (Math.abs(velocityRef.current) > 0.5) {
        rAFRef.current = requestAnimationFrame(momentumLoop);
      }
    };
    
    rAFRef.current = requestAnimationFrame(momentumLoop);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    isDownRef.current = true;
    setIsDragging(true);
    
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    
    startXRef.current = e.pageX;
    // Read scrollLeft once on mousedown — no prior write in this frame so no reflow
    scrollLeftStateRef.current = scrollRef.current.scrollLeft;
    lastXRef.current = e.pageX;
    velocityRef.current = 0;
  };

  const onMouseLeave = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      setIsDragging(false);
      startMomentum();
    }
  };

  const onMouseUp = () => {
    isDownRef.current = false;
    setIsDragging(false);
    startMomentum();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startXRef.current) * 2;
    
    // Calculate velocity
    const delta = x - lastXRef.current;
    velocityRef.current = delta;
    lastXRef.current = x;
    
    scrollRef.current.scrollLeft = scrollLeftStateRef.current - walk;
  };

  return (
    <section className="bg-[#E8EDF2] py-32 sm:py-16 md:py-24 lg:py-32 px-1 sm:px-8 lg:px-16 2xl:px-0">
      <div className="mx-auto max-w-[86.5rem]">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-16 sm:gap-0 items-start px-4 sm:px-0">
            <div className="flex flex-col gap-5">
              <h2 className="font-inter-tight font-semibold text-lg leading-[1.222rem] uppercase text-[#747D85]">
                Articles
              </h2>
              <h3 className="font-inter-tight font-semibold text-[2.125rem] lg:text-[3.25rem] md:text-[2.125rem] sm:text-[2.125rem] leading-[1.235] lg:leading-[1.235] md:leading-[1.235] sm:leading-[1.235] tracking-[-0.02em] text-[#071C32]">
                Latest Articles
              </h3>
            </div>
            <LinkButton text="See All Articles" href="/resources" textColor="text-[#49535D]" />
          </div>
          <div className="flex flex-col gap-16">
            <div
              ref={scrollRef}
              className={`flex gap-1 sm:gap-4 overflow-x-auto scrollbar-hide select-none ${isDragging ? '!cursor-grabbing' : 'cursor-grab'} [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onDragStart={(e) => e.preventDefault()}
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
            <div className="flex justify-end gap-4 px-4 sm:px-0">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-14 h-14 bg-transparent rounded-[1.875rem] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-[#D2D5D9] hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-14 h-14 bg-transparent rounded-[1.875rem] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-[#D2D5D9] hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
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
