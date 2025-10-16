import ContactForm from '../molecules/contact-form';

export default function ContactSection() {
  return (
    <section className="bg-[#F7F9FC] py-16 px-4 md:py-24 md:px-8 lg:py-32 lg:px-16 m-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-5xl lg:text-6xl font-inter-tight font-semibold text-gray-900 mb-8 leading-tight">
              Get Legal Help Today!
            </h2>
            <p className="text-xl text-gray-500 mb-4 leading-relaxed">
              Need guidance from an experienced immigration attorney?
            </p>
            <p className="text-xl text-gray-500 leading-relaxed">
              Mr. Le has granted you a 30-minute consultation session. Get in touch right now!
            </p>
          </div>
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}