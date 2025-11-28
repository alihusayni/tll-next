export default function ProfileStats() {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex flex-col">
        <span className="font-inter-tight font-semibold text-[2.125rem] md:text-[3.25rem] text-[#00356E]">400+</span>
        <span className="font-inter font-medium text-base text-[#747D85] md:mt-[-0.5rem]">Clients Served</span>
      </div>
      <div className="flex flex-col">
        <span className="font-inter-tight font-semibold text-[2.125rem] md:text-[3.25rem] text-[#00356E]">15+</span>
        <span className="font-inter font-medium text-base text-[#747D85] md:mt-[-0.5rem]">Years of Experience</span>
      </div>
    </div>
  );
}