interface CopyrightBarProps {
  copyrightText: string;
  designCreditText: string;
}

export default function CopyrightBar({ copyrightText, designCreditText }: CopyrightBarProps) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <span className="font-inter text-sm text-[#969799]">{copyrightText}</span>
      <span className="font-inter text-sm text-[#969799]">{designCreditText}</span>
    </div>
  );
}