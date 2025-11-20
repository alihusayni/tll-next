import { useState, useEffect, useRef } from 'react';
import NavLink from '../atoms/nav-link';

interface MainNavProps {
  className?: string;
  onItemClick?: () => void;
  mobileView?: boolean;
}

export default function MainNav({ className = '', onItemClick, mobileView = false }: MainNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
        { href: '/testimonials', label: 'TESTIMONIALS' },
    { href: '/faq', label: 'FAQ' },
    {
      href: '/resources',
      label: 'RESOURCE',
      subItems: [
        { href: '/us-visas', label: 'US Visas' },
        { href: '/us-nonimmigrant-visas', label: 'US Nonimmigrant Visas' },
        { href: '/us-immigrant-visas', label: 'US Immigrant Visas' },
        { href: '/deportation-defense', label: 'Criminal Immigration' },
        { href: '/citizenship-naturalization', label: 'Citizenship Naturalization' },
        { href: '/asylum-humanitarian-relief', label: 'Asylum Humanitarian Relief' }
      ]
    }
  ];

  const handleClick = (href: string) => {
    if (navItems.find(item => item.href === href)?.subItems) {
      setOpenDropdown(openDropdown === href ? null : href);
    } else {
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
          <div key={item.href} className="w-full">
            {/* Main menu item */}
            <div className="py-4 px-4">
              <NavLink
                href={item.subItems ? undefined : item.href}
                hasDropdown={false} // Disable default dropdown arrow in mobile view
                isActive={openDropdown === item.href}
                onClick={item.subItems ? () => handleClick(item.href) : undefined}
                className={`text-white text-[30px] font-inter-tight font-semibold leading-[26px] uppercase ${item.subItems ? 'cursor-pointer flex items-center justify-between gap-4' : ''}`}
              >
                {item.label}
                {item.subItems && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${openDropdown === item.href ? 'rotate-180' : ''}`}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#D2D5D9"
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
                    className="block text-[#D2D5D9] text-base font-inter font-normal leading-5 mb-6 last:mb-0 active:text-[#FF7031] transition-colors"
                    onClick={handleDropdownItemClick}
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
      {navItems.map((item) => (
        <div key={item.href} className="relative">
          <NavLink
            href={item.subItems ? undefined : item.href}
            hasDropdown={!!item.subItems}
            isActive={openDropdown === item.href}
            onClick={item.subItems ? () => handleClick(item.href) : undefined}
            className={item.subItems ? 'cursor-pointer' : ''}
          >
            {item.label}
          </NavLink>
          {item.subItems && openDropdown === item.href && (
            <div className="absolute flex flex-col mt-3 bg-white rounded-lg shadow-lg border border-gray-200 gap-4 p-8 min-w-[15.625rem] z-50">
              {item.subItems.map((subItem) => (
                <NavLink
                  key={subItem.href}
                  href={subItem.href}
                  className="block text-base leading-6 !text-[#49535D] hover:!text-[#FF7031] transition-colors"
                  onClick={handleDropdownItemClick}
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