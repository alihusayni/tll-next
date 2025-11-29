'use client';

'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import RatingStar from '../atoms/rating-star';
import { gsap } from "gsap";

interface TestimonialData {
    quote: string;
    author: string;
    rating?: number;
    image?: string;
}

interface TestimonialProps {
  testimonials: TestimonialData[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  testimonials,
  currentIndex,
  setCurrentIndex,
}) => {
  const current = testimonials[currentIndex];
  const { quote, author, rating = 5, image } = current;

  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [lastDelta, setLastDelta] = useState(0);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < testimonials.length - 1;

  const prev = () => {
    if (canPrev) {
      const tl = gsap.timeline();
      tl.to(quoteRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .call(() => setCurrentIndex(currentIndex - 1))
      .fromTo(quoteRef.current, {
        x: -50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const next = () => {
    if (canNext) {
      const tl = gsap.timeline();
      tl.to(quoteRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .call(() => setCurrentIndex(currentIndex + 1))
      .fromTo(quoteRef.current, {
        x: 50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setLastDelta(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const delta = e.clientX - dragStart;
      setLastDelta(delta);
      gsap.to(quoteRef.current, {
        opacity: Math.max(0.3, 1 - Math.abs(delta) / 100),
        duration: 0.05
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const delta = lastDelta;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && canPrev) {
          prev();
        } else if (delta < 0 && canNext) {
          next();
        }
      } else {
        gsap.to(quoteRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      setDragStart(null);
      setLastDelta(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
    setLastDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      const delta = e.touches[0].clientX - dragStart;
      setLastDelta(delta);
      gsap.to(quoteRef.current, {
        opacity: Math.max(0.3, 1 - Math.abs(delta) / 100),
        duration: 0.05
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      const delta = lastDelta;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && canPrev) {
          prev();
        } else if (delta < 0 && canNext) {
          next();
        }
      } else {
        gsap.to(quoteRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      setDragStart(null);
      setLastDelta(0);
    }
  };

  return (
    <div
      className="flex flex-col gap-[4rem] select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-between items-center">
        <RatingStar rating={rating} />
        <div className="flex gap-[1rem]">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous testimonial"
              className="w-[3.5rem] h-[3.5rem] rounded-[1.875rem] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-[#D2D5D9] hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
            >
            <svg width="1rem" height="0.75rem" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="0.09375rem" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Next testimonial"
              className="w-[3.5rem] h-[3.5rem] rounded-[1.875rem] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-[#D2D5D9] hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
            >
            <svg width="1rem" height="0.75rem" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="0.09375rem" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
       <p ref={quoteRef} className="font-inter-tight font-normal text-[1.875rem] lg:text-[2.5rem] leading-[2.5rem] lg:leading-[3.438rem] tracking-[-0.02em] lg:tracking-0 text-[#071C32] min-h-[20rem] sm:min-h-[17.5rem] lg:min-h-[13.75rem] cursor-grab">
         {quote}
       </p>
          <div className="flex items-center gap-[1.25rem]">
        {image && (
          <Image
            src={image}
            alt={`Profile picture of ${author}`}
            className="w-[3rem] h-[3rem] rounded-full object-cover"
            width={48}
            height={48}
          />
        )}
      <div className="flex items-center gap-[1.25rem]">
          <div className="w-[3.75rem] h-[0.0875rem] bg-[#E55B1E]"></div>
          <span className="font-inter-tight font-medium text-[1.125rem] leading-[1.222] uppercase text-[#969799]">
            {author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;