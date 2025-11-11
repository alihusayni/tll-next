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
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75 16.75L6.75 0.75M6.75 0.75L12.75 6.75M6.75 0.75L0.75 6.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
              />
          </svg>
      </UiButton>
    </div>
  );
}