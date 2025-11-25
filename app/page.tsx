import Header from '@/components/organisms/header';
import HeroSection from '@/components/organisms/hero-section';
import AboutSection from '@/components/organisms/about-section';
import CertificationSection from '@/components/organisms/certification-section';
import TestimonialSection from '@/components/organisms/testimonial-section';
import ArticlesSection from '@/components/organisms/articles-section';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';
import type { Metadata } from 'next';

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
            <HeroSection/>
            <CertificationSection/>
            <AboutSection/>
            <TestimonialSection/>
            <ArticlesSection/>
            <ContactSection/>
            <SiteFooter/>
        </>
    );
}
