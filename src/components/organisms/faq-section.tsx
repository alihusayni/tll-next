"use client";

import FaqItem from '../molecules/faq-item';
import { faqData } from '@/data/faq';
import { useState } from 'react';

// No GSAP needed — the mount stagger is done with a CSS @keyframes animation
// using --faq-i custom property to offset each item's animation-delay.
// Removing gsap + @gsap/react saves ~90 KiB from this component's bundle.

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="bg-[#E8EDF2] w-full">
            <div className="max-w-[86.5rem] mx-auto px-4 lg:px-16 2xl:px-0 py-8 lg:pb-16">
                {/* Hero/Header Section */}
                <div className="flex flex-col gap-8 py-8">
                    <h1 className="text-[3.25rem] leading-[3.25rem] lg:text-[5.75rem] lg:leading-[4.5rem] tracking-[-0.065rem] lg:tracking-[-0.115rem] font-inter-tight font-semibold text-[#071C32] max-w-[61rem]">
                        Ask a Lawyer
                    </h1>
                    <p className="text-[1.25rem] leading-[1.75rem] lg:text-[1.5rem] font-inter-tight font-medium text-[#49535D]">
                        Common questions about our services and the U.S. immigration process.
                    </p>
                </div>

                {/* FAQ Items List — stagger fade-in via CSS animation-delay */}
                <div className="flex flex-col gap-4 mt-8">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item"
                            style={{
                                // Stagger each item's fade-in: 0.1s * index offset
                                // @keyframes faq-fade-in is defined in globals.css
                                animation: 'faq-fade-in 0.6s ease-out both',
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            <FaqItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={activeIndex === index}
                                onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="faq-item"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
