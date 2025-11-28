import Image from 'next/image';
import LinkButton from '../atoms/link-button';

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ArticleCard({ title, description, image, link }: ArticleCardProps) {
  return (
    <div 
      onClick={() => window.location.href = link}
      className="flex flex-col gap-4 !pb-8 p-3 sm:p-4 w-80 sm:w-96 flex-shrink-0 flex-grow-0 rounded-[1rem] hover:bg-[#F2F4F7] active:bg-[#F2F4F7] group cursor-pointer transition-all duration-600"
    >
      <div className="relative w-full h-[17.5rem] sm:h-[20.75rem] rounded-[1rem] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
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
            <LinkButton text="Read More" href={link} textColor="text-[#49535D]" useGroupHover={true} />
          </div>
        </div>
    </div>
  );
}