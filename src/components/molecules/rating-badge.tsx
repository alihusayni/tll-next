"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function RatingBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const badge = badgeRef.current;
    const overlay = overlayRef.current;

    if (!badge || !overlay) return;

    // Create overlay for color wipe effect
    gsap.set(overlay, {
      width: "0%",
      backgroundColor: "#E55B1E"
    });

    let enterAnimation: gsap.core.Tween | null = null;
    let leaveAnimation: gsap.core.Tween | null = null;

    // Handle mouse enter
    const handleMouseEnter = () => {
      if (leaveAnimation) leaveAnimation.kill();
      enterAnimation = gsap.to(overlay, {
        width: "100%",
        duration: 0.4,
        ease: "power2.out"
      });
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      if (enterAnimation) enterAnimation.kill();
      leaveAnimation = gsap.to(overlay, {
        width: "0%",
        duration: 0.3,
        ease: "power2.in"
      });
    };

    badge.addEventListener("mouseenter", handleMouseEnter);
    badge.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (enterAnimation) enterAnimation.kill();
      if (leaveAnimation) leaveAnimation.kill();
      badge.removeEventListener("mouseenter", handleMouseEnter);
      badge.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={badgeRef} className="relative bg-[#000B1A] flex items-center gap-4 p-1.5 rounded-full cursor-pointer group overflow-hidden">
      {/* Color overlay for left-to-right animation */}
      <div ref={overlayRef} className="absolute inset-0 z-0" />
      {/* Star Container */}
      <div className="bg-[#E55B1E] flex items-center justify-center p-3.5 rounded-full relative z-10">
        {/* Stars SVG - exact from Figma */}
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-75 group-active:rotate-75">
              <path d="M8.38488 0.690983C8.68423 -0.230328 9.98764 -0.230329 10.287 0.690982L11.8056 5.36474C11.9395 5.77677 12.3234 6.05573 12.7566 6.05573H17.6709C18.6397 6.05573 19.0424 7.29534 18.2587 7.86474L14.283 10.7533C13.9325 11.0079 13.7858 11.4593 13.9197 11.8713L15.4383 16.5451C15.7377 17.4664 14.6832 18.2325 13.8995 17.6631L9.92372 14.7746C9.57324 14.5199 9.09864 14.5199 8.74815 14.7746L4.77241 17.6631C3.9887 18.2325 2.93422 17.4664 3.23357 16.5451L4.75217 11.8713C4.88604 11.4593 4.73938 11.0079 4.3889 10.7533L0.413159 7.86474C-0.370555 7.29534 0.0322201 6.05573 1.00094 6.05573H5.91523C6.34845 6.05573 6.73241 5.77677 6.86628 5.36474L8.38488 0.690983Z" fill="#E1E6EB"/>
          </svg>
      </div>
      
      {/* Text and Arrow Container */}
      <div className="flex items-center gap-2 pr-2.5 relative z-10">
        <p className="font-inter font-medium text-base leading-6 text-white/95 text-center whitespace-nowrap">
          Rated 5/5 by over 70 clients
        </p>
        
        {/* Arrow Icons - Diagonal on default, horizontal on hover */}
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 relative overflow-visible">
          {/* Default: Arrow Right Up */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute inset-0 transition-all duration-300 ease-in-out opacity-100 group-hover:opacity-0 group-hover:rotate-12 group-hover:scale-75 group-active:opacity-0 group-active:rotate-12 group-active:scale-75">
            <path d="M6 18L18 6M18 6H9M18 6V15" stroke="#BBBCBF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Hover: Arrow Right */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute inset-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-active:opacity-100 -rotate-12 group-hover:rotate-0 group-active:rotate-0 scale-75 group-hover:scale-100 group-active:scale-100">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

