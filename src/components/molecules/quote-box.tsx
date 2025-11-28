interface QuoteBoxProps {
  quote: string;
  author: string;
}

export default function QuoteBox({ quote, author }: QuoteBoxProps) {
    return (
        <div className="bg-[#E1E6EB] rounded-[1rem] p-8 w-full max-w-[55.5rem] mx-auto">
            <div className="relative">
                <div
                    className="absolute top-0 left-0 text-[3.875rem] text-[#071C32] !font-inter leading-[2.375rem]"
                >
                    &quot;
                </div>

                <blockquote className="text-xl font-inter text-[#071C32] leading-relaxed mb-8 **pt-16**">
                    <span className="block h-6" aria-hidden="true"></span>
                    <span className="block h-6" aria-hidden="true"></span>
                    {quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-0.5 bg-[#E55B1E]"></div>
                    <cite className="text-lg font-inter-tight font-semibold text-[#747D85] uppercase tracking-wide">
                        {author}
                    </cite>
                </div>
            </div>
        </div>
    );
}