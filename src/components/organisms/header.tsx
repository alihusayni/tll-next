"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';

import Logo from '../atoms/logo';
import MainNav from '../molecules/main-nav';
import HamburgerMenu from '../atoms/hamburger-menu';

interface HeaderProps {
  variant?: 'transparent' | 'sticky' | 'light';
  className?: string;
  maxWidth?: boolean;
  showMobileMenu?: boolean;
}

export default function Header({
  variant = 'transparent',
  className = '',
  maxWidth = true,
  showMobileMenu = true
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // closing
      tl.current?.reverse();
    } else {
      // opening
      setIsMobileMenuOpen(true);
      setIsMenuVisible(true);
      if (!tl.current) {
        tl.current = gsap.timeline({ paused: true });
        gsap.set(mobileMenuRef.current, { height: 0 });
        tl.current.to(mobileMenuRef.current, {
          height: '100vh',
          duration: 0.6,
          ease: 'expo.out',
        });
        const header = gsap.utils.toArray('.mobile-menu-overlay .flex.justify-between.items-center');
        tl.current.fromTo(header,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          '-=0.4'
        );
        const menuItems = gsap.utils.toArray('.mobile-menu-overlay nav > div');
        const buttons = gsap.utils.toArray('.mobile-menu-overlay .flex.flex-col.gap-4 > a');
        tl.current.fromTo([...menuItems, ...buttons],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
          '-=0.3'
        );
        tl.current.eventCallback('onReverseComplete', () => {
          setIsMobileMenuOpen(false);
          setIsMenuVisible(false);
        });
      }
      tl.current.play();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && mounted) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen, mounted]);



  // Sticky header scroll behavior
  useEffect(() => {
    if (variant !== 'sticky') return;

    const handleNavScroll = () => {
      setIsNavigating(true);
      setTimeout(() => setIsNavigating(false), 3000);
    };
    window.addEventListener('navScroll', handleNavScroll);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setShow(false);
      } else {
        if (currentScrollY > lastScrollY.current + 10) {
          setShow(false);
        } else if (currentScrollY < lastScrollY.current - 10 && !isNavigating) {
          setShow(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('navScroll', handleNavScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant, isNavigating]);

  const headerClasses = variant === 'sticky' 
    ? `fixed top-0 left-0 right-0 z-50 bg-[#091C32] shadow-md transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
    : variant === 'light'
    ? `relative z-40 bg-[#E8EDF2] w-full`
    : `bg-transparent`;



  const LogoComponent = variant === 'light'
    ? <Link href="/"><Logo variant="Blue"/></Link>
    : <Link href="/"><Logo variant="White"/></Link>;

  return (
    <>
      <header className={`${headerClasses} ${className}`}>
        <div className='w-full max-w-[86.5rem] mx-auto'>
          <div className={`flex justify-between items-center pt-8 pb-6 px-4 sm:px-8 lg:px-16 2xl:px-0 ${variant === 'sticky' && !maxWidth ? 'px-4 sm:px-8 lg:px-16 2xl:px-0' : ''}`}>
            {LogoComponent}
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-16">
              <MainNav className="flex" customTextColor={variant === 'light' ? 'text-[#030E1A]' : undefined} />
              <a 
                href="tel:(714) 877 5840" 
                className={`group inline-flex items-center justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 px-6 py-4 text-base h-12 whitespace-nowrap ${
                  variant === 'light' 
                    ? 'border-[#49535D] text-[#071C32] hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white'
                    : 'border-white text-white hover:bg-[#E55B1E] hover:border-[#E55B1E] hover:text-white active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white'
                }`}
              >
                <Icon 
                  icon="solar:phone-linear" 
                  width="24"
                  height="24"
                  className={`w-6 h-6 ${variant === 'light' ? 'text-[#071C32] group-hover:text-white' : 'filter brightness-0 invert'}`}
                />
                Talk to Us
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            {showMobileMenu !== false && (
              <div className="lg:hidden">
                <HamburgerMenu 
                  isOpen={isMobileMenuOpen} 
                  onClick={toggleMobileMenu}
                  color={variant === 'light' ? 'bg-[#030E1A]' : 'bg-white'}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Rendered at document root */}
      {mounted && createPortal(
        <div ref={mobileMenuRef} className={`lg:hidden mobile-menu-overlay fixed inset-0 z-50 ${isMenuVisible ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgb(0, 53, 110)' }}>
          <div className="flex flex-col h-full py-8 min-h-screen">
            {/* Header with Logo and Close Button */}
            <div className="flex justify-between items-center px-4 sm:px-8 mb-16">
              <Link href="/"><Logo variant="White" /></Link>
              <button
                onClick={toggleMobileMenu}
                className="w-8 h-8 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 px-0 sm:px-4">
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
                className="group flex justify-center items-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md border-2 border-white text-white hover:bg-white hover:text-[#00356E] active:bg-[#E55B1E] active:border-[#E55B1E] active:text-white py-3 text-lg whitespace-nowrap self-stretch"
                onClick={toggleMobileMenu}
              >
                Talk to Us
              </a>
              
              <a 
                href="#contact" 
                className="flex justify-center items-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-[#E55B1E] text-white hover:bg-[#FF7031] active:bg-[#FF7031] py-3 text-lg whitespace-nowrap self-stretch"
                onClick={toggleMobileMenu}
              >
                30 min free consulting
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}