"use client";

import { useRef } from 'react';

// No GSAP needed — open/close accordion uses the CSS grid-template-rows trick:
//   grid-template-rows: 0fr → 1fr  (transition smoothly animates to natural height)
// Arrow rotation uses CSS transform transition.
// Removing gsap + @gsap/react saves ~90 KiB from this component's bundle.

interface FaqItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

export default function FaqItem({ question, answer, isOpen, onToggle, className = "" }: FaqItemProps) {
    const contentRef = useRef<HTMLDivElement>(null);

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

                {/* Arrow Icon — rotates via CSS transition */}
                <div
                    className="flex-shrink-0 transition-transform duration-300 ease-out"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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

            {/*
              Answer Section — CSS grid-template-rows trick:
              grid-template-rows: 0fr collapses the inner div to 0 height (overflow: hidden clips it).
              grid-template-rows: 1fr expands to the natural height.
              This is the only reliable CSS-only way to animate height: 0 → auto.
            */}
            <div
                ref={contentRef}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="mt-8 lg:mt-8 md:mt-8">
                        <div
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
            </div>
        </button>
    );
}
