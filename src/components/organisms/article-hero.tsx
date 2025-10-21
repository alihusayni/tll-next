import Image from 'next/image';
import Logo from '../atoms/logo';
import UiButton from '../atoms/ui-button';
import Breadcrumb from '../atoms/breadcrumb';
import ArticleMeta from '../molecules/article-meta';
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
}

export default function ArticleHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  breadcrumb,
  date,
  readTime,
}: ArticleHeroProps) {
return (
    <section className="bg-[#E8EDF2] flex flex-col items-center gap-8 px-4 md:px-8 lg:px-16 xl:px-16 pb-16">
      {/* Article Header */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[95rem]">
        <Breadcrumb display={breadcrumb.display} slugs={breadcrumb.slugs} />
        <div className="flex flex-col items-center gap-8">
          <h1
            id={slugify(title)}
            className="font-inter-tight font-semibold text-center text-[#091C32] max-w-[71.5rem] scroll-mt-20 text-[40px] md:text-[50px] lg:text-[62px] leading-[1.3em] md:leading-[1.2352941176470589em] lg:leading-[1.1612903225806452em]"
          >
            {title}
          </h1>
          <p className="font-inter text-center text-[#071C32] max-w-[54.5rem] text-[16px] md:text-[18px] leading-[1.25em] md:leading-[1.3333333333333333em]">
            {subtitle}
          </p>
           <ArticleMeta date={date} readTime={readTime} />
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full max-w-[71.5rem] max-h-[32.634rem] rounded-2xl overflow-hidden">
         <Image
           src={imageSrc}
           alt={imageAlt}
           width={1144}
           height={522}
           className="w-full h-auto object-cover"
           style={{ aspectRatio: '1144.00/522.15' }}
           priority
           placeholder="blur"
           blurDataURL={blurredPlaceholder}
         />
      </div>
    </section>
  );
}