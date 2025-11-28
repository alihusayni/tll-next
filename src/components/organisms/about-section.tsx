"use client";

import CtaButton from '../atoms/cta-button';
import ProfileStats from '../molecules/profile-stats';
import ProfileImages from '../molecules/profile-images';

export default function AboutSection() {
    return (
        <section id="about" className="bg-[#E8EDF2] py-16 sm:py-32 px-4 sm:px-8 md:px-16 2xl:px-0 m-0 scroll-mt-24 overflow-x-clip">
            <div className="max-w-[86.5rem] mx-auto flex flex-col items-center gap-32">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 w-full">
                    <div className="flex flex-col gap-15 sm:gap-25">
                        <h2 className="font-inter-tight font-semibold text-[2.125rem] lg:text-[3.25rem] max-w-[22.5rem] sm:max-w-[57.5rem] lg:max-w-[37.5rem] leading-[2.625rem] lg:leading-[3.75rem] tracking-[-0.02em] text-[#071C32]">
                            Immigration Services by Top Immigration Attorney.
                        </h2>
                        <div className="flex flex-col gap-8 max-w-[22.5rem] sm:max-w-[27.5rem]">
                            <ProfileStats/>
                            <p className="font-inter font-normal text-lg leading-[1.75rem] text-[#071C32]">
                                A Bay Area native, Tuan Le holds Finance and MIS degrees from San Jose State University.
                                <br/>
                                He has worked as a law clerk, legal assistant, and associate attorney.
                            </p>
                             <CtaButton text="Get in touch" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}/>
                        </div>
                    </div>
                    <ProfileImages/>
                </div>
            </div>
        </section>
    );
}