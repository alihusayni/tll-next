import Image from 'next/image';
import Logo from '../atoms/logo';
import UiButton from '../atoms/ui-button';
import Breadcrumb from '../atoms/breadcrumb';
import ArticleMeta from '../molecules/article-meta';

interface ArticleHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumb: string;
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
    <section className="bg-[#E8EDF2] flex flex-col items-center gap-8 px-4 md:px-8 lg:px-16 pb-16">
      {/* Page Header */}
      <header className="bg-transparent w-full py-8 pb-6">
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-16">
          <Logo variant="Blue" />
          <UiButton variant="dark-outline" size="md">
            Contact us
          </UiButton>
        </div>
      </header>

      {/* Article Header */}
      <div className="flex flex-col items-center gap-6 w-full max-w-6xl">
        <Breadcrumb path={breadcrumb} />
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-[62px] font-inter-tight font-semibold text-center text-[#091C32] leading-tight">
            {title}
          </h1>
          <p className="text-lg text-center text-[#071C32] max-w-6xl">
            {subtitle}
          </p>
          <ArticleMeta date={date} readTime={readTime} />
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={522}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </section>
  );
}