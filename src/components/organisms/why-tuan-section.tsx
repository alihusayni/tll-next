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
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current && canScrollLeft) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && canScrollRight) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="why-tuan-le" className="bg-[#E8EDF2] py-15 px-4 md:py-24 md:px-8 lg:py-32 lg:px-16 m-0 -scroll-mt-10 overflow-x-clip">
      <div className="max-w-[95rem] mx-auto">
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-16">
          <div className="flex flex-col gap-8 lg:gap-12.5">
            <p className="font-inter-tight font-semibold text-lg leading-[1.222] uppercase text-[#747D85]">
              Our Values
            </p>
            <div className="flex flex-col gap-16 sm:flex-row sm:justify-between md:items-end">
              <h2 className="font-inter-tight font-semibold text-[34px] lg:text-[52px] leading-[42px] md:leading-[1.154] tracking-[-0.68px] text-[#071C32] max-w-[31rem]">
                Why The Office of Tuan Le?
              </h2>
              <div className="flex gap-4 self-end">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className="w-14 h-14 rounded-[30px] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-transparent hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className="w-14 h-14 rounded-[30px] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-transparent hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide"
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