import React from 'react';

interface HeroRatingStarProps {
  rating?: number;
}

const HeroRatingStar: React.FC<HeroRatingStarProps> = ({ rating = 5 }) => {
  return (
    <div
      className="flex items-center"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={i < rating ? '#FFFFFF' : '#D2D5D9'}
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

export default HeroRatingStar;