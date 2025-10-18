import ContactForm from '../molecules/contact-form';

export default function ContactSection() {
    return (
        <section id="contact" className="bg-[#F7F9FC] py-25 px-8 sm:py-38 sm:px-16 lg:py-32 lg:px-16 m-0 scroll-mt-24">
            <div className="max-w-[90rem] mx-auto">
                <div className="flex flex-col lg:px-16 lg:py-32 lg:flex-row gap-18 lg:gap-16">
                    <div className="flex-1 max-w-[36.25rem]">
                        <h2 className="text-[40px] lg:text-[62px] font-inter-tight font-semibold text-gray-900 mb-8 leading-tight">
                            Get Legal Help Today!
                        </h2>
                        <p className="text-xl lg:text-2xl text-[#969799] mb-4 leading-relaxed lg:leading-7">
                            Need guidance from an experienced immigration attorney?
                        </p>
                        <p className="text-xl lg:text-2xl text-[#969799] leading-relaxed lg:leading-7">
                            Mr. Le has granted you a 30-minute consultation session.
                        </p>
                        <p className="text-xl lg:text-2xl text-[#969799] leading-relaxed lg:leading-7">
                            Get in touch right now!
                        </p>
                    </div>
                    <div className="flex-1">
                        <ContactForm/>
                    </div>
                </div>
            </div>
        </section>
    );
}