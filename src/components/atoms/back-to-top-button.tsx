'use client';

import { useState, useEffect } from 'react';

interface BackToTopButtonProps {
  className?: string;
}

export default function BackToTopButton({ className = '' }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`border-2 border-[#071C32] rounded-md px-6 py-4 h-12 flex items-center justify-center gap-4 hover:bg-[#071C32] hover:text-white transition-colors group ${className}`}
      aria-label="Back to top"
    >
      <span className="font-inter-tight font-semibold text-sm leading-7 text-[#071C32] uppercase group-hover:text-white">
        Back to Top
      </span>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className="group-hover:-translate-y-1 transition-transform"
      >
        <path 
          d="M12 19V5M12 5L5 12M12 5L19 12" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
