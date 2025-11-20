import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <Link
      href={link}
      className={`flex flex-col gap-4 p-0 rounded-2xl group hover:opacity-90 transition-opacity ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-[200px] md:h-[220px] lg:h-[250px] rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <article className="flex flex-col gap-2 pb-4">
        {/* Category */}
        <div className="flex flex-col justify-center leading-[0]">
          <h3 className="font-inter-tight font-normal text-xs md:text-sm leading-4 md:leading-5 text-[#747D85]">
            {category}
          </h3>
        </div>

        {/* Title */}
        <h2 className="font-inter-tight font-semibold text-xl md:text-2xl leading-7 md:leading-8 tracking-[-0.02em] text-[#49535D] line-clamp-2 overflow-hidden text-ellipsis hover:text-hover">
          {title}
        </h2>

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
      </article>
    </Link>
  );
}

