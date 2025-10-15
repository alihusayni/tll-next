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
    <div className="flex flex-col gap-8 w-[384px] overflow-hidden">
      <div className="relative w-[384px] rounded h-[332px]">
        <Image
          src={iconSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 p-5">
        <h3 className="font-['Inter_Tight'] font-semibold text-2xl leading-[1.375] tracking-[-0.02em] text-[#49535D]">
          {title}
        </h3>
        <p className="font-['Inter'] font-normal text-lg leading-[1.222] text-[#071C32]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ValueCard;