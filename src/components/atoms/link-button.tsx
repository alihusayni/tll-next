import { ReactNode } from 'react';
import { Icon } from '@iconify/react';

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
      <Icon
        icon="solar:arrow-right-up-linear"
        width="18"
        height="18"
        className={`${hoverRotateClass} ml-2 transition-transform`}
      />
      {children}
    </a>
  );
}