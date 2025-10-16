import Logo from '../atoms/logo';
import FooterNavColumn from '../molecules/footer-nav-column';
import CopyrightBar from '../molecules/copyright-bar';

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className = '' }: SiteFooterProps) {
  const practicesItems = [
    { text: 'Criminal Immigration Issues' },
    { text: 'Removal/Deportation Defense' },
    { text: 'Citizenship & Naturalization Support' },
    { text: 'Family-based Immigration' },
    { text: 'Business & Employment Immigration' },
  ];

  const addressItems = [
    { label: 'Address', text: '333 City Blvd West Suite 1700 Orange, CA 92868' },
    { label: 'Phone No', text: '(714) 584-6741' },
  ];

  return (
    <footer className={`bg-[#F7F9FC] m-0 ${className}`}>
      <div className="max-w-[1512px] mx-auto py-24 px-16 pb-8">
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          <div className="flex flex-col gap-6 max-w-xs">
            <Logo variant="Blue" />
            <p className="font-inter text-lg text-[#071C32]">We are the Employment Law Center of Orange County CA.</p>
          </div>
          <div className="flex flex-wrap gap-8">
            <FooterNavColumn title="Practices" items={practicesItems} />
            <FooterNavColumn title="" items={addressItems} />
          </div>
        </div>
        <hr className="border-[#E1E6EB] mb-8" />
        <CopyrightBar
          copyrightText="Copyright © 2025 Law Office of Tuan Le All Rights Reserved"
          designCreditText="Designed and Optimized by TopOrganicLeads."
        />
      </div>
    </footer>
  );
}