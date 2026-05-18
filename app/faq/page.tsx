import type { Metadata } from 'next';
import Header from '@/components/organisms/header';
import FaqSection from '@/components/organisms/faq-section';
import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/organisms/contact-section'));
const SiteFooter = dynamic(() => import('@/components/organisms/site-footer'));

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
            <Header variant="light" />
            <Header variant="sticky" />
            <main>
                <FaqSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </>
    );
}

