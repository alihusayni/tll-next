interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function MobileMenuToggle({ isOpen, onToggle, className = '' }: MobileMenuToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex flex-col justify-center items-center w-8 h-8 ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
      <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
    </button>
  );
}