"use client";

 import { useState } from 'react';
import Logo from '../atoms/logo';
import MainNav from '../molecules/main-nav';
import UiButton from '../atoms/ui-button';

interface SiteHeaderProps {
  className?: string;
}

export default function SiteHeader({ className = '' }: SiteHeaderProps) {
  const [isMobileMenuOpen] = useState(false);

  return (
    <header className={`bg-transparent ${className}`}>
      <div className="flex justify-between items-center py-8 px-4 md:px-8 lg:px-16">
        <Logo variant="blue" />
        <MainNav className="hidden lg:flex" />
        <div className="flex items-center gap-4">
          <UiButton variant="outline" size="md" className="hidden md:flex whitespace-nowrap">
            Contact us
          </UiButton>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/10 backdrop-blur-sm">
          <MainNav className="flex flex-col items-center gap-4 py-4" />
        </div>
      )}
    </header>
  );
}