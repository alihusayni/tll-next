import Link from 'next/link';

interface NavLinkProps {
    href?: string;
    children: React.ReactNode;
    isActive?: boolean;
    hasDropdown?: boolean;
    className?: string;
    onClick?: () => void;
    customTextColor?: string;
    showUnderline?: boolean;
    textSize?: 'lg' | 'base';
}

export default function NavLink({href, children, isActive = false, hasDropdown = false, className = '', onClick, customTextColor, showUnderline = true, textSize = 'lg'}: NavLinkProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            // Only prevent default if there's no href (pure dropdown trigger)
            if (!href) {
                e.preventDefault();
                onClick();
            } else {
                // Allow navigation to proceed, but also call onClick for dropdown functionality
                setTimeout(() => {
                    onClick();
                }, 100);
                // Dispatch the scroll event
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('navScroll'));
                }, 100);
            }
        } else if (href) {
            // Allow navigation to proceed, but also dispatch the scroll event
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('navScroll'));
            }, 100);
        }
    };

    const underlineClasses = showUnderline ? 'before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-current before:transition-all before:duration-300 hover:before:w-full' : '';
    const textSizeClass = textSize === 'base' ? 'text-base leading-6' : 'text-lg leading-[1.375rem]';
    const linkClassName = `relative font-inter-tight font-medium ${textSizeClass} whitespace-nowrap ${customTextColor || 'text-white'} ${underlineClasses} ${isActive ? '!text-[#FF7031]' : ''} ${className} ${hasDropdown ? 'flex items-center gap-2' : ''}`;

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