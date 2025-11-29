import Image from 'next/image';

interface LogoProps {
  variant?: 'White' | 'Blue';
  className?: string;
}

export default function Logo({ variant = 'White', className = '' }: LogoProps) {
  const src = variant === 'Blue' ? '/assets/logo/blue-logo+text.svg' : '/assets/logo/Logo-White.svg';
  return (
    <Image
      src={src}
      alt="Law Office of Tuan Le Logo"
      width={184}
      height={46}
      className={`w-[11.5rem] h-[2.875rem] ${className}`}
    />
  );
}