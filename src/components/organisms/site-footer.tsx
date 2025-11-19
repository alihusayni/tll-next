import Logo from '../atoms/logo';
import FooterNavColumn from '../molecules/footer-nav-column';
import CopyrightBar from '../molecules/copyright-bar';

interface SiteFooterProps {
    className?: string;
}

export default function SiteFooter({className = ''}: SiteFooterProps) {
    const practicesItems = [
        // { text: 'Criminal Immigration Issues', href: '/family-based-immigration' },
        {text: 'Asylum & Humanitarian Relief', href: '/asylum-humanitarian-relief'},
        {
            text: 'Removal/Deportation Defense',
            href: '/deportation-defense/removal-proceedings/fighting-removal-proceedings'
        },
        {text: 'Citizenship & Naturalization Support', href: '/citizenship-naturalization/become-a-us-citizen'},
        {text: 'Family-based Immigration', href: '/us-immigrant-visas/family-based-immigration'},
        {text: 'Business & Employment Immigration', href: '/us-immigrant-visas/employment-based-immigration/eb-2'},
    ];

    return (
        <footer className={`bg-[#F7F9FC] m-0 border-t border-[#E1E3E5] ${className}`}>
            <div className="max-w-[95rem] mx-auto py-24 px-4 sm:px-8 lg:px-16 pb-8">
                <div className="flex flex-wrap gap-8 justify-between pb-10">
                    <div className="flex flex-col gap-6">
                        <Logo variant="Blue"/>
                        <p className="font-inter text-lg text-[#071C32] leading-[22px] max-w-[18rem]">We are the
                            Employment Law Center of Orange County CA.</p>
                    </div>
                    <div className="flex flex-wrap gap-8">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <h3 className="font-inter-tight font-semibold text-base uppercase text-[#969799]">Address</h3>
                                <span className="font-inter text-base text-[#071C32] w-[15rem]">333 City Blvd West Suite 1700 Orange, CA 92868</span>
                                <span
                                    className="font-inter text-base text-[#071C32]">Mon to Fri, 08:30 AM to 05:00 PM</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className="font-inter-tight font-semibold text-base uppercase text-[#969799]">Phone</h3>
                                <span className="font-inter text-base text-[#071C32]">(714) 584-6741</span>
                            </div>
                        </div>
                        <FooterNavColumn title="Practices" items={practicesItems}/>
                    </div>
                </div>
                <hr className="border-[#E1E6EB] mb-8"/>
                <CopyrightBar
                    copyrightText="Copyright © 2025 Law Office of Tuan Le All Rights Reserved"
                    designCreditText="Designed and Optimized by TopOrganicLeads."
                />
            </div>
        </footer>
    );
}