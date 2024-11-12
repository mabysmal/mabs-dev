import React from 'react';

interface FloatingChevronProps {
  className?: string;
}

const FloatingChevron: React.FC<FloatingChevronProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-center justify-center pt-8 transform -translate-x-1/2 animate-bounce ${className}`}>
      <svg
        xmlns="https://api.iconify.design/solar:double-alt-arrow-down-outline.svg"
        className="h-10 w-10 md:h-15 md:w-15"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
};

export default FloatingChevron;