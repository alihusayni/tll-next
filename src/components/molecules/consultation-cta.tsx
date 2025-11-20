import Link from 'next/link';

interface ConsultationCTAProps {
  className?: string;
}

export default function ConsultationCTA({ className = '' }: ConsultationCTAProps) {
  return (
    <div className={`relative bg-[#000B1A] border-2 border-[#EA981D] rounded-2xl overflow-hidden min-h-[200px] md:min-h-[280px] ${className}`}>
      {/* Background glow effect */}
      <div className="absolute left-[-125px] top-[50%] -translate-y-1/2 w-[300px] md:w-[494px] h-[200px] md:h-[302px] opacity-30 md:opacity-50">
        <div className="absolute inset-0 bg-gradient-radial from-[#EA981D]/30 to-transparent blur-3xl" />
      </div>

      {/* Consultation Image - Hide on small screens */}
      <div className="hidden md:block absolute bottom-0 right-[-10%] top-0 left-[48%] pointer-events-none opacity-70">
        <div className="relative w-full h-full bg-gradient-to-l from-[#1a2332] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 lg:p-16">
        <div className="flex flex-col gap-6 md:gap-8 max-w-full md:max-w-[600px]">
          <h2 className="font-inter-tight font-semibold text-2xl md:text-3xl lg:text-4xl leading-8 md:leading-[44px] lg:leading-[50px] tracking-[-0.02em] text-white">
            Mr. Le Grants You a{' '}
            <span className="block md:inline">30-Minutes Free Consultation for Legal Advice</span>
          </h2>
          
          <Link
            href="/contact"
            className="bg-[#E55B1E] rounded-md px-6 md:px-8 py-4 md:py-6 h-[48px] md:h-[52px] flex items-center justify-center gap-3 md:gap-4 w-fit hover:bg-[#FF7031] transition-colors group"
          >
            <span className="font-inter-tight font-semibold text-base md:text-lg leading-6 md:leading-7 text-white uppercase">
              Schedule now
            </span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="group-hover:translate-x-1 transition-transform md:w-6 md:h-6"
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

