import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Image
      src="/assets/logo/Logo-blue.png"
      alt="Law Office of Tuan Le Logo"
      width={184}
      height={46}
      className={className}
    />
  );
}