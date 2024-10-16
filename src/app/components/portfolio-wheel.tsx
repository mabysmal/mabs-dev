'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageCarousel from './imagecarousel';


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
];

interface PortfolioProps {
  isActive: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ isActive }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!isActive) return;
    setCurrentProjectIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % projects.length;
      } else {
        return (prev - 1 + projects.length) % projects.length;
      }
    });
  };

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

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen p-4 relative">
        <h1 className="text-2xl font-bold mb-4">My Projects</h1>
        <div 
          className="flex-1 overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="w-full flex-shrink-0 p-2 transition-all duration-300"
                style={{
                  transform: `translateX(${(index - currentProjectIndex) * 100}%)`,
                  opacity: index === currentProjectIndex ? 1 : 0.5,
                  scale: index === currentProjectIndex ? '1' : '0.9',
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <ImageCarousel images={project.images} />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{project.type}</p>
                  <p className="text-sm mb-4">{project.description}</p>
                  <a href={project.link} className="block">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full w-full">
                      See more
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Left Chevron */}
          <button 
            onClick={() => navigateProject('prev')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Chevron */}
          <button 
            onClick={() => navigateProject('next')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="mt-4 text-center text-gray-600">
          Swipe or use arrows to navigate project cards!
        </div>
      </div>
    );
  }

  // desktop screen
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <div className="hidden md:flex md:flex-1 md:w-[20%] items-center justify-end ">
        <div className="flex flex-col items-center">
          <button
            onClick={() => navigateProject('prev')}
            className="mb-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronUp size={32} className='pb-4' />
          </button>
          <div className="flex flex-col items-center space-y-4">
            {projects.map((project, index) => (
              <Image
                key={project.id}
                src={project.images[0]}
                alt={project.title}
                width={96}
                height={96}
                onClick={() => setCurrentProjectIndex(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
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

      <div id='CurrentProjectCard' className="md:w-3/4 flex flex-2 flex-col flex-wrap max-h-[75vh] ">
        <div 
          className="flex-1 flex items-center justify-center p-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-3xl flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{projects[currentProjectIndex].title}</h1>
            <span className="text-sm text-gray-500 mb-4 block">{projects[currentProjectIndex].type}</span>
            
            <div id='ImageCarouselContainer' className='w-1/2 h-1/2' >
              <ImageCarousel images={projects[currentProjectIndex].images} />
            </div>
            
            <p className="text-gray-700 mb-4 mt-4 w-3/4 mx-auto">{projects[currentProjectIndex].description}</p>
            <a href={projects[currentProjectIndex].link} className='flex justify-center items-center'>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View Project
              </button>
            </a>
          </div>
        </div>
        


      </div>
    </div>
  );
};

export default Portfolio;