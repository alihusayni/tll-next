"use client";

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import Logo from '../atoms/logo';
import MainNav from '../molecules/main-nav';
import HamburgerMenu from '../atoms/hamburger-menu';
import { createPortal } from 'react-dom';


interface StickyHeaderProps {
    className?: string;
}

export default function StickyHeader({className = ''}: StickyHeaderProps) {
    const [show, setShow] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isMobileMenuOpen]);

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
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-[#091C32] shadow-md transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}>
                <div className="w-full max-w-[86.5rem] mx-auto">
                    <div className="flex justify-between items-center py-8 px-4 md:px-8 lg:px-16 xl:px-0">
                        <Link href="/"><Logo variant="White"/></Link>
                        <div className="flex items-center gap-16">
                            <MainNav className="hidden lg:flex"/>
                             <a href="tel:(714) 877 5840"
                                className="items-center justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 border-white text-white hover:bg-[#E55B1E] hover:border-[#E55B1E] hover:text-white active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white px-6 py-4 text-base h-12 hidden lg:flex whitespace-nowrap">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
                                </svg>
                                Talk to Us
                            </a>

                            {/* Mobile Hamburger Menu */}
                            <div className="lg:hidden">
                                <HamburgerMenu 
                                    isOpen={isMobileMenuOpen} 
                                    onClick={toggleMobileMenu}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Rendered at document root */}
            {isMobileMenuOpen && createPortal(
                <div className="lg:hidden mobile-menu-overlay" style={{ backgroundColor: '#00356E' }}>
                    <div className="flex flex-col h-full py-8 min-h-screen">
                        {/* Header with Logo and Close Button */}
                        <div className="flex justify-between items-center px-4 mb-16">
                            <Link href="/"><Logo variant="White" /></Link>
                            <button
                                onClick={toggleMobileMenu}
                                className="w-8 h-8 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                                aria-label="Close menu"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="flex-1 px-4">
                            <MainNav 
                                className="flex flex-col gap-2"
                                onItemClick={toggleMobileMenu}
                                mobileView={true}
                            />
                        </div>
                        
                        {/* Buttons at Bottom */}
                        <div className="flex flex-col gap-4 px-4 mt-8">
                            <a 
                                href="tel:(714) 877 5840" 
                                className="flex justify-center items-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md border-2 border-white text-white hover:bg-white hover:text-[#00356E] active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white px-8 py-6 text-lg whitespace-nowrap self-stretch"
                                style={{
                                    display: 'flex',
                                    height: '52px',
                                    padding: '24px 32px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '16px',
                                    alignSelf: 'stretch'
                                }}
                                onClick={toggleMobileMenu}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                                </svg>
                                Talk to Us
                            </a>
                            
                            <a 
                                href="#contact" 
                                className="flex justify-center items-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-[#E55B1E] text-white hover:bg-[#FF7031] active:bg-[#FF7031] px-8 py-6 text-lg whitespace-nowrap self-stretch"
                                style={{
                                    display: 'flex',
                                    height: '52px',
                                    padding: '24px 32px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '16px',
                                    alignSelf: 'stretch'
                                }}
                                onClick={toggleMobileMenu}
                            >
                                30 M free consulting
                            </a>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}