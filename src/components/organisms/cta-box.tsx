import Image from 'next/image';

export default function CtaBox() {
  return (
    <div className="relative bg-[#000B1A] rounded-2xl overflow-hidden w-full max-w-[914px] mx-auto">
      {/* Glow effect */}
      <div className="absolute bottom-[-4rem] left-[-16rem]">
        <div className="w-[494px] h-[302px] bg-gray-900 rounded-full blur-[143px]"></div>
      </div>

       {/* Background Image */}
       <div className="absolute right-0 top-0 w-[389px] h-[364px] bg-red-400">
        <Image
          src="/assets/blog/CTA_box_img.png"
          alt="CTA background"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B1A] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center py-18 pl-20 pr-0">
        <div className="flex-1 max-w-[515px]">
          <h2 className="text-4xl font-inter-tight font-semibold text-white leading-tight mb-8 tracking-tight">
            Mr. Le Grants You a <br />
            30-Minutes Free Consultation for Legal Advice
          </h2>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-[#E55B1E] text-white font-inter-tight font-semibold text-[18px] uppercase rounded-md hover:bg-[#FF7031] active:bg-[#FF7031] transition-all w-[13.25rem] h-[3.25rem] hover:w-[14.375rem] active:w-[14.375rem] flex items-center justify-start gap-4 pl-6">
             schedule now
             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:rotate-45 group-active:rotate-45">
               <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
}