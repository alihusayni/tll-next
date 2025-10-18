import { ReactNode } from 'react';

interface UiButtonProps {
  variant: 'outline' | 'primary' | 'dark-outline';
  size: 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function UiButton({
  variant,
  size,
  children,
  onClick,
  className = '',
  type = 'button'
}: UiButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md';

  const variantClasses = {
    outline: 'bg-transparent border-2 border-white text-white hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white',
    'dark-outline': 'bg-transparent border-2 border-[#071C32] text-[#071C32] hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white',
    primary: 'bg-[#E55B1E] text-white hover:bg-[#d44a1a] active:bg-[#d44a1a]'
  };

  const sizeClasses = {
    md: 'px-6 py-4 text-base h-12',
    lg: 'px-8 py-6 text-lg h-13'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}