import Image from 'next/image';

interface LogoProps {
  variant?: 'blue' | 'Blue';
  className?: string;
}

export default function Logo({ variant = 'blue', className = '' }: LogoProps) {
  const src = variant === 'Blue' ? '/assets/logo/Logo-Blue.png' : '/assets/logo/Logo-blue.png';
  return (
    <Image
      src={src}
      alt="Law Office of Tuan Le Logo"
      width={184}
      height={46}
      className={className}
    />
  );
}