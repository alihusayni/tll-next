import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export default function NavLink({ href, children, isActive = false, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`font-inter-tight font-medium text-[18px] uppercase text-white border-b-2 border-transparent hover:border-white transition-colors ${isActive ? 'text-orange-500 border-orange-500' : ''} ${className}`}
    >
      {children}
    </Link>
  );
}