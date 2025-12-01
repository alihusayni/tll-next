'use client';

import { useEffect, useRef } from 'react';
import TestimonialCardFull from './testimonial-card-full';
import { Testimonial } from '@/data/testimonials';
import horizontalLoop from '@/lib/horizontal-loop';

interface TestimonialRowProps {
  testimonials: Testimonial[];
  direction: 'right' | 'left';
}

export default function TestimonialRow({ testimonials, direction }: TestimonialRowProps) {
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{x: number, y: number, time: number} | null>(null);

  useEffect(() => {
    const boxes = refs.current.filter(Boolean) as HTMLAnchorElement[];
    if (boxes.length > 0) {
      const reversed = direction === 'left';
      const loop = horizontalLoop(boxes, { draggable: true, center: true, paused: false, reversed, paddingRight: '20rem', repeat: -1, hoverContainer: containerRef.current });

      const handleMouseDown = (e: MouseEvent) => {
        dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      };

      const handleClick = (e: MouseEvent, index: number) => {
        const start = dragStartRef.current;
        if (start) {
          const deltaX = Math.abs(e.clientX - start.x);
          const deltaY = Math.abs(e.clientY - start.y);
          const deltaTime = Date.now() - start.time;

          // If moved more than 5px or took longer than 300ms, consider it a drag
          if (deltaX > 5 || deltaY > 5 || deltaTime > 300) {
            e.preventDefault();
            loop.toIndex(index, {duration: 0.8, ease: "power1.inOut"});
          }
          // If it's a quick click with minimal movement, allow the link to work
        }
        dragStartRef.current = null;
      };

      boxes.forEach((box, i) => {
        box.addEventListener("mousedown", handleMouseDown);
        box.addEventListener("click", (e) => handleClick(e, i));
      });
    }
  }, [testimonials, direction]);

  return (
    <div ref={containerRef} className="flex gap-4 sm:gap-4 items-start">
      {testimonials.map((testimonial, index) => (
        <TestimonialCardFull
          key={index}
          ref={(el) => { refs.current[index] = el; }}
          testimonial={testimonial}
          className="opacity-0"
        />
      ))}
    </div>
  );
}