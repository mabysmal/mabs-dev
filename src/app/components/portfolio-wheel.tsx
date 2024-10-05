'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Macanazos',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  {
    id: 1,
    title: 'Macanazos 2',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  {
    id: 1,
    title: 'Macanazos 3',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  {
    id: 1,
    title: 'Macanazos 4',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  {
    id: 1,
    title: 'Macanazos 5',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  // ... (other projects)
];

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);
  const autoAdvanceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const startAutoAdvance = () => {
    if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);
    autoAdvanceIntervalRef.current = setInterval(() => {
      nextImage();
    }, 3000);
  };

  const stopAutoAdvance = () => {
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoAdvancing) {
      startAutoAdvance();
    } else {
      stopAutoAdvance();
    }

    return () => stopAutoAdvance();
  }, [isAutoAdvancing]);

  const handleManualNavigation = (direction: 'prev' | 'next') => {
    setIsAutoAdvancing(false);
    if (direction === 'prev') {
      prevImage();
    } else {
      nextImage();
    }
  };

  return (
    <div className="relative pb-[100%] w-full">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Project image ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-between p-2">
        <button
          onClick={() => handleManualNavigation('prev')}
          className="bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleManualNavigation('next')}
          className="bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
interface PortfolioProps {
  isActive: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ isActive }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const navigatePrev = () => {
    if (!isActive) return;
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const navigateNext = () => {
    if (!isActive) return;
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      navigateNext();
    }
    if (touchStart - touchEnd < -75) {
      navigatePrev();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* PortfolioWheel for desktop */}
      <div className="hidden md:flex md:flex-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <button
            onClick={navigatePrev}
            className="mb-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronUp size={32} />
          </button>
          <div className="flex flex-col  items-center space-y-4">
            {projects.map((project, index) => (
              <img
                key={project.id}
                src={project.images[0]}
                alt={project.title}
                onClick={() => setCurrentProjectIndex(index)}
                className={`w-24 h-24 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentProjectIndex ? 'scale-150 border-4 border-blue-500' : 'opacity-50 hover:opacity-75'
                }`}
              />
            ))}
          </div>
          <button
            onClick={navigateNext}
            className="mt-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Project details for desktop and mobile */}
      <div className="flex-1 flex flex-col">
        <div 
          className="flex-1 flex items-center justify-center p-4"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{projects[currentProjectIndex].title}</h1>
            <span className="text-sm text-gray-500 mb-4 block">{projects[currentProjectIndex].type}</span>
            <ImageCarousel images={projects[currentProjectIndex].images} />
            <p className="text-gray-700 mb-4 mt-4">{projects[currentProjectIndex].description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Project
            </button>
          </div>
        </div>

        {/* Navigation arrows for mobile */}
        <div className="md:hidden flex justify-between p-4 w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigatePrev();
            }}
            className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigateNext();
            }}
            className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;