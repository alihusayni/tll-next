import Header from '@/components/organisms/header';
import HeroSection from '@/components/organisms/hero-section';
// CertificationSection is below the hero fold — dynamic import removes it from
// the critical JS bundle so it doesn't compete with the hero for parse/exec time.
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Below-fold sections are dynamically imported so their JS is split into
// separate async chunks and not included in the critical path bundle.
const CertificationSection = dynamic(() => import('@/components/organisms/certification-section'));
const AboutSection = dynamic(() => import('@/components/organisms/about-section'));
const TestimonialSection = dynamic(() => import('@/components/organisms/testimonial-section'));
const ArticlesSection = dynamic(() => import('@/components/organisms/articles-section'));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section'));
const SiteFooter = dynamic(() => import('@/components/organisms/site-footer'));

export const metadata: Metadata = {
  title: 'Tuan Le Law | Professional Immigration Legal Services',
  description: 'Professional legal services provided by Tuan Le Law. Expert immigration law assistance for visas, citizenship, and deportation defense.',
  alternates: {
    canonical: 'https://www.tuanlelaw.com',
  },
  openGraph: {
    title: 'Tuan Le Law | Professional Immigration Legal Services',
    description: 'Professional legal services provided by Tuan Le Law. Expert immigration law assistance for visas, citizenship, and deportation defense.',
    url: 'https://www.tuanlelaw.com',
    siteName: 'Tuan Le Law',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tuan Le Law | Professional Immigration Legal Services',
    description: 'Professional legal services provided by Tuan Le Law. Expert immigration law assistance for visas, citizenship, and deportation defense.',
  },
  robots: 'index,follow',
};

export default function Home() {
    return (
        <>
            <Header variant="sticky" />
            <main>
                <HeroSection/>
                <CertificationSection/>
                <AboutSection/>
                <TestimonialSection/>
                <ArticlesSection/>
                <ContactSection/>
            </main>
            <SiteFooter/>
        </>
    );
}
