"use client";

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Logo from '../atoms/logo';
import MainNav from '../molecules/main-nav';


interface StickyHeaderProps {
    className?: string;
}

export default function StickyHeader({className = ''}: StickyHeaderProps) {
    const [show, setShow] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleNavScroll = () => {
            setIsNavigating(true);
            setTimeout(() => setIsNavigating(false), 3000); // Disable hide for 3 seconds
        };
        window.addEventListener('navScroll', handleNavScroll);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current + 10) {
                // Scrolling down
                setShow(true);
            } else if (currentScrollY < lastScrollY.current - 10 && !isNavigating) {
                // Scrolling up, but not if navigating
                setShow(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('navScroll', handleNavScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isNavigating]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-[#091C32] shadow-md transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}>
            <div className="w-full max-w-[95rem] mx-auto">
                <div className="flex justify-between items-center py-8 px-4 md:px-8 lg:px-16">
                    <Link href="/"><Logo variant="White"/></Link>
                    <div className="flex items-center gap-16">
                        <MainNav className="hidden lg:flex"/>
                        <a href="tel:(714) 877 5840"
                           className="inline-flex items-center justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 border-white text-white hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white px-6 py-4 text-base h-12 hidden md:flex whitespace-nowrap active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
                            </svg>
                            Talk to Us
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}