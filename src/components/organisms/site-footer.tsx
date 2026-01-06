import Logo from "../atoms/logo";
import FooterNavColumn from "../molecules/footer-nav-column";
import CopyrightBar from "../molecules/copyright-bar";
import Link from "next/link";

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className = "" }: SiteFooterProps) {
  const practicesItems = [
    // { text: 'Criminal Immigration Issues', href: '/family-based-immigration' },
    {
      text: "Asylum & Humanitarian Relief",
      href: "/asylum-humanitarian-relief",
    },
    {
      text: "Family-based Immigration",
      href: "/us-immigrant-visas/family-based-immigration",
    },
    {
      text: "Business & Employment Immigration",
      href: "/us-immigrant-visas/employment-based-immigration/eb-2",
    },
  ];

  return (
    <footer
      className={`bg-[#F7F9FC] m-0 border-t border-[#E1E3E5] ${className}`}
    >
      <div className="max-w-[95rem] mx-auto py-8 px-4 sm:px-8 lg:px-16 pb-8">
        <div className="flex flex-wrap gap-16 justify-between pb-8">
          <div className="flex flex-col gap-8">
            <Logo variant="Blue" />
            <p className="font-inter text-lg text-[#071C32] leading-7 max-w-[18rem]">
              We are the Employment Law Center of Orange County CA.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 sm:gap-32">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="font-inter-tight font-semibold text-base uppercase text-[#969799]">
                  Address
                </h3>
                <span className="font-inter text-base text-[#071C32] w-[15rem]">
                  333 City Blvd West Suite 1700 Orange, CA 92868
                </span>
                <span className="font-inter text-base text-[#071C32]">
                  Mon to Fri, 08:30 AM to 05:00 PM
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-inter-tight font-semibold text-base uppercase text-[#969799]">
                  Phone
                </h3>
                <Link
                  href="tel:(714) 877 5840"
                  className="font-inter text-base text-[#071C32] hover:text-[#e55b1e] transition-colors"
                >
                  (714) 584-6741
                </Link>
              </div>
            </div>
            <FooterNavColumn title="Practices" items={practicesItems} />
          </div>
        </div>
        <hr className="border-[#E1E6EB]" />
        <div className="flex flex-col text-[#747D85] text-sm leading-7 justify-center py-8 font-inter">
          <p>Attorney Advertising Notice</p>
          <p>
            This law office is a federally designated DEBT RELIEF AGENCY as
            defined in the 2005 amendments to the US Bankruptcy Code. This law
            office provides legal advice regarding the pros and cons of filing
            bankruptcy and represents people and small businesses in filing for
            bankruptcy relief under the US Bankruptcy Code. Debt Relief Agency
            Notice.
          </p>
          <p className="my-3"></p>
          <p>Prior results do not guarantee a similar outcome.</p>
          <p>
            These materials have been prepared by the Law Office of Tuan Le for
            informational purposes only and does not constitute legal advice.
            This information is not intended to create, and receipt of it does
            not constitute, an attorney-client relationship. Internet
            subscribers and online readers should not act upon this information
            without seeking professional counsel. Do not send us information
            until you speak with one of our attorneys and obtain authorization
            to send that information to us.
          </p>
        </div>
        <hr className="border-[#E1E6EB] mb-6" />
        <CopyrightBar copyrightText="Copyright © 2025 Law Office of Tuan Le All Rights Reserved" />
      </div>
    </footer>
  );
}
