interface CtaButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function CtaButton({ text, onClick, className = '' }: CtaButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-start gap-4 bg-[#E55B1E] text-white font-inter-tight font-semibold text-base uppercase pl-6 pr-6 py-4 h-14 rounded-md hover:bg-[#FF7031] transition-all hover:w-[12.75rem] w-[12.25rem] ${className}`}
    >
      {text}
       <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:rotate-45">
        <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}