'use client';

import UiButton from './ui-button';

export default function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-end my-8">
      <UiButton variant="dark-outline" size="md" onClick={scrollToTop}>
        Back to Top
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 0L12 6H7.5V16H4.5V6H0L6 0Z"
            fill="currentColor"
          />
        </svg>
      </UiButton>
    </div>
  );
}