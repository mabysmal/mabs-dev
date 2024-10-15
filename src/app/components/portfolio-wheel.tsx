'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const projects = [
  {
    id: 1,
    title: 'Macanazos',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.',
    link: 'https://macanazos.memaxo.art/'
  },
  {
    id: 1,
    title: 'Posts for Fall Out Boy Dreamers',
    type: 'Editorial Design',
    images: ['/images/FOBDreamerslogo.jpg', '/images/FOBDreamersWP.jpeg', '/images/FOBDreamersHorario.jpg', '/images/FOBDreamersFreebies.jpg', '/images/FOBDreamersPDCDMX.jpeg', '/images/FOBDreamersPD.jpg', '/images/FOBDreamersSeashell.jpeg', '/images/FOBDreamersGracias.jpg'],
    description: 'Posts made for the official mexican fanclub for Fall Out Boy showing announcements for both shows in Mexico.',
    link: 'https://macanazos.memaxo.art/'
  },
  {
    id: 1,
    title: 'Macanazos 3',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.',
    link: 'https://macanazos.memaxo.art/'
  },
  {
    id: 1,
    title: 'Macanazos 4',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.',
    link: 'https://macanazos.memaxo.art/'
  },
  {
    id: 1,
    title: 'Macanazos 5',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.',
    link: 'https://macanazos.memaxo.art/'
  },
  // ... (other projects)
];

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start from the second image
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length - 1) + 1); // Skip the first image
  }, [isTransitioning, images.length]);

  const prevImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => ((prevIndex - 2 + images.length) % (images.length - 1)) + 1); // Skip the first image
  }, [isTransitioning, images.length]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextImage();
    }, 1500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentImageIndex, nextImage]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="relative pb-[100%] w-full">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {images.slice(1).map((image, index) => (
          <img
            key={index + 1}
            src={image}
            alt={`Project image ${index + 2}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 rounded-lg ${
              index + 1 === currentImageIndex
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center p-2">
        <button
          onClick={prevImage}
          className="bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform -translate-y-1/2 absolute left-2 top-1/2"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 transform -translate-y-1/2 absolute right-2 top-1/2"
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

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!isActive) return;
    setCurrentProjectIndex((prev) => 
      direction === 'next' 
        ? (prev + 1) % projects.length 
        : (prev - 1 + projects.length) % projects.length
    );
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      navigateProject('next');
    }
    if (touchStart - touchEnd < -75) {
      navigateProject('prev');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen border-solid border-2 border-white">
      {/* PortfolioWheel for desktop */}
      <div className="hidden md:flex md:flex-1 md:w-[20%] items-center justify-end border-solid border-2 border-white">
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigateProject('prev')}
            className="mb-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronUp size={32} className='pb-4' />
          </button>
          <div className="flex flex-col items-center space-y-4">
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
            onClick={() => navigateProject('next')}
            className="mt-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Project details for desktop and mobile */}
      <div id='CurrentProjectCard' className="md:w-3/4 flex flex-2 flex-col flex-wrap max-h-[75vh] border-solid border-2 border-white">
        <div 
          className="flex-1 flex items-center justify-center p-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-3xl flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{projects[currentProjectIndex].title}</h1>
            <span className="text-sm text-gray-500 mb-4 block">{projects[currentProjectIndex].type}</span>
            
            {/* Image Carousel */}
            <div id='ImageCarouselContainer' className='w-1/2 h-1/2' >
              <ImageCarousel  images={projects[currentProjectIndex].images} />
            </div>
            
            
            <p className="text-gray-700 mb-4 mt-4 w-3/4 mx-auto">{projects[currentProjectIndex].description}</p>
            <a href={projects[currentProjectIndex].link} className='flex justify-center items-center'>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View Project
              </button>
            </a>
          </div>
        </div>

        {/* Navigation arrows for mobile */}
        <div className="md:hidden flex justify-between p-4 w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigateProject('prev');
            }}
            className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigateProject('next');
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