import { useState, useEffect, useRef } from 'react';
import NavLink from '../atoms/nav-link';

interface MainNavProps {
  className?: string;
}

export default function MainNav({ className = '' }: MainNavProps) {
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
    }
  };

  const handleDropdownItemClick = () => {
    setOpenDropdown(null);
  };

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