import ContactForm from '../molecules/contact-form';
import HeroRatingStar from '../atoms/hero-rating-star';

export default function ContactSection() {
    return (
        <section id="contact" className="bg-[#F7F9FC] py-25 px-8 sm:py-38 sm:px-16 lg:py-32 lg:px-16 m-0 -scroll-mt-20">
            <div className="max-w-[95rem] mx-auto">
                <div className="flex flex-col lg:px-16 lg:py-32 lg:flex-row gap-18 lg:gap-16">
                    <div className="flex-1 max-w-[36.25rem]">
                        <h2 className="text-[40px] lg:text-[62px] font-inter-tight font-semibold text-gray-900 mb-16 leading-tight">
                            Get Legal Help Today!
                        </h2>
                        <p className="text-xl lg:text-2xl text-[#747D85] font-semibold font-inter mb-6 leading-[26px] lg:leading-8">
                            Need guidance from an experienced immigration attorney?
                        </p>
                        <p className="text-lg text-[#747D85] font-inter mb-6 leading-6 lg:leading-[22px]">
                            Mr. Le has granted you a 30-minute consultation session.
                        </p>
                        <div className="flex flex-col items-start gap-2 mt-4">
                            {/* Stars - Top Line */}
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg
                                        key={i}
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="#FF7031"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[21px] h-[21px]"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            
                            {/* Rating and Reviews - Second Line */}
                            <div className="flex items-center gap-2">
                                <span className="font-inter-tight font-semibold text-lg text-gray-900">
                                    5.0/5 RATING
                                </span>
                                <span className="font-inter-tight font-medium text-sm text-[#747D85]">
                                    70+ REVIEWS
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="flex-1">
                        <ContactForm/>
                    </div>
                </div>
            </div>
        </section>
    );
}