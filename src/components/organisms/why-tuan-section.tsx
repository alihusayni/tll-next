'use client';

import React, { useRef } from 'react';
import ValueCard from '../molecules/value-card';

interface FeatureData {
  iconSrc: string;
  title: string;
  description: string;
}

const features: FeatureData[] = [
  {
    iconSrc: '/assets/features/why_Experienced.png',
    title: 'Experienced',
    description: 'Mr. Le has been representing clients throughout the United States since 2010. A lawyer with extensive experience and a proven track record of success at your service.',
  },
  {
    iconSrc: '/assets/features/why_Reliable.png',
    title: 'Reliable',
    description: 'Fear of rejection and family separation is too much to handle. You don\'t have to worry about paperwork and trusting your lawyer. We\'re proud to reunite families with our services.',
  },
  {
    iconSrc: '/assets/features/why_Bilingual_Services.png',
    title: 'Bilingual Services',
    description: 'Mr. Le offers services in both English and Vietnamese, inspired by his family\'s immigration from Vietnam in 1980. A personal story that has led him to dedicate his work to helping others immigrate or stay in the United States.',
  },
  {
    iconSrc: '/assets/features/why_Nationwide_Representation.png',
    title: 'Nationwide Representation',
    description: 'Licensed in California and admitted to the U.S. District Courts for the Central, Northern, and Eastern Districts, the Law Office of Tuan Le is based in Orange County, CA. However, Mr. Le represents clients in immigration cases across the United States.',
  },
];

const WhyTuanSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#E8EDF2] py-32 px-16 md:py-24 md:px-8 lg:py-32 lg:px-16 m-0">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col gap-16 md:gap-8 lg:gap-16">
          <div className="flex flex-col gap-12.5">
            <p className="font-['Inter_Tight'] font-semibold text-lg leading-[1.222] uppercase text-[#747D85]">
              Our Values
            </p>
            <h2 className="font-['Inter_Tight'] font-semibold text-[34px] md:text-[52px] leading-[1.235] md:leading-[1.154] tracking-[-0.02em] text-[#071C32]">
              Why The Office of Tuan Le?
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex justify-end gap-4">
              <button
                onClick={scrollLeft}
                className="w-14 h-14 rounded-[30px] border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="w-14 h-14 rounded-[30px] border-2 border-gray-400 flex items-center justify-center hover:bg-gray-50"
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {features.map((feature, index) => (
                <ValueCard
                  key={index}
                  iconSrc={feature.iconSrc}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTuanSection;