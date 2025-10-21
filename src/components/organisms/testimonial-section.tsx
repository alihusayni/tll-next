'use client';

import React, { useState } from 'react';
import TestimonialCard from '../molecules/testimonial-card';

interface TestimonialData {
  quote: string;
  author: string;
  rating?: number;
  image?: string;
}

const testimonials: TestimonialData[] = [
  {
    quote: "Tuan Le is an excellent immigration lawyer who helped me through the entire process of obtaining an I-601 waiver for my wife in 9.5 months. He has been patient and informative with all my questions regarding this process.",
    author: "Tuyen Vu",
    rating: 5,
  },
  {
    quote: "Outstanding service and expertise. Tuan handled my complex case with professionalism and care. Highly recommend!",
    author: "John Doe",
    rating: 5,
  },
  {
    quote: "From start to finish, Tuan provided clear guidance and support. My immigration process was smooth thanks to his knowledge.",
    author: "Jane Smith",
    rating: 5,
  },
];

const statistics = [
  { value: "60+", description: "Five-star Reviews" },
  { value: "400+", description: "Cases Represented" },
  { value: "95%", description: "Satisfaction Rate" },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < testimonials.length - 1;

  return (
    <section id="testimonials" className="bg-[#E8EDF2] lg:py-32 lg:px-16 sm:py-15 sm:px-10 py-10 px-5 m-0 -scroll-mt-12">
      <div className="max-w-[95rem] mx-auto">
        <div className="bg-white rounded-[32px] lg:py-25 lg:px-47 sm:py-18 sm:px-10 py-16 px-5 flex flex-col gap-10 lg:gap-15 2xl:gap-28">
          <TestimonialCard
            {...testimonials[currentIndex]}
            onPrev={prev}
            onNext={next}
            canPrev={canPrev}
            canNext={canNext}
          />
          <div className="hidden sm:block">
            <div className="flex justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-20">
              {statistics.map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 p-2">
                  <span className="font-inter-tight font-semibold text-[30px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#49535D]">
                    {stat.value}
                  </span>
                    <span className="font-inter-tight font-normal text-base leading-[1.375] text-[#969799]">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="block sm:hidden">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                {statistics.slice(0, 2).map((stat, index) => (
                  <div key={index} className="flex flex-col items-center gap-1.5 p-2">
                    <span className="font-inter-tight font-semibold text-[30px] leading-[1.1] tracking-[-0.02em] text-[#49535D]">
                      {stat.value}
                    </span>
                  <span className="font-inter-tight font-normal text-base leading-[1.375] text-[#969799]">
                      {stat.description}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2">
                <span className="font-['Inter_Tight'] font-semibold text-[30px] leading-[1.1] tracking-[-0.02em] text-[#49535D]">
                  {statistics[2].value}
                </span>
                <span className="font-['Inter_Tight'] font-normal text-base leading-[1.375] text-[#969799]">
                  {statistics[2].description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;