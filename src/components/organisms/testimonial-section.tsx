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
    <section className="bg-[#E8EDF2] py-32 px-16 m-0">
      <div className="max-w-[1512px] mx-auto">
        <div className="bg-white rounded-[32px] p-16 flex flex-col gap-28">
          <TestimonialCard
            {...testimonials[currentIndex]}
            onPrev={prev}
            onNext={next}
            canPrev={canPrev}
            canNext={canNext}
          />
          <div className="flex justify-center flex-wrap gap-20">
            {statistics.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1.5 p-2">
                <span className="font-['Inter_Tight'] font-semibold text-[40px] leading-[1.1] tracking-[-0.02em] text-[#49535D]">
                  {stat.value}
                </span>
                <span className="font-['Inter_Tight'] font-normal text-base leading-[1.375] text-[#969799]">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;