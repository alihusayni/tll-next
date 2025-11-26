'use client';

import { useRef, useState, useEffect } from 'react';

interface Category {
  id: string;
  label: string;
}

interface BlogCategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
  infinityBorder?: boolean;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className = '',
  infinityBorder = false
}: BlogCategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Allow a small buffer (1px) for calculation precision
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        ref.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    
    // If moved more than 5 pixels, consider it a drag
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    // Only trigger category change if user didn't drag
    if (!hasDragged) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      {/* Border extending to infinity - only when enabled */}
      {infinityBorder && (
        <div className="absolute left-1/2 right-1/2 bottom-0 h-px bg-[#D2D5D9] -ml-[50vw] -mr-[50vw] z-0"></div>
      )}
      {!infinityBorder && (
        <div className="absolute left-0 right-0 bottom-0 h-px bg-[#D2D5D9] z-0"></div>
      )}
      {/* Left Navigation Button */}
      <div className={`absolute left-0 z-10 flex items-center h-full bg-gradient-to-r from-[#E8EDF2] via-[#E8EDF2] to-transparent pr-0 pl-0 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="w-8 h-8 bg-[#E8EDF2] rounded-full border border-[#D2D5D9] text-[#747D85] flex items-center justify-center hover:border-[#FF7031] hover:text-[#FF7031] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`box-border flex gap-2 items-center  mx-auto pl-0 py-4 w-full overflow-x-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          userSelect: 'none'
        }}
      >
        {categories.filter(category => category.id !== 'resources').map((category) => {
          const isActive = category.id === activeCategory;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                box-border group flex gap-2 items-center justify-center px-4 py-3 rounded-full shrink-0 transition-colors
                ${isActive 
                  ? 'bg-[#E1E6EB]' 
                  : 'bg-transparent hover:bg-[#E1E6EB]'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex flex-col justify-center leading-0">
                <p className={`
                  font-inter-tight font-medium text-lg leading-7 whitespace-nowrap group-hover:text-[#071C32]
                  ${isActive ? 'text-[#071C32]' : 'text-[#747D85]'}
                `}>
                  {category.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Navigation Button */}
      <div className={`absolute right-0 z-10 flex items-center h-full pl-0 pr-0 bg-gradient-to-l from-[#E8EDF2] via-[#E8EDF2] to-transparent transition-opacity duration-300 ${canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="w-8 h-8 bg-[#E8EDF2] rounded-full border border-[#D2D5D9] text-[#747D85] flex items-center justify-center hover:border-[#FF7031] hover:text-[#FF7031] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

