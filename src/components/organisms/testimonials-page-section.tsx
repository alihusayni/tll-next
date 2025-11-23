'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RatingBadge from '../molecules/rating-badge';
import TestimonialCardFull from '../molecules/testimonial-card-full';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsPageSection() {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const firstRowAnimationRef = useRef<gsap.core.Tween | null>(null);
  const secondRowAnimationRef = useRef<gsap.core.Tween | null>(null);

  // Split testimonials into two rows (first 5 and last 5)
  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  useEffect(() => {
    // Animate first row - scroll to left
    if (firstRowRef.current) {
      const firstRowContent = firstRowRef.current;
      const firstRowWidth = firstRowContent.scrollWidth / 2; // Half because content is duplicated

      firstRowAnimationRef.current = gsap.to(firstRowContent, {
        x: -firstRowWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }

    // Animate second row - scroll to right
    if (secondRowRef.current) {
      const secondRowContent = secondRowRef.current;
      const secondRowWidth = secondRowContent.scrollWidth / 2; // Half because content is duplicated

      secondRowAnimationRef.current = gsap.fromTo(
        secondRowContent,
        { x: -secondRowWidth },
        {
          x: 0,
          duration: 40,
          ease: 'none',
          repeat: -1,
        }
      );
    }

    // Cleanup on unmount
    return () => {
      firstRowAnimationRef.current?.kill();
      secondRowAnimationRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    firstRowAnimationRef.current?.pause();
    secondRowAnimationRef.current?.pause();
  };

  const handleMouseLeave = () => {
    firstRowAnimationRef.current?.resume();
    secondRowAnimationRef.current?.resume();
  };

  return (
    <section className="bg-[#091c32] w-full overflow-hidden pb-[48px] md:pb-[64px] lg:pb-[128px] pt-0 px-[16px] md:px-[32px] lg:px-[64px]">
      <div className="max-w-[1728px] mx-auto flex flex-col items-center gap-[16px] md:gap-[32px]">
        {/* Text & Rating */}
        <div className="max-w-[1144px] w-full flex flex-col items-center gap-[32px] pt-[32px]">
          <RatingBadge />
          
          {/* Hero Heading */}
          <div className="flex flex-col items-center gap-[24px] w-full text-center">
            <h1 className="font-inter-tight font-semibold text-[62px] leading-[72px] text-[#9199b9] w-full">
              See how we&apos;ve{' '}
              <span className="text-white">helped others achieve their goals</span>, and what the{' '}
              <span className="text-[#e8edf2]">T</span>
              <span className="text-white">uan Le experience is truly like.</span>
            </h1>
          </div>
        </div>

        {/* Testimonial Cards - Two Rows with GSAP Animation */}
        <div className="flex flex-col gap-[16px] w-full">
          {/* First Row - Scrolls Left */}
          <div className="overflow-visible">
            <div ref={firstRowRef} className="flex gap-[16px] sm:gap-[16px]" style={{ willChange: 'transform' }}>
              {/* Original cards */}
              {firstRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`first-${index}`} 
                  testimonial={testimonial}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
              {/* Duplicate cards for seamless loop */}
              {firstRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`first-dup-${index}`} 
                  testimonial={testimonial}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          </div>

          {/* Second Row - Scrolls Right */}
          <div className="overflow-visible">
            <div ref={secondRowRef} className="flex gap-[16px] sm:gap-[16px]" style={{ willChange: 'transform' }}>
              {/* Original cards */}
              {secondRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`second-${index}`} 
                  testimonial={testimonial}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
              {/* Duplicate cards for seamless loop */}
              {secondRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`second-dup-${index}`} 
                  testimonial={testimonial}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

