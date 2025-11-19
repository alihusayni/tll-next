"use client";

 import { useState } from 'react';
import Logo from '../atoms/logo';
import MainNav from '../molecules/main-nav';


interface SiteHeaderProps {
  className?: string;
}

export default function SiteHeader({ className = '' }: SiteHeaderProps) {
  const [isMobileMenuOpen] = useState(false);

  return (
    <header className={`bg-transparent ${className}`}>
      <div className="flex justify-between items-center py-8 px-4 md:px-8 lg:px-16">
        <Logo variant="White" />
        <div className="flex items-center gap-16">
          <MainNav className="hidden lg:flex" />
           <a href="tel:(714) 877 5840" className="inline-flex items-center justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 border-white text-white hover:bg-[#E55B1E] hover:border-[#E55B1E] hover:text-white active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white px-6 py-4 text-base h-12 hidden md:flex whitespace-nowrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
            </svg>
            Talk to Us
          </a>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/10 backdrop-blur-sm">
          <MainNav className="flex flex-col items-center gap-4 py-4" />
        </div>
      )}
    </header>
  );
}