"use client";

// Hamburger-to-X animation implemented with pure CSS transforms — no GSAP/gsap/react
// required, removing ~30 KiB from the critical path bundle on every page.

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  color?: string;
}

export default function HamburgerMenu({ isOpen, onClick, className = '', color }: HamburgerMenuProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/50 rounded ${className}`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {/* Top bar: rotates +45° and shifts down when open */}
      <span
        className={`block w-5 h-[0.063rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${color || 'bg-white'} ${
          isOpen ? 'translate-y-[0.5rem] rotate-45' : ''
        }`}
      />
      {/* Middle bar: fades out when open */}
      <span
        className={`block w-5 h-[0.063rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${color || 'bg-white'} ${
          isOpen ? 'opacity-0 scale-x-75' : ''
        }`}
      />
      {/* Bottom bar: rotates −45° and shifts up when open */}
      <span
        className={`block w-5 h-[0.063rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${color || 'bg-white'} ${
          isOpen ? '-translate-y-[0.5rem] -rotate-45' : ''
        }`}
      />
    </button>
  );
}