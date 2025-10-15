import Image from 'next/image';

interface BadgeIconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function BadgeIcon({
  src,
  alt,
  width,
  height,
  className = ''
}: BadgeIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}