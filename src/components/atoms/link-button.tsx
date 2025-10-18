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
      className={`inline-flex items-center font-inter font-medium text-base text-white hover:text-[#E55B1E] transition-colors group ${className}`}
    >
      {text}
      <svg
        width="28"
        height="28"
        viewBox="0 0 20 20"
        fill="none"
        className="group-hover:rotate-45 transition-transform"
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