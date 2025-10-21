interface TocLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function TocLink({ href, children, isActive = false }: TocLinkProps) {
  return (
    <a
      href={href}
      className={`font-inter leading-[20px] tracking-[-0.28px] transition-colors ${
        isActive
          ? 'text-[#E55B1E] font-semibold'
          : 'text-[#49535D] hover:text-[#E55B1E] font-medium'
      }`}
    >
      {children}
    </a>
  );
}