import Link from 'next/link';
import { ReactNode } from 'react';

interface BreadcrumbProps {
  display: string;
  slugs: string[];
}

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

    links.push(
      <Link
        key={index}
        href={href}
        className="text-base leading-6 text-[#49535D] hover:text-[#E55B1E] transition-colors capitalize font-inter"
      >
        {part}
      </Link>
    );
  });

  return <div className="text-center text-base font-inter">{links}</div>;
}