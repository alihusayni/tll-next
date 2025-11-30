'use client';

import { useEffect, useRef, useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstRowTickerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secondRowTickerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstRowDraggableRef = useRef<any[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secondRowDraggableRef = useRef<any[] | null>(null);
  const isDraggingRef = useRef({ first: false, second: false });
  const velocityRef = useRef({ first: 0, second: 0 });
  const [isAnyDragging, setIsAnyDragging] = useState(false);
  const [justDragged, setJustDragged] = useState(false);

  // Split testimonials into two rows (30 each for better scrolling)
  const firstRow = testimonials.slice(0, 30);
  const secondRow = testimonials.slice(30, 60);

  // Helper function to wrap items for infinite loop
  const wrapItems = (container: HTMLElement, direction: 'left' | 'right') => {
    const items = container.children;
    const containerWidth = container.scrollWidth / 3; // Since content is tripled

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      const itemX = gsap.getProperty(item, "x") as number;
      const itemWidth = item.offsetWidth;

      if (direction === 'left') {
        // For left-moving row
        if (itemX < -containerWidth - itemWidth) {
          gsap.set(item, { x: itemX + containerWidth * 3 });
        }
      } else {
        // For right-moving row
        if (itemX > containerWidth + itemWidth) {
          gsap.set(item, { x: itemX - containerWidth * 3 });
        }
      }
    }
  };

  useEffect(() => {
    const speed = 0.5;

    // Set initial positions for both rows first
    if (firstRowRef.current) {
      gsap.set(firstRowRef.current, { x: 0 });
    }
    if (secondRowRef.current) {
      const secondRowWidth = secondRowRef.current.scrollWidth / 3;
      gsap.set(secondRowRef.current, { x: -secondRowWidth * 2 }); // Start from the end for right-moving carousel
    }

    // First row - moves left
    if (firstRowRef.current) {
      const firstRowContent = firstRowRef.current;

      // Auto-rotation ticker
      firstRowTickerRef.current = () => {
        gsap.set(firstRowContent, { x: `-=${speed}` });
        wrapItems(firstRowContent, 'left');
      };

      // Create draggable for first row
      firstRowDraggableRef.current = Draggable.create(firstRowContent, {
        type: "x",
        inertia: true,
        onPress() {
          isDraggingRef.current.first = true;
          setIsAnyDragging(true);
          gsap.ticker.remove(firstRowTickerRef.current);
          gsap.set(firstRowContent, { cursor: 'grabbing' });
        },
        onDrag() {
          wrapItems(firstRowContent, 'left');
        },
        onRelease() {
          isDraggingRef.current.first = false;
          setIsAnyDragging(isDraggingRef.current.second);
          setJustDragged(true);
          gsap.set(firstRowContent, { cursor: 'grab' });

          // Resume auto-rotation
          if (firstRowTickerRef.current) gsap.ticker.add(firstRowTickerRef.current);
        }
      });
    }

    // Second row - moves right
    if (secondRowRef.current) {
      const secondRowContent = secondRowRef.current;

      // Auto-rotation ticker
      secondRowTickerRef.current = () => {
        gsap.set(secondRowContent, { x: `+=${speed}` });
        wrapItems(secondRowContent, 'right');
      };

      // Create draggable for second row
      secondRowDraggableRef.current = Draggable.create(secondRowContent, {
        type: "x",
        inertia: true,
        onPress() {
          isDraggingRef.current.second = true;
          setIsAnyDragging(true);
          gsap.ticker.remove(secondRowTickerRef.current);
          gsap.set(secondRowContent, { cursor: 'grabbing' });
        },
        onDrag() {
          wrapItems(secondRowContent, 'right');
        },
        onRelease() {
          isDraggingRef.current.second = false;
          setIsAnyDragging(isDraggingRef.current.first);
          setJustDragged(true);
          gsap.set(secondRowContent, { cursor: 'grab' });

          // Resume auto-rotation
          if (secondRowTickerRef.current) gsap.ticker.add(secondRowTickerRef.current);
        }
      });
    }

    // Start both tickers after DOM is ready
    setTimeout(() => {
      if (firstRowTickerRef.current) gsap.ticker.add(firstRowTickerRef.current);
      if (secondRowTickerRef.current) gsap.ticker.add(secondRowTickerRef.current);
    }, 100);

    // Cleanup on unmount
    return () => {
      if (firstRowTickerRef.current) gsap.ticker.remove(firstRowTickerRef.current);
      if (secondRowTickerRef.current) gsap.ticker.remove(secondRowTickerRef.current);
      firstRowDraggableRef.current?.[0]?.kill();
      secondRowDraggableRef.current?.[0]?.kill();
    };
  }, []);

  // Reset justDragged after a delay to prevent animation jumping
  useEffect(() => {
    if (justDragged) {
      const timer = setTimeout(() => {
        setJustDragged(false);
      }, 1000); // Longer delay to prevent animation jumping on mouse enter
      return () => clearTimeout(timer);
    }
  }, [justDragged]);

  const handleFirstRowMouseEnter = () => {
    if (!isDraggingRef.current.first && !justDragged) {
      if (firstRowTickerRef.current) gsap.ticker.remove(firstRowTickerRef.current);
    }
  };

  const handleFirstRowMouseLeave = () => {
    if (!isDraggingRef.current.first && !isDraggingRef.current.second && !justDragged) {
      if (firstRowTickerRef.current) gsap.ticker.add(firstRowTickerRef.current);
    }
  };

  const handleSecondRowMouseEnter = () => {
    if (!isDraggingRef.current.second && !justDragged) {
      if (secondRowTickerRef.current) gsap.ticker.remove(secondRowTickerRef.current);
    }
  };

  const handleSecondRowMouseLeave = () => {
    if (!isDraggingRef.current.first && !isDraggingRef.current.second && !justDragged) {
      if (secondRowTickerRef.current) gsap.ticker.add(secondRowTickerRef.current);
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
            <div ref={firstRowRef} className="flex gap-4 sm:gap-4 items-start cursor-grab [will-change:transform]">
               {/* Original cards */}
               {firstRow.map((testimonial, index) => (
                 <TestimonialCardFull
                   key={`first-${index}`}
                   testimonial={testimonial}
                   isDragging={isAnyDragging}
                   justDragged={justDragged}
                 />
               ))}
               {/* First duplicate cards for seamless loop */}
               {firstRow.map((testimonial, index) => (
                 <TestimonialCardFull
                   key={`first-dup-${index}`}
                   testimonial={testimonial}
                   isDragging={isAnyDragging}
                   justDragged={justDragged}
                 />
               ))}
               {/* Second duplicate cards for seamless loop */}
               {firstRow.map((testimonial, index) => (
                 <TestimonialCardFull
                   key={`first-dup2-${index}`}
                   testimonial={testimonial}
                   isDragging={isAnyDragging}
                   justDragged={justDragged}
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
            <div ref={secondRowRef} className="flex gap-4 sm:gap-4 items-start cursor-grab [will-change:transform]">
               {/* Original cards */}
               {secondRow.map((testimonial, index) => (
                 <TestimonialCardFull
                   key={`second-${index}`}
                   testimonial={testimonial}
                   isDragging={isAnyDragging}
                   justDragged={justDragged}
                 />
               ))}
               {/* First duplicate cards for seamless loop */}
               {secondRow.map((testimonial, index) => (
                 <TestimonialCardFull
                   key={`second-dup-${index}`}
                   testimonial={testimonial}
                   isDragging={isAnyDragging}
                   justDragged={justDragged}
                 />
               ))}
               {/* Second duplicate cards for seamless loop */}
               {secondRow.map((testimonial, index) => (
                 <TestimonialCardFull
                   key={`second-dup2-${index}`}
                   testimonial={testimonial}
                   isDragging={isAnyDragging}
                   justDragged={justDragged}
                 />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

