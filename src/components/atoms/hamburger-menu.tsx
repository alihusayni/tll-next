"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  color?: string;
}

export default function HamburgerMenu({ isOpen, onClick, className = '', color }: HamburgerMenuProps) {
  const topRef = useRef<HTMLSpanElement>(null);
  const middleRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(topRef.current, { rotation: 45, y: 8, duration: 0.3, ease: 'power2.out' })
        .to(middleRef.current, { opacity: 0, scaleX: 0.75, duration: 0.3, ease: 'power2.out' }, "-=0.2")
        .to(bottomRef.current, { rotation: -45, y: -8, duration: 0.3, ease: 'power2.out' }, "-=0.2");
    } else {
      tl.to(topRef.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' })
        .to(middleRef.current, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' }, "-=0.2")
        .to(bottomRef.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' }, "-=0.2");
    }
  }, [isOpen]);

  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/50 rounded ${className}`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        ref={topRef}
        className={`block w-5 h-[0.063rem] ${color || 'bg-white'}`}
      />
      <span
        ref={middleRef}
        className={`block w-5 h-[0.063rem] ${color || 'bg-white'}`}
      />
      <span
        ref={bottomRef}
        className={`block w-5 h-[0.063rem] ${color || 'bg-white'}`}
      />
    </button>
  );
}