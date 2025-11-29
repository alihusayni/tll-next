"use client";

import { useState, useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FaqItemProps {
    question: string;
    answer: string;
    defaultOpen?: boolean;
    className?: string;
}

export default function FaqItem({ question, answer, defaultOpen = false, className = "" }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const answerRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useGSAP(() => {
        const buttonRef = contentRef.current?.parentElement;
        const arrowIcon = buttonRef?.querySelector('svg');
        
        if (contentRef.current && answerRef.current) {
            if (isOpen) {
                // Bounce effect for opening
                gsap.fromTo(contentRef.current, 
                    { height: 0 },
                    { 
                        height: answerRef.current.offsetHeight,
                        duration: 0.6,
                        ease: "back.out(1.2)",
                        force3D: true
                    }
                );
                
                // Staggered text reveal
                gsap.fromTo(answerRef.current, 
                    { opacity: 0, y: 20, scale: 0.95 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        duration: 0.4, 
                        delay: 0.2, 
                        ease: "power2.out",
                        force3D: true
                    }
                );
                
                // Elastic arrow rotation
                if (arrowIcon) {
                    gsap.to(arrowIcon, {
                        rotation: 180,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)",
                        force3D: true
                    });
                }
            } else {
                // Smooth closing
                gsap.to(contentRef.current, {
                    height: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                    force3D: true
                });
                
                // Elastic arrow rotation back
                if (arrowIcon) {
                    gsap.to(arrowIcon, {
                        rotation: 0,
                        duration: 0.4,
                        ease: "elastic.out(1, 0.2)",
                        force3D: true
                    });
                }
            }
        }

        // Enhanced hover effects
        if (buttonRef) {
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl.to(buttonRef, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
                force3D: true
            });
            
            buttonRef.addEventListener("mouseenter", () => hoverTl.play());
            buttonRef.addEventListener("mouseleave", () => hoverTl.reverse());
        }
    }, { dependencies: [isOpen] });

    return (
        <button
            className={`bg-white/25 hover:bg-white rounded-lg cursor-pointer lg:rounded-[1rem] p-4 lg:p-8 w-full text-left ${className} ${
                isOpen ? '!bg-white' : ''
            }`}
            onClick={toggleOpen}
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
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
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

