import React from 'react';
import Image from 'next/image';

interface ValueCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  iconSrc,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-8 overflow-hidden flex-shrink-0 w-96">
      <div className="relative w-96 h-[20.75rem]">
        <Image
          src={iconSrc}
          alt={`Icon representing ${title.toLowerCase()}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="font-inter-tight font-semibold text-[1.5rem] lg:text-[1.5rem] leading-[2.375rem] sm:leading-[2.1875rem] lg:leading-[2.75rem] tracking-[-0.03rem] lg:tracking-[-0.04rem] text-[#49535D]">
          {title}
        </h3>
        <p className="font-inter font-normal text-lg leading-[1.222] text-[#071C32]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ValueCard;