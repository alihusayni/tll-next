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

  useEffect(() => {
    const boxes = refs.current.filter(Boolean) as HTMLAnchorElement[];
    if (boxes.length > 0) {
      const reversed = direction === 'left';
      const loop = horizontalLoop(boxes, { draggable: true, center: true, paused: false, reversed, paddingRight: '20rem', repeat: -1, hoverContainer: containerRef.current });
      boxes.forEach((box, i) => box.addEventListener("click", (e) => {
        e.preventDefault();
        loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"});
      }));
    }
  }, [testimonials, direction]);

  return (
    <div ref={containerRef} className="flex gap-4 sm:gap-4 items-start">
      {testimonials.map((testimonial, index) => (
        <TestimonialCardFull
          key={index}
          ref={(el) => { refs.current[index] = el; }}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}