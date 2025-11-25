import Header from '@/components/organisms/header';
import TestimonialsPageSection from '@/components/organisms/testimonials-page-section';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';
import type {Metadata} from 'next';

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
        <>
            <Header variant="sticky" />
            <TestimonialsPageSection/>
            <ContactSection/>
            <SiteFooter/>
        </>
    );
}

