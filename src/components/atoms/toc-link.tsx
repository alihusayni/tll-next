interface TocLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function TocLink({ href, children, isActive = false }: TocLinkProps) {
  return (
    <a
      href={href}
      className={`font-inter leading-5 tracking-[-0.0175rem] transition-colors ${
        isActive
          ? 'text-[#E55B1E] font-semibold'
          : 'text-[#49535D] hover:text-[#E55B1E] font-medium'
      }`}
    >
      {children}
    </a>
  );
}