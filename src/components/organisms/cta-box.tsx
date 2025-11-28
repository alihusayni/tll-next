'use client';

import Image from 'next/image';

export default function CtaBox() {
  return (
    <div className="relative bg-[#000B1A] rounded-[1rem] overflow-hidden w-full max-w-[57.125rem] max-h-[23.5rem] mx-auto not-prose border-2 border-[#EA981D]">
      {/* Glow effect */}
      <div className="absolute -bottom-16 -left-64 not-prose">
        <div className="w-[30.875rem] h-[18.875rem] bg-[#111827] rounded-full blur-[143px] not-prose"></div>
      </div>

        {/* Background Image */}
        <div className="absolute right-0 top-0 w-[24.3125rem] h-[23.5rem] not-prose bg-red-400">
        <Image
          src="/assets/blog/CTA_box_img.png"
          alt="Image depicting legal consultation and free advice services"
          fill
          className="not-prose object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B1A] to-transparent not-prose"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex !items-center !py-[4.5rem] !pl-[5rem]">
        <div className="!flex-1">
          <h2 className="!text-[2.25rem] !font-inter-tight !font-semibold !text-white !leading-tight !mb-8 !mt-0 !tracking-[-0.025em]">
            Mr. Le Grants You a <br/> 30-Minutes Free Consultation for Legal Advice
          </h2>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-[#E55B1E] text-white font-inter-tight font-semibold text-lg uppercase rounded-md hover:bg-[#FF7031] active:bg-[#FF7031] transition-all w-[13.25rem] h-[3.25rem] hover:w-[14.375rem] active:w-[14.375rem] flex items-center justify-start gap-4 pl-6">
             schedule now
             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 transition-transform group-hover:rotate-45 group-active:rotate-45">
               <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
}