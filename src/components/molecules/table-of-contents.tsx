import TocLink from '../atoms/toc-link';

interface TocItem {
  href: string;
  label: string;
  isActive?: boolean;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="bg-[#E1E6EB] rounded-2xl p-8 w-full lg:w-80">
      <h3 className="text-xl font-inter-tight font-semibold text-[#49535D] mb-6">
        Table of content
      </h3>
      <nav>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index}>
              <TocLink href={item.href} isActive={item.isActive}>
                {item.label}
              </TocLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}