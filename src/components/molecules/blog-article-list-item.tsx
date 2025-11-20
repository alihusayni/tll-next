import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <Link
      href={link}
      className={`flex flex-col md:flex-row gap-4 md:h-[220px] items-start p-0 rounded-2xl group hover:opacity-90 transition-opacity ${className}`}
    >
      {/* Image */}
      <div className="flex flex-[1_0_0] h-[200px] md:h-[220px] items-start w-full md:max-w-[408px] md:min-w-[240px] overflow-hidden relative rounded-lg shrink-0">
        <div className="relative w-full h-full rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="box-border flex flex-[1_0_0] flex-col gap-4 md:gap-8 items-start min-h-px w-full md:min-w-[240px] pb-4 pt-0 px-0 relative shrink-0">
        <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
          {/* Category */}
          <div className="flex flex-col justify-center leading-[0]">
            <p className="font-inter-tight font-normal text-xs md:text-sm leading-4 md:leading-5 text-[#747D85]">
              {category}
            </p>
          </div>

          {/* Title */}
          <p className="font-inter-tight font-semibold text-xl md:text-2xl leading-7 md:leading-8 tracking-[-0.02em] text-[#49535D] min-w-full overflow-hidden text-ellipsis line-clamp-2 hover:text-hover">
            {title}
          </p>

          {/* Excerpt */}
          <div className="font-inter font-normal text-sm md:text-base leading-5 md:leading-6 text-[#49535D] min-w-full overflow-hidden text-ellipsis line-clamp-3">
            {excerpt}
          </div>

          {/* Date & Time */}
          <div className="flex gap-2 md:gap-4 items-center">
            <p className="font-inter font-normal text-xs md:text-sm leading-5 md:leading-6 text-[#747D85] text-center">
              {date}
            </p>
            <div className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rotate-90">
              <div className="h-0 w-4 md:w-5 border-t border-[#BBBCBF]" />
            </div>
            <p className="font-inter font-normal text-xs md:text-sm leading-5 md:leading-6 text-[#747D85] text-center">
              {readTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

