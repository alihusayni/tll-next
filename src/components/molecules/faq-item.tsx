"use client";

import { useState } from 'react';

interface FaqItemProps {
    question: string;
    answer: string;
    defaultOpen?: boolean;
}

export default function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button
            className="bg-white hover:bg-white/25 rounded-lg lg:rounded-[1rem] p-4 lg:p-8 w-full text-left transition-all duration-200"
            onClick={toggleOpen}
            aria-expanded={isOpen}
        >
            {/* Question/Title Section */}
            <div className="flex items-center justify-between gap-2 w-full">
                <h3 
                    className={`flex-1 text-base sm:text-[1.375rem] leading-[1.688rem] sm:leading-[2rem] text-[#071C32] font-inter-tight ${
                        isOpen ? 'font-semibold' : 'font-normal'
                    }`}
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
                        className={`transform transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
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
            {isOpen && (
                <div className="mt-8 lg:mt-8 md:mt-8">
                    <div className="text-sm sm:text-lg leading-[1.25rem] sm:leading-[1.688rem] text-[#071C32] font-inter font-medium whitespace-pre-wrap">
                        {answer.split('\n\n').map((paragraph, index) => (
                            <p key={index} className={index > 0 ? 'mt-4' : ''}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </button>
    );
}

