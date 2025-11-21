interface TestimonialQuoteProps {
  quote: string;
  author: string;
  className?: string;
}

export default function TestimonialQuote({ 
  quote, 
  author, 
  className = '' 
}: TestimonialQuoteProps) {
  return (
    <div className={`bg-[#E1E6EB] rounded-2xl md:rounded-[32px] p-6 md:p-10 ${className}`}>
      <div className="flex flex-col gap-6 md:gap-8 max-w-[960px]">
        {/* Quote */}
        <div className="flex flex-col gap-0">
          <p className="font-inter font-normal text-4xl md:text-5xl lg:text-[62px] leading-[28px] md:leading-[38px] text-[#071C32]">
            &ldquo;
          </p>
          <p className="font-inter font-normal text-lg md:text-xl lg:text-2xl leading-7 md:leading-9 lg:leading-[38px] text-[#071C32]">
            {quote}
          </p>
        </div>
        
        {/* Author */}
        <div className="flex gap-4 md:gap-5 items-center">
          <div className="bg-[#E55B1E] h-[2px] w-6 md:w-8" />
          <p className="font-inter-tight font-semibold text-base md:text-lg leading-6 md:leading-7 text-[#747D85] uppercase">
            {author}
          </p>
        </div>
      </div>
    </div>
  );
}

