import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/atoms/logo';
import MainNav from '@/components/molecules/main-nav';
import StickyHeader from '@/components/organisms/sticky-header';
import FaqSection from '@/components/organisms/faq-section';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';

export const metadata: Metadata = {
    title: 'FAQ | Frequently Asked Questions | Tuan Le Law',
    description: 'Find answers to common questions about immigration law, visa applications, citizenship, and our legal services. Get expert guidance from Tuan Le Law.',
    keywords: 'immigration FAQ, visa questions, immigration attorney questions, citizenship FAQ, immigration process, Tuan Le Law',
    alternates: {
        canonical: 'https://www.tuanlelaw.com/faq',
    },
    openGraph: {
        title: 'FAQ | Frequently Asked Questions | Tuan Le Law',
        description: 'Find answers to common questions about immigration law, visa applications, citizenship, and our legal services. Get expert guidance from Tuan Le Law.',
        url: 'https://www.tuanlelaw.com/faq',
        siteName: 'Tuan Le Law',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FAQ | Frequently Asked Questions | Tuan Le Law',
        description: 'Find answers to common questions about immigration law, visa applications, citizenship, and our legal services.',
    },
    robots: 'index,follow',
};

export default function FaqPage() {
    return (
        <>
            {/* Non-sticky header with light background */}
            <header className="relative z-40 bg-[#E8EDF2] w-full">
                <div className="flex justify-between items-center px-4 py-8 md:px-8 lg:px-16 xl:px-0 max-w-[86.5rem] mx-auto">
                    <Link href="/">
                        <Logo variant="Blue" />
                    </Link>
                    <div className="flex items-center gap-8">
                        <div className="hidden lg:flex">
                            <MainNav className="flex gap-10" customTextColor="text-[#030E1A]" />
                        </div>
                        <a
                            href="tel:(714) 877 5840"
                            className="hidden lg:flex items-center group justify-center gap-4 font-inter-tight font-semibold uppercase transition-colors rounded-md bg-transparent border-2 border-[#071C32] text-[#071C32] hover:bg-[#E55B1E] active:bg-[#E55B1E] hover:border-[#E55B1E] active:border-[#E55B1E] hover:text-white active:text-white px-6 py-4 text-base h-12 whitespace-nowrap"
                        >
                            <img
                                src="/assets/icons/Vector.svg"
                                alt="Phone"
                                width="20"
                                height="19"
                                className="group-hover:invert"
                            />
                            Talk to Us
                        </a>

                        {/* Mobile Hamburger Menu */}
                        <div className="lg:hidden">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 12H21M3 6H21M3 18H21"
                                        stroke="#030E1A"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <StickyHeader />
            <FaqSection />
            <ContactSection />
            <SiteFooter />
        </>
    );
}

