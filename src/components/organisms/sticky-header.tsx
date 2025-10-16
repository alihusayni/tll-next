"use client";

import { useState, useEffect, useRef } from 'react';
import Logo from '../atoms/logo';
import MainNav from '../molecules/main-nav';
import UiButton from '../atoms/ui-button';

interface StickyHeaderProps {
  className?: string;
}

export default function StickyHeader({ className = '' }: StickyHeaderProps) {
  const [show, setShow] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling down
        setShow(true);
      } else if (currentScrollY < lastScrollY.current - 10) {
        // Scrolling up
        setShow(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#091C32] shadow-md transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}>
      <div className="w-full max-w-[90rem] mx-auto">
        <div className="flex justify-between items-center py-8 px-4 md:px-8 lg:px-16">
        <Logo variant="blue" />
        <MainNav className="hidden lg:flex" />
        <div className="flex items-center gap-4">
          <UiButton variant="outline" size="md" className="hidden md:flex whitespace-nowrap">
            Contact us
          </UiButton>
        </div>
        </div>
      </div>
    </header>
  );
}