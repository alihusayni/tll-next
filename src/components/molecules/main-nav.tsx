'use client';

import { useState, useEffect, useRef } from 'react';
import NavLink from '../atoms/nav-link';

interface NavItem {
  href?: string;
  label: string;
  subItems?: { href: string; label: string }[];
}

interface MainNavProps {
  className?: string;
  onItemClick?: () => void;
  mobileView?: boolean;
  customTextColor?: string;
}

export default function MainNav({ className = '', onItemClick, mobileView = false, customTextColor }: MainNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (identifier: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    const item = navItems.find(item => (item.href || item.label) === identifier);
    if (item?.subItems) {
      setOpenDropdown(identifier);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Small delay to prevent flickering
  };

  const navItems: NavItem[] = [
        { href: '/testimonials', label: 'TESTIMONIALS' },
    { href: '/faq', label: 'FAQ' },
    {
      href: '/resources?category=resources',
      label: 'RESOURCES',
      subItems: [
        { href: '/us-visas', label: 'US Visas' },
        { href: '/us-nonimmigrant-visas', label: 'US Nonimmigrant Visas' },
        { href: '/us-immigrant-visas', label: 'US Immigrant Visas' },
        { href: '/citizenship-naturalization', label: 'Citizenship Naturalization' },
        { href: '/asylum-humanitarian-relief', label: 'Asylum Humanitarian Relief' }
      ]
    }
  ];

  const handleClick = (identifier?: string) => {
    if (!identifier) return;
    const item = navItems.find(item => (item.href || item.label) === identifier);
    if (item?.subItems) {
      // For items with subItems, toggle dropdown but don't close mobile menu
      setOpenDropdown(openDropdown === identifier ? null : identifier);
    } else {
      // Only close mobile menu for items without subItems
      onItemClick?.();
    }
  };

  const handleDropdownItemClick = () => {
    setOpenDropdown(null);
    onItemClick?.();
  };

  if (mobileView) {
    return (
      <nav ref={navRef} className={`${className}`}>
        {navItems.map((item) => (
          <div key={item.href || item.label} className="w-full">
            {/* Main menu item */}
            <div className="py-4 px-4">
               <NavLink
                 href={item.subItems ? undefined : item.href}
                 hasDropdown={false} // Disable default dropdown arrow in mobile view
            isActive={openDropdown === (item.href || item.label)}
                onClick={item.subItems ? () => handleClick(item.href || item.label) : undefined}
                 className={`${mobileView ? 'text-white hover:text-[#FF7031]' : (customTextColor || 'text-white')} text-[1.875rem] font-inter-tight font-semibold leading-[1.625rem] uppercase ${item.subItems ? 'cursor-pointer flex items-center justify-between gap-4' : ''}`}
                customTextColor={mobileView ? undefined : customTextColor}
                showUnderline={false}
              >
                {item.label}
                {item.subItems && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transition-transform duration-200 ${openDropdown === item.href ? 'rotate-180' : ''}`}
                  >
                     <path
                       d="M6 9L12 15L18 9"
                       stroke={openDropdown === item.href ? "#FF7031" : "#D2D5D9"}
                       strokeWidth="1.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     />
                  </svg>
                )}
              </NavLink>
            </div>
            
            {/* Submenu items */}
            {item.subItems && openDropdown === item.href && (
              <div className="rounded-lg mx-4 mb-4 p-8">
                {item.subItems.map((subItem) => (
                    <NavLink
                       key={subItem.href}
                       href={subItem.href}
                       className="block text-[#D2D5D9] font-inter font-normal leading-5 mb-6 last:mb-0 hover:text-[#FF7031] active:text-[#FF7031] transition-colors text-base md:text-2xl"
                       onClick={handleDropdownItemClick}
                       showUnderline={false}
                       textSize="base"
                     >
                    {subItem.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav ref={navRef} className={`flex items-center gap-10 ${className}`}>
      {navItems.map((item) => {
        const identifier = item.href || item.label;
        return (
          <div 
            key={identifier} 
            className="relative"
            onMouseEnter={() => handleMouseEnter(identifier)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              href={item.href}
              hasDropdown={!!item.subItems}
              isActive={openDropdown === identifier}
              onClick={item.subItems ? () => handleClick(identifier) : undefined}
              className={`${customTextColor || ''} ${item.subItems ? 'cursor-pointer' : ''}`}
              customTextColor={customTextColor}
            >
              {item.label}
            </NavLink>
            {item.subItems && openDropdown === identifier && (
              <div 
                className="absolute flex flex-col mt-3 bg-white rounded-lg shadow-lg border border-gray-200 gap-4 p-8 min-w-[15.625rem] z-50"
                onMouseEnter={() => handleMouseEnter(identifier)}
                onMouseLeave={handleMouseLeave}
              >
                {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.href}
                      href={subItem.href}
                      className="block !text-[#49535D] hover:!text-[#FF7031] transition-colors"
                      onClick={handleDropdownItemClick}
                      customTextColor={customTextColor}
                      showUnderline={false}
                      textSize="base"
                    >
                    {subItem.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}