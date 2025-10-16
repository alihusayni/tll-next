import Image from 'next/image';
import UiButton from '../atoms/ui-button';

export default function CtaBox() {
  return (
    <div className="relative bg-[#000B1A] rounded-2xl overflow-hidden w-full max-w-[914px] mx-auto">
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[494px] h-[302px] bg-[rgba(255,249,241,0.1)] rounded-full blur-[143px]"></div>
      </div>

      {/* Background Image */}
      <div className="absolute right-0 top-0 w-[500px] h-[383px]">
        <Image
          src="/assets/blog/CTA_box_img.png"
          alt="CTA background"
          fill
          className="object-cover"
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
          <UiButton variant="primary" size="lg">
            Schedule now
          </UiButton>
        </div>
      </div>
    </div>
  );
}