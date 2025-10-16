interface QuoteBoxProps {
  quote: string;
  author: string;
}

export default function QuoteBox({ quote, author }: QuoteBoxProps) {
  return (
    <div className="bg-[#E1E6EB] rounded-[32px] p-10 w-full max-w-[888px] mx-auto">
      <div className="flex gap-6">
        {/* Quote Mark */}
        <div className="flex-shrink-0">
          <span className="text-[62px] font-inter text-[#071C32] leading-none">"</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <blockquote className="text-xl font-inter text-[#071C32] leading-relaxed mb-8">
            {quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-5">
            <div className="w-8 h-0.5 bg-[#E55B1E]"></div>
            <cite className="text-lg font-inter-tight font-semibold text-[#747D85] uppercase tracking-wide">
              {author}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}