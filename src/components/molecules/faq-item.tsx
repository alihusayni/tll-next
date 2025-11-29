"use client";

import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

export default function FaqItem({ question, answer, isOpen, onToggle, className = "" }: FaqItemProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const answerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const buttonRef = contentRef.current?.parentElement;
        const arrowIcon = buttonRef?.querySelector('svg');

        if (contentRef.current && answerRef.current) {
            if (isOpen) {
                // Open: fade and slide
                gsap.set(contentRef.current, { height: 'auto', opacity: 0 });
                const fullHeight = contentRef.current.scrollHeight;
                gsap.fromTo(contentRef.current,
                    { height: 0, opacity: 0 },
                    {
                        height: fullHeight,
                        opacity: 1,
                        duration: 0.35,
                        ease: "power2.out",
                        force3D: true
                    }
                );

                // Simple arrow rotation
                if (arrowIcon) {
                    gsap.to(arrowIcon, {
                        rotation: 180,
                        duration: 0.3,
                        ease: "power2.out",
                        force3D: true
                    });
                }
            } else {
                // Close: fade out and collapse
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    force3D: true
                });

                // Simple arrow rotation back
                if (arrowIcon) {
                    gsap.to(arrowIcon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out",
                        force3D: true
                    });
                }
            }
        }
    }, { dependencies: [isOpen] });

    return (
        <button
            className={`bg-white/25 hover:bg-white rounded-lg cursor-pointer lg:rounded-[1rem] p-4 lg:p-8 w-full text-left ${className} ${
                isOpen ? '!bg-white' : ''
            }`}
            onClick={onToggle}
            aria-expanded={isOpen}
        >
            {/* Question/Title Section */}
            <div className="flex items-center justify-between gap-2 w-full">
                <h3 
                    className={`flex-1 font-normal text-base sm:text-[1.375rem] leading-[1.688rem] sm:leading-[2rem] text-[#071C32] font-inter-tight`}
                >
                    {question}
                </h3>
                
                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform"
                    >
                        <path
                            d="M19 9L12 16L5 9"
                            stroke="#49535D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {/* Answer Section - Expandable */}
            <div 
                ref={contentRef}
                className={`overflow-hidden ${isOpen ? 'h-auto' : 'h-0'}`}
            >
                <div className="mt-8 lg:mt-8 md:mt-8">
                    <div 
                        ref={answerRef}
                        className="text-sm sm:text-lg leading-[1.25rem] sm:leading-[1.688rem] text-[#49535D] font-inter font-medium whitespace-pre-wrap"
                    >
                        {answer.split('\n\n').map((paragraph, index) => (
                            <p key={index} className={index > 0 ? 'mt-4' : ''}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </button>
    );
}

