import Link from 'next/link';
import { ReactNode } from 'react';

interface BreadcrumbProps {
  display: string;
  slugs: string[];
}

// List of paths that return 404 - these should be rendered as plain text
const INVALID_PATHS = [
  '/asylum-humanitarian-relief/asylum',
  '/deportation-defense',
  '/us-immigrant-visas/employment-based-immigration',
  '/citizenship-naturalization',
  '/us-nonimmigrant-visas/student-visas',
  '/us-immigrant-visas/family-based-immigration/fiance-visas',
  '/us-immigrant-visas/family-based-immigration/marriage-visas',
  '/us-immigrant-visas/employment-based-immigration/eb-1',
  '/us-immigrant-visas/employment-based-immigration/h-1b',
  '/us-immigrant-visas/diversity-visa-lottery',
];

export default function Breadcrumb({ display, slugs }: BreadcrumbProps) {
  const parts = display.split(' / ');
  const links: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (index > 0) {
      links.push(<span key={`sep-${index}`} className="mx-2 text-[#49535D] font-inter">/</span>);
    }

    let href = '/';
    if (index === 0) {
      // Home
      href = '/';
    } else {
      // Cumulative slug
      const cumulativeSlugs = slugs.slice(0, index);
      href = '/' + cumulativeSlugs.join('/') + '/';
    }

    // Check if this path is invalid (404) and render as plain text instead of link
    const normalizedHref = href.endsWith('/') && href.length > 1 ? href.slice(0, -1) : href;
    if (INVALID_PATHS.includes(normalizedHref)) {
      links.push(
        <span
          key={index}
          className="text-base leading-6 text-[#49535D] capitalize font-inter"
        >
          {part}
        </span>
      );
    } else {
      links.push(
        <Link
          key={index}
          href={href}
          className="text-base leading-6 text-[#49535D] hover:text-[#E55B1E] transition-colors capitalize font-inter"
        >
          {part}
        </Link>
      );
    }
  });

  return <div className="text-center text-base font-inter">{links}</div>;
}