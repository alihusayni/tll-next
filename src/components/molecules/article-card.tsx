import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ArticleCard({ title, description, image, link }: ArticleCardProps) {
  const [img_src, set_img_src] = useState(image);
  return (
    <Link
      href={link}
      className="flex flex-col gap-4 !pb-8 p-3 sm:p-4 w-80 sm:w-96 flex-shrink-0 flex-grow-0 rounded-[1rem] hover:bg-[#F2F4F7] active:bg-[#F2F4F7] group cursor-pointer transition-all duration-600"
    >
      <div className="relative w-full h-[17.5rem] sm:h-[20.75rem] rounded-[1rem] overflow-hidden">
        <Image
          src={img_src}
          alt={title}
          fill
          sizes="(max-width: 640px) 320px, 384px"
          className="object-cover"
          onError={() => set_img_src("/assets/logo/place-holder.png")}
        />
        <div className="absolute inset-0 bg-[rgba(32,69,134,0.3)] rounded-[1rem]" />
      </div>
        <div className="flex flex-col h-[12.5rem]">
          <div className="h-[3.75rem] mb-5">
            <h3 className="font-inter-tight font-semibold text-xl lg:text-[1.5rem] leading-[1.3] tracking-[-0.02em] text-[#49505D] group-hover:text-[#FF7031] group-active:text-[#FF7031] line-clamp-2 transition-colors">
              {title}
            </h3>
          </div>
          <div className="h-[5rem] mb-5">
            <p className="font-inter font-normal text-lg leading-7 text-[#49535D] group-hover:text-[#071C32] group-active:text-[#071C32] line-clamp-3 transition-colors">
              {description}
            </p>
          </div>
          <div className="flex-1 flex items-end">
            <span className="inline-flex items-center font-inter font-medium text-base text-[#49535D] group-hover:text-[#E55B1E] group-active:text-[#E55B1E] transition-colors">
              Read More
              {/* solar:arrow-right-up-linear — inlined to eliminate @iconify/react runtime */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-2 transition-transform group-hover:rotate-45 group-active:rotate-45"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
    </Link>
  );
}