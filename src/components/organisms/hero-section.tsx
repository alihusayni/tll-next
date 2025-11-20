"use client";

import Image from 'next/image';
import SiteHeader from './site-header';
import HeroRatingStar from '../atoms/hero-rating-star';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  return (
    <section className={`relative min-h-screen flex flex-col justify-start items-center bg-[#E8EDF2] m-0 ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero/bg.webp"
          alt="Scenic background image representing immigration law services in Orange County, California"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(9,44,81,0.60)]" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[86.5rem] lg:px-16 xl:px-0">
        <SiteHeader className="w-full" />
      </div>

      {/* Text Container */}
      <div className="relative z-10 w-full max-w-[86.5rem] mx-auto flex flex-col gap-16 px-4 md:px-8 lg:px-16 xl:px-0 pb-16 mt-auto">
        {/* Header Container */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <h2 className="font-inter-tight font-medium text-[20px] md:text-[24px] text-[#D2D5D9]">
            Law Office of Tuan Le
          </h2>
          {/* Title Container */}
          <div className="flex flex-col gap-2">
            <h1 className="font-inter-tight font-semibold text-[52px] md:text-[92px] leading-[1] text-white">
              Immigration Lawyer
            </h1>
            <p className="font-inter-tight font-medium text-[30px] md:text-[40px] text-[#D2D5D9]">
              in Orange County, CA
            </p>
          </div>
        </div>

        {/* Attributes */}
        <div className="flex flex-wrap gap-8">
          <span className="font-inter-tight font-medium text-[20px] md:text-[24px] text-white">
            Experienced.
          </span>
          <span className="font-inter-tight font-medium text-[20px] md:text-[24px] text-white">
            Reliable.
          </span>
          <span className="font-inter-tight font-medium text-[20px] md:text-[24px] text-white">
            Knowledgeable.
          </span>
        </div>

        {/* Button and Rating Container */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          {/* Button */}
           <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group self-start bg-[#E55B1E] text-white font-inter-tight font-semibold text-[18px] rounded-md hover:bg-[#FF7031] active:bg-[#FF7031] transition-all w-[19.375rem] h-[3.25rem] hover:w-[20.5rem] active:w-[20.5rem] flex items-center justify-start gap-4 pl-6">
             30 min FREE CONSULTING
             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:rotate-45 group-active:rotate-45">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Rating */}
          <a
            href="https://www.google.com/search?q=Law+Office+of+Tuan+Le+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col group items-start gap-2 rounded-lg transition-transform hover:bg-white/10 active:bg-white/10 !duration-700 p-4 cursor-pointer"
          >
            {/* Stars - Top Line */}
            <HeroRatingStar rating={5} />
            
            {/* Rating and Reviews - Second Line */}
            <div className="flex items-center gap-2">
              <span className="font-inter-tight font-semibold text-lg text-white">
                5.0/5 RATING
              </span>
              <span className="font-inter-tight font-medium text-sm text-[#D2D5D9]">
                70+ REVIEWS
              </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white transition-all duration-700 group-hover:rotate-45 group-active:rotate-45 group-hover:text-white group-active:text-white">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}