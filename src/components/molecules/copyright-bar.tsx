interface CopyrightBarProps {
  copyrightText: string;
}

import Link from 'next/link';

export default function CopyrightBar({ copyrightText }: CopyrightBarProps) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <span className="font-inter text-sm text-[#969799]">{copyrightText}</span>
      <span className="font-inter text-sm text-[#969799]">
        Designed and Optimized by{' '}
        <Link href="https://www.toporganicleads.com/" className="text-[#969799] hover:text-[#e55b1e] transition-colors">
          TopOrganicLeads
        </Link>
      </span>
    </div>
  );
}