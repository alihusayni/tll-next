import Link from 'next/link';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
}

export default function NavLink({href, children, isActive = false, className = ''}: NavLinkProps) {
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent('navScroll'));
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`relative font-inter-tight font-medium text-lg leading-[22px] uppercase whitespace-nowrap text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full active:before:w-full ${isActive ? 'text-orange-500 before:bg-orange-500 before:w-full' : ''} ${className}`}
        >
            {children}
        </Link>
    );
}