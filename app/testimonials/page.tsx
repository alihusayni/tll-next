import Header from '@/components/organisms/header';
import TestimonialsPageSection from '@/components/organisms/testimonials-page-section';
import type {Metadata} from 'next';
import dynamic from 'next/dynamic';

const ContactSection = dynamic(() => import('@/components/organisms/contact-section'));
const SiteFooter = dynamic(() => import('@/components/organisms/site-footer'));

export const metadata: Metadata = {
    title: 'Client Testimonials | Tuan Le Law',
    description: 'Read real success stories from our clients. See how Tuan Le Law has helped individuals and families achieve their immigration goals with expert legal guidance.',
    alternates: {
        canonical: 'https://www.tuanlelaw.com/testimonials',
    },
    openGraph: {
        title: 'Client Testimonials | Tuan Le Law',
        description: 'Read real success stories from our clients. See how Tuan Le Law has helped individuals and families achieve their immigration goals with expert legal guidance.',
        url: 'https://www.tuanlelaw.com/testimonials',
        siteName: 'Tuan Le Law',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Client Testimonials | Tuan Le Law',
        description: 'Read real success stories from our clients. See how Tuan Le Law has helped individuals and families achieve their immigration goals with expert legal guidance.',
    },
    robots: 'index,follow',
};

export default function TestimonialsPage() {
    return (
        <div className="bg-[#091c32]">
            <Header variant="transparent" />
            <Header variant="sticky" />
            <main>
                <TestimonialsPageSection/>
                <ContactSection/>
            </main>
            <SiteFooter/>
        </div>
    );
}

