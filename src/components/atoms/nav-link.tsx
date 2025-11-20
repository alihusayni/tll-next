import Link from 'next/link';

interface NavLinkProps {
    href?: string;
    children: React.ReactNode;
    isActive?: boolean;
    hasDropdown?: boolean;
    className?: string;
    onClick?: () => void;
}

export default function NavLink({href, children, isActive = false, hasDropdown = false, className = '', onClick}: NavLinkProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        } else if (href) {
            window.dispatchEvent(new CustomEvent('navScroll'));
        }
    };

    const linkClassName = `relative font-inter-tight font-medium text-lg leading-[22px] whitespace-nowrap text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full ${isActive ? '!text-[#FF7031] before:bg-[#FF7031]' : ''} ${className} ${hasDropdown ? 'flex items-center gap-2' : ''}`;

    if (href) {
        return (
            <Link
                href={href}
                onClick={handleClick}
                className={linkClassName}
            >
                {children}
                {hasDropdown && (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                    >
                        <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </Link>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={linkClassName}
        >
            {children}
            {hasDropdown && (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
}