import { ReactNode } from 'react';

interface LinkButtonProps {
  text: string;
  href: string;
  className?: string;
  children?: ReactNode;
}

export default function LinkButton({
  text,
  href,
  className = '',
  children
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 font-inter font-medium text-base text-white hover:text-[#E55B1E] transition-colors ${className}`}
    >
      {text}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="ml-1"
      >
        <path
          d="M7.5 12.75L12.75 7.5M12.75 7.5H9M12.75 7.5V11.25"
          stroke="currentColor"
          strokeWidth="1.125"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </a>
  );
}