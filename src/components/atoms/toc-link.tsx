interface TocLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function TocLink({ href, children, isActive = false }: TocLinkProps) {
  return (
    <a
      href={href}
      className={`text-sm font-medium leading-tight tracking-tight transition-colors ${
        isActive
          ? 'text-[#E55B1E] font-semibold'
          : 'text-[#49535D] hover:text-[#071C32]'
      }`}
    >
      {children}
    </a>
  );
}