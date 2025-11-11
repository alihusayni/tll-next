'use client';

import Image from 'next/image';

export default function CtaBox() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#000B1A', borderRadius: '1rem', overflow: 'hidden', width: '100%', maxWidth: '57.125rem', maxHeight: '23.5rem', margin: '0 auto' }} className="not-prose">
      {/* Glow effect */}
      <div className="not-prose" style={{ position: 'absolute', bottom: '-4rem', left: '-16rem' }}>
        <div className="not-prose" style={{ width: '30.875rem', height: '18.875rem', backgroundColor: '#111827', borderRadius: '50%', filter: 'blur(143px)' }}></div>
      </div>

        {/* Background Image */}
        <div className="not-prose bg-red-400" style={{ position: 'absolute', right: 0, top: 0, width: '24.3125rem', height: '23.5rem' }}>
        <Image
          src="/assets/blog/CTA_box_img.png"
          alt="CTA background"
          fill
          className="not-prose"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
        <div className="not-prose" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000B1A, transparent, transparent)' }}></div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', padding: '4.5rem 0 4.5rem 5rem' }}>
        <div className="flex-1 !max-w-[515px]">
          <h2 style={{ fontSize: '36px', fontFamily: 'var(--font-inter-tight)', fontWeight: 600, color: 'white', lineHeight: 1.25, marginBottom: '2rem', marginTop: '0', letterSpacing: '-0.025em' }}>
            Mr. Le Grants You a 30-Minutes Free Consultation for Legal Advice
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