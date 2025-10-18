import React from 'react';
import Image from 'next/image';
import RatingStar from '../atoms/rating-star';

interface TestimonialProps {
  quote: string;
  author: string;
  rating?: number;
  image?: string;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  rating = 5,
  image,
  onPrev,
  onNext,
  canPrev,
  canNext,
}) => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex justify-between items-center">
        <RatingStar rating={rating} />
        <div className="flex gap-4">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className="w-14 h-14 rounded-[30px] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-transparent hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L1 6M1 6L6 11M1 6L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={onNext}
            disabled={!canNext}
            className="w-14 h-14 rounded-[30px] border-2 border-[#747D85] text-[#747D85] flex items-center justify-center disabled:border-[#D2D5D9] disabled:text-transparent hover:border-[#FF7031] hover:text-[#FF7031] active:border-[#FF7031] active:text-[#FF7031]"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6L15 6M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <p className="font-['Inter_Tight'] font-normal text-[30px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] text-[#071C32]">
        {quote}
      </p>
      <div className="flex items-center gap-5">
        {image && (
          <Image
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        )}
        <div className="flex items-center gap-5">
          <div className="w-[60px] h-[1.4px] bg-[#E55B1E]"></div>
          <span className="font-['Inter_Tight'] font-medium text-lg leading-[1.222] uppercase text-[#969799]">
            {author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;