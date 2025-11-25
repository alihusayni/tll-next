import Image from 'next/image';
import Link from 'next/link';

interface BlogCategoryCardProps {
  title: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  className?: string;
}

export default function BlogCategoryCard({
  title,
  date,
  readTime,
  image,
  link,
  className = ''
}: BlogCategoryCardProps) {
  return (
    <Link
      href={link}
      className={`flex gap-4 p-4 rounded-[1rem] hover:opacity-90 active:opacity-90 transition-opacity min-w-0 flex-shrink-0 ${className}`}
    >
      {/* Image - 90x90px */}
      <div className="relative w-[5.625rem] h-[5.625rem] rounded-[0.5rem] overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <article className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Title */}
        <h2 className="font-inter-tight font-semibold text-[1.125rem] leading-[1.56] tracking-[-0.02em] text-[#49535D] line-clamp-3 overflow-hidden text-ellipsis">
          {title}
        </h2>

        {/* Date & Time */}
        <div className="flex gap-4 items-center">
          <p className="font-inter font-normal text-[0.875rem] leading-[1.71] text-[#747D85]">
            {date}
          </p>
          <div className="h-5 w-[1px] bg-[#BBBCBF]" />
          <p className="font-inter font-normal text-[0.875rem] leading-[1.71] text-[#747D85]">
            {readTime}
          </p>
        </div>
      </article>
    </Link>
  );
}