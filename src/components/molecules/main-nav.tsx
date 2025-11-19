import NavLink from '../atoms/nav-link';

interface MainNavProps {
  className?: string;
}

export default function MainNav({ className = '' }: MainNavProps) {
  const navItems = [
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/faq', label: 'FAQ' },
    { href: '/blog', label: 'Blog' }
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