import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogArticleListItemProps {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  className?: string;
}

export default function BlogArticleListItem({
  title,
  category,
  excerpt,
  date,
  readTime,
  image,
  link,
  className = ''
}: BlogArticleListItemProps) {
  const [img_src, set_img_src] = useState(image);

  // Update image source when image prop changes
  useEffect(() => {
    set_img_src(image);
  }, [image]);

  return (
    <Link
      href={link}
      className={`flex flex-col sm:flex-row gap-4 sm:h-[13.75rem] min-h-[13.75rem] md:min-h-0 items-start p-0 rounded-[1rem] group hover:opacity-90 active:opacity-90 transition-opacity ${className}`}
    >
      {/* Image */}
      <div className="flex items-start h-[13.75rem] w-full sm:w-[20.75rem] lg:w-full max-w-[25.5rem] min-w-[20.75rem] overflow-hidden relative rounded-lg">
        <Image
          src={img_src}
          alt={title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 408px, 408px"
          onError={() => set_img_src("/assets/logo/place-holder.png")}
        />
      </div>

      {/* Content */}
      <div className="box-border flex-col gap-4 md:gap-8 items-start min-h-px flex-1 md:min-w-[15rem] pb-4 pt-0 px-0 relative shrink-0 overflow-hidden">
        <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
          {/* Category */}
          <div className="flex flex-col justify-center">
            <p className="font-inter-tight font-normal text-sm leading-5 text-[#747D85]">
              {category}
            </p>
          </div>

          {/* Title */}
          <p className="font-inter-tight font-semibold text-xl lg:text-[1.5rem] leading-8 lg:leading-[1.625rem] tracking-[-0.03rem] lg:tracking-[-0.025rem] text-[#49535D] min-w-full overflow-hidden text-ellipsis line-clamp-2 group-hover:text-hover group-active:text-hover">
            {title}
          </p>

          {/* Excerpt */}
          <div className="font-inter font-normal text-base leading-5 md:leading-6 text-[#49535D] min-w-full overflow-hidden text-ellipsis line-clamp-3">
            {excerpt}
          </div>

          {/* Date & Time */}
          <div className="flex gap-2 md:gap-4 items-center">
            <p className="font-inter font-normal text-sm leading-5 md:leading-6 text-[#747D85] text-center">
              {date}
            </p>
            <div className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rotate-90">
              <div className="h-0 w-4 md:w-5 border-t border-[#BBBCBF]" />
            </div>
            <p className="font-inter font-normal text-sm leading-5 md:leading-6 text-[#747D85] text-center">
              {readTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

