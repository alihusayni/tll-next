import Image from 'next/image';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardFullProps {
  testimonial: Testimonial;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function TestimonialCardFull({ testimonial, onMouseEnter, onMouseLeave }: TestimonialCardFullProps) {
  return (
    <div 
      className="bg-[#000b1a] hover:bg-[#00356e] rounded-[24px] md:rounded-[24px] sm:rounded-[12px] p-[32px] md:p-[32px] sm:p-[16px] flex flex-col gap-[32px] sm:gap-[32px] min-w-[280px] sm:min-w-[280px] max-w-[460px] w-[460px] md:w-[460px] sm:w-[280px] flex-shrink-0 transition-all duration-500 ease-in-out cursor-pointer group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Stars - 5 stars in a row (Solar Icons) */}
      <div className="relative h-[21px] w-[120px] flex-shrink-0 flex gap-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="24" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[21px]">
            <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#FFAD31"/>
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="font-inter font-normal text-[18px] leading-[28px] text-white">
        {testimonial.quote}
      </p>

      {/* Author Info */}
      <div className="flex items-center justify-between gap-[16px]">
        <div className="flex items-center gap-[16px] sm:gap-[16px]">
          <div className="relative w-[64px] h-[64px] sm:w-[48px] sm:h-[48px] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-0">
            <p className="font-inter font-normal text-[18px] leading-[28px] text-white">
              {testimonial.author}
            </p>
            <p className="font-inter font-normal text-[16px] leading-[24px] text-[#d2d5d9]">
              {testimonial.caseType}
            </p>
          </div>
        </div>
        
        {/* Arrow Icon - Solar Icons - Smooth morphing transformation */}
        <div className="w-[24px] h-[24px] sm:w-[20px] sm:h-[20px] flex items-center justify-center flex-shrink-0 relative overflow-visible">
          {/* Default: Arrow Right Up (Solar Icon Linear) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] sm:w-[20px] sm:h-[20px] absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-100 group-hover:opacity-0 group-hover:rotate-[135deg] group-hover:scale-75">
            <path d="M6 18L18 6M18 6H10M18 6V14" stroke="#969799" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"/>
          </svg>
          {/* Hover: Arrow Right (Solar Icon Linear) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] sm:w-[20px] sm:h-[20px] absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 group-hover:opacity-100 -rotate-[135deg] group-hover:rotate-0 scale-75 group-hover:scale-100">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

