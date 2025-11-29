import type {Testimonial} from '@/data/testimonials';
import Image from 'next/image';

interface TestimonialCardFullProps {
    testimonial: Testimonial;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function TestimonialCardFull({testimonial, onMouseEnter, onMouseLeave}: TestimonialCardFullProps) {
    return (
        <div
            className="bg-[#000b1a] hover:bg-[#00356e] active:bg-[#00356e] rounded-[1.5rem] p-8 flex flex-col gap-8 min-w-[25rem] max-w-[28.75rem] w-[25rem] sm:w-[28.75rem] flex-shrink-0 transition-all duration-500 ease-in-out cursor-grab group"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Stars - 5 stars in a row (Solar Icons) */}
            <div className="relative h-5 w-32 flex-shrink-0 flex gap-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="21" viewBox="0 0 120 21" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1734 7.66753L9.52153 0.968213L6.86965 7.66753L0 8.25086L5.22574 12.9716L3.62982 20.0318L9.50952 16.2491L15.3892 20.0318L13.7933 12.9716L19.019 8.25086L12.1494 7.66753H12.1674H12.1734ZM36.3402 7.60138L33.6223 0.733678L30.9045 7.60138L23.8668 8.19674L29.2245 13.0378L27.5926 20.2784L33.6163 16.4055L39.64 20.2784L38.0081 13.0378L43.3658 8.19674L36.3282 7.60138H36.3402ZM61.1009 7.52921L58.3231 0.493127L55.5452 7.52921L48.3456 8.14261L53.8353 13.1039L52.1674 20.5189L58.3411 16.5498L64.5148 20.5189L62.8349 13.1039L68.3246 8.14261L61.1249 7.52921H61.1129H61.1009ZM86.4617 7.45705L83.6178 0.258591L80.774 7.45705L73.3943 8.08849L79.01 13.1701L77.2941 20.7595L83.6178 16.7002L89.9415 20.7595L88.2256 13.1701L93.8413 8.08849L86.4617 7.45705ZM120 8.02234L112.434 7.37886L109.513 0L106.591 7.37886L99.037 8.02234L104.791 13.2242L103.039 21L109.507 16.8385L115.974 21L114.222 13.2242L119.976 8.02234H119.988H120Z" fill="#FFAD31"/>
                </svg>
            </div>

            {/* Testimonial Text */}
            <p className="font-inter font-normal text-lg leading-7 text-white line-clamp-10">
                {testimonial.quote}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-4">
                    {testimonial.avatar !== "/" && (
                        <div className="relative w-16 h-16 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-0">
                        <p className="font-inter font-normal text-lg leading-7 text-white">
                            {testimonial.author}
                        </p>
                        <p className="font-inter font-normal text-base leading-6 text-[#d2d5d9]">
                            {testimonial.caseType}
                        </p>
                    </div>
                </div>

                {/* Arrow Icon - Solar Icons - Smooth morphing transformation */}
                <div
                    className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0 relative overflow-visible">
                    {/* Default: Arrow Right Up (Solar Icon Linear) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 sm:w-5 sm:h-5 absolute inset-0 transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:rotate-[135deg] group-active:opacity-0 group-active:rotate-[135deg]">
                        <path d="M6 18L18 6M18 6H10M18 6V14" stroke="#969799" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-all duration-700 ease-in-out"/>
                    </svg>
                    {/* Hover: Arrow Right (Solar Icon Linear) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 sm:w-5 sm:h-5 absolute inset-0 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-active:opacity-100 -rotate-[135deg] group-hover:rotate-0 group-active:rotate-0">
                        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transition-all duration-700 ease-in-out"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

