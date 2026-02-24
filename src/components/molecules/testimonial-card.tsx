'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  const { rating = 5 } = current;

  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [lastDelta, setLastDelta] = useState(0);

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < testimonials.length - 1;

  const swapQuote = (newIndex: number, direction: 'next' | 'prev') => {
    const oldEl = testimonialRefs.current[currentIndex];
    const newEl = testimonialRefs.current[newIndex];
    if (!oldEl || !newEl) return;

    // Kill any ongoing animations
    testimonialRefs.current.forEach(el => {
      if (el) gsap.killTweensOf(el);
    });

    const offset = direction === 'next' ? -50 : 50;

    gsap.to(oldEl, {
      x: offset,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out'
    });
    gsap.set(newEl, {
      x: -offset,
      opacity: 0
    });
    gsap.to(newEl, {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
      onComplete: () => setCurrentIndex(newIndex)
    });
  };

  const prev = () => {
    if (canPrev) {
      swapQuote(currentIndex - 1, 'prev');
    }
  };

  const next = () => {
    if (canNext) {
      swapQuote(currentIndex + 1, 'next');
    }
  };

  useEffect(() => {
    testimonialRefs.current.forEach((el, i) => {
      if (el) {
        if (i === currentIndex) {
          gsap.set(el, { opacity: 1, x: 0 });
        } else {
          gsap.set(el, { opacity: 0 });
        }
      }
    });
  }, [currentIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setLastDelta(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      const delta = e.clientX - dragStart;
      setLastDelta(delta);
      const currentEl = testimonialRefs.current[currentIndex];
      if (currentEl) {
        const canFade = (delta > 0 && canPrev) || (delta < 0 && canNext);
        gsap.to(currentEl, {
          opacity: canFade ? Math.max(0.3, 1 - Math.abs(delta) / 100) : 1,
          duration: 0.05
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (dragStart !== null) {
      const delta = lastDelta;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && canPrev) {
          swapQuote(currentIndex - 1, 'prev');
        } else if (delta < 0 && canNext) {
          swapQuote(currentIndex + 1, 'next');
        }
      } else {
        const currentEl = testimonialRefs.current[currentIndex];
        if (currentEl) {
          gsap.to(currentEl, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
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
    e.preventDefault();
    if (dragStart !== null) {
      const delta = e.touches[0].clientX - dragStart;
      setLastDelta(delta);
      const currentEl = testimonialRefs.current[currentIndex];
      if (currentEl) {
        const canFade = (delta > 0 && canPrev) || (delta < 0 && canNext);
        gsap.to(currentEl, {
          opacity: canFade ? Math.max(0.3, 1 - Math.abs(delta) / 100) : 1,
          duration: 0.05
        });
      }
    }
  };

  const handleTouchEnd = () => {
    if (dragStart !== null) {
      const delta = lastDelta;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && canPrev) {
          swapQuote(currentIndex - 1, 'prev');
        } else if (delta < 0 && canNext) {
          swapQuote(currentIndex + 1, 'next');
        }
      } else {
        const currentEl = testimonialRefs.current[currentIndex];
        if (currentEl) {
          gsap.to(currentEl, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
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
              <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="0.09375rem" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next testimonial"
            className="w-[3.5rem] h-[3.5rem] rounded-[1.875rem] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-[#D2D5D9] hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
          >
            <svg width="1rem" height="0.75rem" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="0.09375rem" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative min-h-[36rem] sm:min-h-[24rem] lg:min-h-[18rem]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => { testimonialRefs.current[index] = el; }}
            className="absolute top-0 left-0 w-full flex flex-col gap-[4rem] opacity-0"
          >
            <p className="font-inter-tight font-normal text-[1.875rem] md:text-[2rem] xl:text-[2.5rem] leading-[2.5rem] md:leading-[3rem] xl:leading-[3.438rem] tracking-[-0.02em] lg:tracking-0 text-[#071C32] cursor-grab">
              {testimonial.quote}
            </p>
            <div className="flex items-center gap-[1.25rem]">
              {testimonial.image && (
                <Image
                  src={testimonial.image}
                  alt={`Profile picture of ${testimonial.author}`}
                  className="w-[3rem] h-[3rem] rounded-full object-cover"
                  width={48}
                  height={48}
                />
              )}
              <div className="flex items-center gap-[1.25rem]">
                <div className="w-[3.75rem] h-[0.0875rem] bg-[#E55B1E]"></div>
                <span className="font-inter-tight font-medium text-[1.125rem] leading-[1.222] uppercase text-[#969799]">
                  {testimonial.author}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
