import CtaButton from '../atoms/cta-button';
import ProfileStats from '../molecules/profile-stats';
import ProfileImages from '../molecules/profile-images';

export default function AboutSection() {
    return (
        <section id="about" className="bg-[#E8EDF2] py-32 px-16 m-0 scroll-mt-24 overflow-x-clip">
            <div className="max-w-[90rem] mx-auto flex flex-col items-center gap-32">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 w-full">
                    <div className="flex flex-col gap-25">
                        <h2 className="font-inter-tight font-semibold text-[52px] lg:max-w-[40rem] leading-[60px] tracking-[-0.02em] text-[#071C32]">
                            Immigration Services by Top Immigration Attorney.
                        </h2>
                        <div className="flex flex-col gap-8 lg:pr-8 max-w-[27.5rem]">
                            <ProfileStats/>
                            <p className="font-inter font-normal text-lg leading-[22px] text-[#071C32] ">
                                A Bay Area native, Tuan Le holds Finance and MIS degrees from San Jose State University.
                                <br/>
                                He has worked as a law clerk, legal assistant, and associate attorney.
                            </p>
                            <CtaButton text="Get in touch"/>
                        </div>
                    </div>
                    <ProfileImages/>
                </div>
            </div>
        </section>
    );
}