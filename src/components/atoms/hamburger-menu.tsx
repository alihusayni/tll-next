"use client";

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
      <span
        className={`block w-6 h-0.5 ${color || 'bg-white'} transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 ${color || 'bg-white'} transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 ${color || 'bg-white'} transition-all duration-300 ease-in-out ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
}