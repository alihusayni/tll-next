"use client";

import FaqItem from '../molecules/faq-item';
import { faqData } from '@/data/faq';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from 'react';

export default function FaqSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            // Stagger animation for FAQ items on mount
            gsap.fromTo(".faq-item",
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
        }
    }, { dependencies: [] });

    return (
        <section ref={sectionRef} className="bg-[#E8EDF2] w-full">
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

                {/* FAQ Items List */}
                <div className="flex flex-col gap-4 mt-8">
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={activeIndex === index}
                            onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="faq-item"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

