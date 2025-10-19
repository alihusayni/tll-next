"use client";

import Image from 'next/image';
import SiteHeader from './site-header';

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
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(9,44,81,0.60)]" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[90rem]">
        <SiteHeader className="w-full" />
      </div>

      {/* Text Container */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col gap-12 px-4 md:px-8 lg:px-16 pb-16 mt-auto">
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

        {/* Button */}
         <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group self-start bg-[#E55B1E] text-white font-inter-tight font-semibold text-[18px] uppercase rounded-md hover:bg-[#FF7031] active:bg-[#FF7031] transition-all w-[19.375rem] h-[3.25rem] hover:w-[20.5rem] active:w-[20.5rem] flex items-center justify-start gap-4 pl-6">
           30-M free consulting
           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:rotate-45 group-active:rotate-45">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}