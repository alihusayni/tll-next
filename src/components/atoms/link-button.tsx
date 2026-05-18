import { ReactNode } from 'react';

interface LinkButtonProps {
  text: string;
  href: string;
  className?: string;
  textColor?: string;
  children?: ReactNode;
  useGroupHover?: boolean;
}

export default function LinkButton({
  text,
  href,
  className = '',
  textColor = 'text-white',
  children,
  useGroupHover = false
}: LinkButtonProps) {
  const hoverTextClass = useGroupHover ? 'group-hover:text-[#E55B1E] group-active:text-[#E55B1E]' : 'hover:text-[#E55B1E] group-active:text-[#E55B1E]';
  const hoverRotateClass = useGroupHover ? 'group-hover:rotate-45 group-active:rotate-45' : 'group-hover:rotate-45 group-active:rotate-45';

  return (
    <a
      href={href}
      className={`inline-flex items-center font-inter font-medium text-base ${textColor} ${hoverTextClass} transition-colors group ${className}`}
    >
      {text}
      {/* solar:arrow-right-up-linear — inlined to avoid @iconify/react runtime in this shared atom */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${hoverRotateClass} ml-2 transition-transform flex-shrink-0`}
        aria-hidden="true"
      >
        <path d="M6 18L18 6M18 6H8M18 6V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </a>
  );
}