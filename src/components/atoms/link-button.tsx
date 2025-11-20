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
      <svg
        width="28"
        height="28"
        viewBox="0 0 20 20"
        fill="none"
        className={`${hoverRotateClass} transition-transform`}
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