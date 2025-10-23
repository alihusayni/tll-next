import Logo from '../atoms/logo';
import FooterNavColumn from '../molecules/footer-nav-column';
import CopyrightBar from '../molecules/copyright-bar';

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className = '' }: SiteFooterProps) {
  const practicesItems = [
    // { text: 'Criminal Immigration Issues', href: '/family-based-immigration' },
    { text: 'Asylum & Humanitarian Relief', href: '/asylum-humanitarian-relief/undocumented-immigrants-u-s-immigration-challenges' },
    { text: 'Removal/Deportation Defense', href: '/deportation-defense/deportation-defense-strategies-to-fight-removal-proceedings' },
    { text: 'Citizenship & Naturalization Support', href: '/citizenship-naturalization/become-u-s-citizen-explained-citizenship-lawyer' },
    { text: 'Family-based Immigration', href: '/family-based-immigration' },
    { text: 'Business & Employment Immigration', href: '/employment-based-immigration/eb-2-employment-based-visas-whatever-you-need-to-know' },
  ];

  const addressItems = [
    { label: 'Address', text: '333 City Blvd West Suite 1700 Orange, CA 92868' },
    { label: 'Phone No', text: '(714) 584-6741', href: 'tel:(714) 877 5840' },
  ];

  return (
    <footer className={`bg-[#F7F9FC] m-0 border-t-2 border-[#E1E3E5] ${className}`}>
      <div className="max-w-[95rem] mx-auto py-24 px-4 sm:px-8 lg:px-16 pb-8">
        <div className="flex flex-wrap justify-between mr-25 mb-8">
          <div className="flex flex-col gap-6 self-start max-w-xs">
            <Logo variant="Blue" />
            <p className="font-inter text-lg text-[#071C32] leading-[22px] max-w-[18rem] pb-5">We are the Employment Law Center of Orange County CA.</p>
          </div>
          <div className="flex flex-wrap gap-12">
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