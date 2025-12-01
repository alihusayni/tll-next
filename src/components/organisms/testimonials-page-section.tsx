'use client';

import RatingBadge from '../molecules/rating-badge';
import TestimonialRow from '../molecules/testimonial-row';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsPageSection() {

  // Split testimonials into two rows (30 each for better scrolling)
  const firstRow = testimonials.slice(0, 30);
  const secondRow = testimonials.slice(30, 60);

  return (
    <section className="bg-[#091c32] pt-8 w-full overflow-hidden pb-12 md:pb-16 lg:pb-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-[108rem] mx-auto flex flex-col items-center">
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
      </div>

      {/* Testimonial Cards */}
      <div className="flex flex-col gap-4 w-full mt-16 -mx-4 md:-mx-8 lg:-mx-16">
        <TestimonialRow testimonials={firstRow} direction="right" />
        <TestimonialRow testimonials={secondRow} direction="left" />
      </div>
    </section>
  );
}

