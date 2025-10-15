import HeroSection from '@/components/organisms/hero-section';
import AboutSection from '@/components/organisms/about-section';
import CertificationSection from '@/components/organisms/certification-section';
import TestimonialSection from '@/components/organisms/testimonial-section';
import WhyTuanSection from '@/components/organisms/why-tuan-section';

export default function Home() {
    return (
        <>
            <HeroSection/>
            <CertificationSection/>
            <AboutSection/>
            <TestimonialSection/>
            <WhyTuanSection/>
        </>
    );
}
