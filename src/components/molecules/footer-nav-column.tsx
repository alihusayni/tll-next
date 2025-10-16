import Link from 'next/link';

interface FooterNavColumnProps {
  title: string;
  items: { label?: string; text: string; href?: string }[];
}

export default function FooterNavColumn({ title, items }: FooterNavColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      {title && <h3 className="font-inter-tight font-semibold text-base uppercase text-[#969799]">{title}</h3>}
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col gap-2">
            {item.label && <span className="font-inter-tight font-semibold text-base uppercase text-[#969799]">{item.label}</span>}
            {item.href ? (
              <Link href={item.href} className="font-inter text-base text-[#071C32] hover:text-[#FF7031] transition-colors">
                {item.text}
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