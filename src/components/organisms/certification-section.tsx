import Image from 'next/image';
import LinkButton from '../atoms/link-button';
import CertificationBadge from '../molecules/certification-badge';

export default function CertificationSection() {
  return (
    <section className="bg-[#00356E] py-16 px-4 md:py-24 sm:px-8 lg:py-32 lg:px-16 2xl:px-0 m-0">
      <div className="max-w-[86.5rem] mx-auto">
        <h2 className="font-inter-tight text-[2.5rem] lg:text-[3.875rem] leading-[3.25rem] sm:leading-[4.5rem] max-w-[23.5rem] sm:max-w-[38.5rem] lg:max-w-[78.5rem] text-[#9199B9] text-center font-semibold mb-32 mx-auto">
          Your Chances Are <span className="text-white" >Stronger</span> Than You Think &mdash; <span className="text-white">Protection</span> and <span className="text-white">Guidance</span> through Complexity
        </h2>
        <div className="flex flex-col xl:flex-row gap-16 max-w-[95rem] xl:items-center">
          <div className="flex-1">
            <p className="text-[1.5rem] lg:text-[2rem] text-white lg:max-w-[24.5rem] max-w-[25rem] font-inter font-medium leading-7 lg:leading-9 mb-8">
              Let&apos;s Build Your Case Together. Rest Assured That Your Case Is in The Right Hands.
            </p>
            <LinkButton text="How to Prepare a Strong Immigration Application" href="/resources/how-to-prepare-strong-immigration-application-tips" />
          </div>
          <div className="flex flex-col sm:flex-row gap-16 flex-1/6">
            <div className="flex-1 lg:min-w-[23.615rem]">
              <Image
                src="https://tuanlelaw.s3.amazonaws.com/assets/certifications/certification-image.png"
                alt="Image of legal certification or professional award"
                width={400}
                height={100}
                loading="lazy"
                className="w-full h-[6.25rem] rounded-lg object-cover object-[30%_20%]  grayscale contrast-110 brightness-110"
              />
                <p className="text-lg text-white font-inter leading-[1.75rem] mt-8">
                You are not alone; we have helped many in your exact situation and will continue to do so. Place your confidence in our comprehensive solutions, and we will protect you.
              </p>
            </div>
            <div className="flex-1 lg:min-w-[23.615rem]">
              <CertificationBadge />
              <p className="text-lg text-white font-inter leading-[1.75rem] mt-8">
                Licensed in California and multiple federal courts, Mr. Le has been bringing expertise and personal attention to every immigration case, throughout the United States, since 2010.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}