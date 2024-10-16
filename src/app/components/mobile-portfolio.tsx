import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  type: string;
  images: string[];
  description: string;
  link: string;
}

interface MobileProjectCarouselProps {
  projects: Project[];
}

const MobileProjectCarousel: React.FC<MobileProjectCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4 px-4">Swipe for navigating project cards!</h2>
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-full flex-shrink-0 px-4"
            style={{ transform: `scale(${index === currentIndex ? 1 : 0.9})` }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-green-600">{project.type}</p>
                <p className="mt-2 text-sm text-gray-600">{project.description.substring(0, 100)}...</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md">
                  See more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)}
          className="bg-white bg-opacity-50 rounded-full p-1 ml-2"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)}
          className="bg-white bg-opacity-50 rounded-full p-1 mr-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MobileProjectCarousel;