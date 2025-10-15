import Image from 'next/image';

interface FeatureIconProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FeatureIcon({ src, alt, className = '' }: FeatureIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={384}
      height={332}
      className={className}
    />
  );
}