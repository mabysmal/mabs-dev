'use client';

import React, { useRef, useEffect, useState } from 'react';
import PortfolioWheel from './portfolio-wheel';

const PortfolioWheelContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFullyVisible(entry.intersectionRatio === 1);
      },
      { threshold: [1] }
    );

    observer.observe(container);

    const handleWheel = (e: WheelEvent) => {
      if (!isFullyVisible) {
        return;
      }

      const { deltaY } = e;
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Check if we're at the top or bottom of the container
      if (
        (deltaY > 0 && Math.ceil(scrollTop + clientHeight) >= scrollHeight) ||
        (deltaY < 0 && scrollTop <= 0)
      ) {
        // If so, don't prevent default - let the page scroll
        return;
      }

      // Otherwise, prevent default and handle the scroll ourselves
      e.preventDefault();
      container.scrollTop += deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isFullyVisible]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto">
      <PortfolioWheel isActive={isFullyVisible} />
    </div>
  );
};

export default PortfolioWheelContainer;