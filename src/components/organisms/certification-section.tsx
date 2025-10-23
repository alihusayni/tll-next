import Image from 'next/image';
import LinkButton from '../atoms/link-button';
import CertificationBadge from '../molecules/certification-badge';

export default function CertificationSection() {
  return (
    <section className="bg-[#00356E] py-16 px-4 md:py-24 md:px-8 lg:py-32 lg:px-16 m-0">
      <div className="max-w-[82rem] mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-[62px] max-w-[38.5rem] lg:max-w-[78.5rem] text-[#9199B9] text-center font-inter font-semibold leading-[1.16] mb-32 mx-auto">
          Your Chances Are <span className="text-white" >Stronger</span> Than You Think &mdash; <span className="text-white">Protection</span> and <span className="text-white">Guidance</span> through Complexity
        </h2>
        <div className="flex flex-col lg:flex-row gap-16 max-w-[95rem] lg:items-center">
          <div className="flex-1">
            <p className="text-2xl lg:text-[32px] text-white lg:max-w-[25.5rem] max-w-[23rem] font-inter font-medium leading-7 lg:leading-[38px] mb-8">
              Let&apos;s Build Your Case Together. Rest Assured That Your Case Is in The Right Hands.
            </p>
            <LinkButton text="Read More" href="/immigration-solutions/how-to-prepare-strong-immigration-application-tips" />
          </div>
          <div className="flex flex-col sm:flex-row gap-16 flex-1/6">
            <div className="flex-1">
              <Image
                src="/assets/certifications/certification-image.png"
                alt=""
                width={400}
                height={100}
                loading="lazy"
                className="w-full h-[100px] rounded-lg object-cover object-[30%_20%] grayscale-100"
              />
                <p className="text-lg text-white font-inter leading-[1.22] mt-8">
                You are not alone; we have helped many in your exact situation and will continue to do so. Place your confidence in our comprehensive solutions, and we will protect you.
              </p>
            </div>
            <div className="flex-1">
              <CertificationBadge />
              <p className="text-lg text-white font-inter leading-[1.33] mt-8">
                Licensed in California and multiple federal courts, Mr. Le has been bringing expertise and personal attention to every immigration case, throughout the United States, since 2010.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}