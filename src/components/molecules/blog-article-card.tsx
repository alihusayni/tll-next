import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface BlogArticleCardProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  className?: string;
}

export default function BlogArticleCard({
  title,
  category,
  date,
  readTime,
  image,
  link,
  className = ''
}: BlogArticleCardProps) {
  const [img_src, set_img_src] = useState(image);

  return (
    <Link
      href={link}
      className={`flex flex-col gap-4 p-0 rounded-[1rem] group hover:opacity-90 active:opacity-90 transition-opacity ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-[15.625rem] rounded-lg overflow-hidden">
        <Image
          src={img_src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 408px, 408px"
          className="object-cover"
          onError={() => set_img_src("/assets/logo/place-holder.png")}
        />
      </div>

      {/* Content */}
      <article className="flex flex-col gap-2 pb-4">
        {/* Category */}
        <div className="flex flex-col justify-center">
          <h3 className="font-inter-tight font-normal text-sm leading-5 text-[#747D85]">
            {category}
          </h3>
        </div>

        {/* Title */}
        <h2 className="font-inter-tight font-semibold text-xl lg:text-[1.5rem] leading-[1.625rem] lg:leading-8 tracking-[-0.025rem] lg:tracking-[-0.03rem] text-[#49535D] line-clamp-2 overflow-hidden text-ellipsis group-hover:text-hover group-active:text-hover">
          {title}
        </h2>

        {/* Date & Time */}
        <div className="flex gap-2 items-center">
          <p className="font-inter font-normal text-sm leading-5 lg:leading-6 text-[#747D85] text-center">
            {date}
          </p>
          <div className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rotate-90">
            <div className="h-0 w-4 md:w-5 border-t border-[#BBBCBF]" />
          </div>
          <p className="font-inter font-normal text-sm leading-5 lg:leading-6 text-[#747D85] text-center">
            {readTime}
          </p>
        </div>
      </article>
    </Link>
  );
}