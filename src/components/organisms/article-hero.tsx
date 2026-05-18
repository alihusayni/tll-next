import Image from 'next/image';
import Breadcrumb from '../atoms/breadcrumb';
import { slugify } from '@/utils/slugify';

// Small blurred placeholder data URI (10x10px blurred version)
const blurredPlaceholder = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/wA==';

interface ArticleHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumb: { display: string; slugs: string[] };
  date: string;
  readTime: string;
  author: string;
}

export default function ArticleHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  breadcrumb,
  date,
  readTime,
  author,
}: ArticleHeroProps) {
  return (
    <section className="bg-[#E8EDF2] flex flex-col items-center gap-8 px-4 sm:px-8 lg:px-16 py-8">
      {/* Article Header */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[95rem]">
        <Breadcrumb display={breadcrumb.display} slugs={breadcrumb.slugs} />
        <div className="flex flex-col items-center gap-8">
          <h1
            id={slugify(title)}
            className="font-inter-tight font-semibold text-center text-[#091C32] max-w-[71.5rem] scroll-mt-20 text-[2.5rem] leading-[1.3em] md:text-[2.5rem] md:leading-[1.3em] lg:text-[3.875rem] lg:leading-[1.1612903225806452em]"
          >
            {title}
          </h1>
          <p className="font-inter text-center text-[#071C32] max-w-[54.5rem] text-[1.125rem] leading-[1.5555555555555556em]">
            {subtitle}
          </p>
          
          {/* Author and Meta Info */}
          <div className="flex flex-col items-center gap-4">
            {/* Author Section */}
            <div className="flex items-center gap-4">
              <span className="font-inter font-normal text-[1rem] leading-[1.5em] text-center text-[#49535D]">
                Written by
              </span>
              <span className="font-inter font-medium text-[1rem] leading-[1.5em] text-center text-[#071C32]">
                {author}
              </span>
            </div>
            
            {/* Date and Read Time */}
            <div className="flex items-center justify-center gap-4">
              <span className="font-inter font-normal text-[1rem] leading-[1.5em] text-center text-[#49535D]">
                {date}
              </span>
              <div className="w-px h-5 bg-[#BBBCBF]"></div>
              <span className="font-inter font-normal text-[1rem] leading-[1.5em] text-center text-[#49535D]">
                {readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full max-w-[71.5rem] rounded-[1rem] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1144}
          height={522}
          className="w-full h-auto object-cover [aspect-ratio:1144.00/522.15]"
          priority
          placeholder="blur"
          blurDataURL={blurredPlaceholder}
        />
      </div>
    </section>
  );
}