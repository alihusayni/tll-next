import StickyHeader from '@/components/organisms/sticky-header';
import HeroSection from '@/components/organisms/hero-section';
import AboutSection from '@/components/organisms/about-section';
import CertificationSection from '@/components/organisms/certification-section';
import TestimonialSection from '@/components/organisms/testimonial-section';
import WhyTuanSection from '@/components/organisms/why-tuan-section';
import ContactSection from '@/components/organisms/contact-section';
import SiteFooter from '@/components/organisms/site-footer';

export default function Home() {
    return (
        <>
            <StickyHeader />
            <HeroSection/>
            <CertificationSection/>
            <AboutSection/>
            <TestimonialSection/>
            <WhyTuanSection/>
            <ContactSection/>
            <SiteFooter/>
        </>
    );
}
