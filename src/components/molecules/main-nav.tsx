import NavLink from '../atoms/nav-link';

interface MainNavProps {
  className?: string;
}

export default function MainNav({ className = '' }: MainNavProps) {
  const navItems = [
    { href: '/about', label: 'about' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/why-tuan-le', label: 'Why Tuan le?' },
    { href: '/contact', label: 'Contact us' }
  ];

  return (
    <nav className={`flex items-center gap-10 ${className}`}>
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}