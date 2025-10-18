import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export default function NavLink({ href, children, isActive = false, className = '' }: NavLinkProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('navScroll'));
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`font-inter-tight font-medium text-lg leading-[22px] uppercase whitespace-nowrap text-white border-b-2 border-transparent hover:border-white transition-colors ${isActive ? 'text-orange-500 border-orange-500' : ''} ${className}`}
    >
      {children}
    </Link>
  );
}