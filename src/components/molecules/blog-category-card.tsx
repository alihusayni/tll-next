import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  const [img_src, set_img_src] = useState(image);

  useEffect(() => {
    set_img_src(image);
  }, [image]);

  return (
    <Link
      href={link}
      className={`flex group gap-4 pb-3.5 pr-3.5 rounded-[1rem] hover:opacity-90 active:opacity-90 transition-opacity min-w-0 flex-shrink-0 ${className}`}
    >
      {/* Image - 90x90px */}
      <div className="relative w-[5.625rem] h-[5.625rem] rounded-[0.5rem] overflow-hidden flex-shrink-0">
        <Image
          src={img_src}
          alt={title}
          fill
          className="object-cover"
          onError={() => set_img_src("https://tuanlelaw.s3.amazonaws.com/assets/logo/place-holder.png")}
        />
      </div>

      {/* Content */}
      <article className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Title */}
        <h2 className="font-inter-tight font-semibold text-lg leading-7 tracking-[-0.023rem] text-[#49535D] line-clamp-2 overflow-hidden text-ellipsis group-hover:text-hover group-active:text-hover">
          {title}
        </h2>

        {/* Date & Time */}
        <div className="flex gap-4 items-center">
          <p className="font-inter font-normal text-[0.875rem] leading-[1.71] text-[#49535D]">
            {date}
          </p>
          <div className="h-5 w-[0.063rem] bg-[#BBBCBF]" />
          <p className="font-inter font-normal text-[0.875rem] leading-[1.71] text-[#49535D]">
            {readTime}
          </p>
        </div>
      </article>
    </Link>
  );
}