import CtaButton from '../atoms/cta-button';
import ProfileStats from '../molecules/profile-stats';
import ProfileImages from '../molecules/profile-images';

export default function AboutSection() {
  return (
    <section className="bg-[#E8EDF2] py-32 px-16 m-0">
      <div className="max-w-[1512px] mx-auto flex flex-col items-center gap-32">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 w-full">
          <div className="flex flex-col gap-32 lg:pr-8">
            <h2 className="font-inter-tight font-semibold text-[52px] leading-[1.1538461538461537] tracking-[-0.02em] text-[#071C32]">
              Immigration Services by Top Immigration Attorney.
            </h2>
            <ProfileStats />
            <p className="font-inter font-normal text-lg leading-[1.2222222222222223] text-[#071C32]">
              A Bay Area native, Tuan Le holds Finance and MIS degrees from San Jose State University.
              <br />
              He has worked as a law clerk, legal assistant, and associate attorney.
            </p>
            <CtaButton text="Get in touch" />
          </div>
          <ProfileImages />
        </div>
      </div>
    </section>
  );
}