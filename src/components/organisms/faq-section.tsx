"use client";

import FaqItem from '../molecules/faq-item';
import { faqData } from '@/data/faq';

export default function FaqSection() {
    return (
        <section className="bg-[#E8EDF2] w-full">
            <div className="max-w-[86.5rem] mx-auto px-4 md:px-4 lg:px-16 xl:px-0 py-8 lg:pb-16">
                {/* Hero/Header Section */}
                <div className="flex flex-col gap-8 py-8">
                    <h1 className="text-[92px] leading-[72px] font-inter-tight font-semibold text-[#071C32] max-w-[496px] tracking-[-1.84px]">
                        FAQ's
                    </h1>
                    <p className="text-2xl leading-7 font-inter-tight font-medium text-[#747D85]">
                        Common questions about our services and the U.S. immigration process.
                    </p>
                </div>

                {/* FAQ Items List */}
                <div className="flex flex-col gap-8 mt-8">
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

