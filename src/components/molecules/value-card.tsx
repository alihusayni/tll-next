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
    <div className="flex flex-col gap-8 overflow-hidden flex-shrink-0 w-[384px]">
      <div className="relative w-[384px] h-[332px]">
        <Image
          src={iconSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="font-inter-tight font-semibold text-2xl lg:text-[32px] leading-[38px] sm:leading-[35px] lg:leading-[44px] tracking-[-0.48px] lg:tracking-[-0.64px] text-[#49535D]">
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