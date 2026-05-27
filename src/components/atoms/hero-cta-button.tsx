"use client";

interface HeroCtaButtonProps {
  className?: string;
}

export default function HeroCtaButton({ className = '' }: HeroCtaButtonProps) {
  return (
    <button
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className={`group bg-[#C04B10] text-white font-inter-tight font-semibold text-[1.125rem] rounded-md hover:bg-[#E55B1E] active:bg-[#E55B1E] transition-all w-[19.375rem] h-[3.25rem] hover:w-[20.5rem] active:w-[20.5rem] flex items-center justify-start gap-4 pl-6 ${className}`}
    >
      30 min FREE CONSULTING
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[0.875rem] h-[0.875rem] transition-transform group-hover:rotate-45 group-active:rotate-45">
        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
