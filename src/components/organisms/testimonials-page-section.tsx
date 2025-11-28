'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin';
import RatingBadge from '../molecules/rating-badge';
import TestimonialCardFull from '../molecules/testimonial-card-full';
import { testimonials } from '@/data/testimonials';

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function TestimonialsPageSection() {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const firstRowAnimationRef = useRef<gsap.core.Tween | null>(null);
  const secondRowAnimationRef = useRef<gsap.core.Tween | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstRowDraggableRef = useRef<any[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secondRowDraggableRef = useRef<any[] | null>(null);
  const isDraggingRef = useRef({ first: false, second: false });

  // Split testimonials into two rows (30 each for better scrolling)
  const firstRow = testimonials.slice(0, 30);
  const secondRow = testimonials.slice(30, 60);

  useEffect(() => {
    // Animate first row - scroll to left
    if (firstRowRef.current) {
      const firstRowContent = firstRowRef.current;
      const firstRowWidth = firstRowContent.scrollWidth / 3; // Third because content is tripled

      firstRowAnimationRef.current = gsap.to(firstRowContent, {
        x: -firstRowWidth * 2,
        duration: 360,
        ease: 'none',
        repeat: -1,
      });

      // Create draggable for first row
      firstRowDraggableRef.current = Draggable.create(firstRowContent, {
        type: "x",
        bounds: { minX: -firstRowWidth * 2.5, maxX: firstRowWidth * 0.5 },
        inertia: true,
        edgeResistance: 0.7,
        onDragStart: function() {
          isDraggingRef.current.first = true;
          firstRowAnimationRef.current?.pause();
          gsap.set(firstRowContent, { cursor: 'grabbing' });
        },
        onDrag: function() {
          // Sync with animation position when dragging
          const currentX = gsap.getProperty(firstRowContent, "x");
          gsap.set(firstRowContent, { x: currentX });
        },
        onDragEnd: function() {
          isDraggingRef.current.first = false;
          gsap.set(firstRowContent, { cursor: 'grab' });
          
          // Resume animation immediately
          if (!isDraggingRef.current.second) {
            firstRowAnimationRef.current?.resume();
          }
        },
        onThrowComplete: function() {
          isDraggingRef.current.first = false;
          if (!isDraggingRef.current.second) {
            firstRowAnimationRef.current?.resume();
          }
        }
      });
    }

    // Animate second row - scroll to right
    if (secondRowRef.current) {
      const secondRowContent = secondRowRef.current;
      const secondRowWidth = secondRowContent.scrollWidth / 3; // Third because content is tripled

      secondRowAnimationRef.current = gsap.fromTo(
        secondRowContent,
        { x: -secondRowWidth * 2 },
        {
          x: 0,
          duration: 360,
          ease: 'none',
          repeat: -1,
        }
      );

      // Create draggable for second row
      secondRowDraggableRef.current = Draggable.create(secondRowContent, {
        type: "x",
        bounds: { minX: -secondRowWidth * 2.5, maxX: secondRowWidth * 0.5 },
        inertia: true,
        edgeResistance: 0.7,
        onDragStart: function() {
          isDraggingRef.current.second = true;
          secondRowAnimationRef.current?.pause();
          gsap.set(secondRowContent, { cursor: 'grabbing' });
        },
        onDrag: function() {
          // Sync with animation position when dragging
          const currentX = gsap.getProperty(secondRowContent, "x");
          gsap.set(secondRowContent, { x: currentX });
        },
        onDragEnd: function() {
          isDraggingRef.current.second = false;
          gsap.set(secondRowContent, { cursor: 'grab' });
          
          // Resume animation immediately
          if (!isDraggingRef.current.first) {
            secondRowAnimationRef.current?.resume();
          }
        },
        onThrowComplete: function() {
          isDraggingRef.current.second = false;
          if (!isDraggingRef.current.first) {
            secondRowAnimationRef.current?.resume();
          }
        }
      });
    }

    // Cleanup on unmount
    return () => {
      firstRowAnimationRef.current?.kill();
      secondRowAnimationRef.current?.kill();
      firstRowDraggableRef.current?.[0]?.kill();
      secondRowDraggableRef.current?.[0]?.kill();
    };
  }, []);

  const handleFirstRowMouseEnter = () => {
    if (!isDraggingRef.current.first) {
      firstRowAnimationRef.current?.pause();
    }
  };

  const handleFirstRowMouseLeave = () => {
    if (!isDraggingRef.current.first && !isDraggingRef.current.second) {
      firstRowAnimationRef.current?.resume();
    }
  };

  const handleSecondRowMouseEnter = () => {
    if (!isDraggingRef.current.second) {
      secondRowAnimationRef.current?.pause();
    }
  };

  const handleSecondRowMouseLeave = () => {
    if (!isDraggingRef.current.first && !isDraggingRef.current.second) {
      secondRowAnimationRef.current?.resume();
    }
  };

  return (
    <section className="bg-[#091c32] pt-8 w-full overflow-hidden pb-12 md:pb-16 lg:pb-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-[108rem] mx-auto flex flex-col items-center gap-16">
        {/* Text & Rating */}
        <div className="max-w-[108rem] w-full flex flex-col items-center gap-8 pt-8">
          <a 
            href="https://www.google.com/search?q=Law+Office+of+Tuan+Le+reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <RatingBadge />
          </a>
          
          {/* Hero Heading */}
          <div className="flex flex-col items-center gap-6 w-full text-center">
            <h1 className="font-inter-tight font-semibold text-[2.5rem] lg:text-[3.875rem] leading-[3.25rem] lg:leading-[4.5rem] text-[#9199b9] max-w-[71.5rem]">
              See how we&apos;ve{' '}
              <span className="text-white">helped others achieve their goals</span>, and what the{' '}
              <span className="text-white">Tuan Le experience is truly like.</span>
            </h1>
          </div>
        </div>

        {/* Testimonial Cards - Two Rows with GSAP Animation */}
        <div className="flex flex-col gap-4 w-full">
          {/* First Row - Scrolls Left */}
          <div 
            className="overflow-visible"
            onMouseEnter={handleFirstRowMouseEnter}
            onMouseLeave={handleFirstRowMouseLeave}
          >
            <div ref={firstRowRef} className="flex gap-4 sm:gap-4 items-start cursor-grab" style={{ willChange: 'transform' }}>
              {/* Original cards */}
              {firstRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`first-${index}`} 
                  testimonial={testimonial}
                />
              ))}
              {/* First duplicate cards for seamless loop */}
              {firstRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`first-dup-${index}`} 
                  testimonial={testimonial}
                />
              ))}
              {/* Second duplicate cards for seamless loop */}
              {firstRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`first-dup2-${index}`} 
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          {/* Second Row - Scrolls Right */}
          <div 
            className="overflow-visible"
            onMouseEnter={handleSecondRowMouseEnter}
            onMouseLeave={handleSecondRowMouseLeave}
          >
            <div ref={secondRowRef} className="flex gap-4 sm:gap-4 items-start cursor-grab" style={{ willChange: 'transform' }}>
              {/* Original cards */}
              {secondRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`second-${index}`} 
                  testimonial={testimonial}
                />
              ))}
              {/* First duplicate cards for seamless loop */}
              {secondRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`second-dup-${index}`} 
                  testimonial={testimonial}
                />
              ))}
              {/* Second duplicate cards for seamless loop */}
              {secondRow.map((testimonial, index) => (
                <TestimonialCardFull 
                  key={`second-dup2-${index}`} 
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

