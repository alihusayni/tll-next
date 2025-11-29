import Link from 'next/link';

interface FooterNavColumnProps {
  title: string;
  items: { label?: string; text: string; href?: string }[];
}

export default function FooterNavColumn({ title, items }: FooterNavColumnProps) {
  return (
    <div className={`flex pr-0 sm:pr-20 flex-col gap-4 ${title === '' ? 'max-w-[15rem]' : ''}`}>
      {title && <h3 className="font-inter-tight font-semibold text-base uppercase text-[#969799]">{title}</h3>}
       <ul className={`flex flex-col ${title === '' ? 'gap-12' : 'gap-3'}`}>
        {items.map((item, index) => (
          <li key={index} className="flex flex-col gap-2">
            {item.label && <span className="font-inter-tight font-semibold text-base uppercase text-[#969799]">{item.label}</span>}
              {item.href ? (
                 <Link href={item.href} className="flex justify-between items-center group font-inter text-base text-[#49535D] hover:text-[#FF7031] active:text-[#FF7031] transition-colors">
                  <span>{item.text}</span>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="group-hover:rotate-45 transition-transform"
                  >
                    <path
                      d="M7.5 12.75L12.75 7.5M12.75 7.5H9M12.75 7.5V11.25"
                      stroke="currentColor"
                      strokeWidth="1.125"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : (
              <span className="font-inter text-base text-[#071C32]">{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}