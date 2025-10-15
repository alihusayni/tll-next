export default function ProfileStats() {
  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-col gap-1">
        <span className="font-inter-tight font-semibold text-[52px] text-[#00356E]">400+</span>
        <span className="font-inter font-medium text-base text-[#747D85]">Clients Served</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-inter-tight font-semibold text-[52px] text-[#00356E]">15+</span>
        <span className="font-inter font-medium text-base text-[#747D85]">Years of Experience</span>
      </div>
    </div>
  );
}