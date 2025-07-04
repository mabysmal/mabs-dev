'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageCarousel from './imagecarousel';

const projects = [
  {
    id: 1,
    title: 'Amygo.ca',
    type: 'Biotechnology Website',
    images: ['/images/amygo logo.png', '/images/amygo 1.png', '/images/amygo 2.png', '/images/amygo 3.png', '/images/amygo 4.png', '/images/amygo 5.png', '/images/amygo 6.png', ],
    description: 'Website for the biotechnology company Amygo Biotechnologies Inc.',
    link: 'https://amygo.ca'
  },
  {
    id: 1,
    title: 'Netushi',
    type: 'Restaurant Website',
    images: ['/images/netushi logo.png', '/images/netushi 1.png', '/images/netushi 2.png', '/images/netushi 3.png', '/images/netushi 4.png', '/images/netushi 5.png'],
    description: 'Website for the Monterrey-style sushi restaurant Netushi.',
    link: 'https://netushi.com/'
  },
  {
    id: 1,
    title: 'Macanazos',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of personalized cartoons in a variety of mediums.',
    link: 'https://macanazos.memaxo.art/'
  },
  {
    id: 1,
    title: 'Recetas Mabs',
    type: 'Cooking Website',
    images: ['/images/recetasimg.jpg', '/images/recetashome.png', '/images/recetashome2.png', '/images/recetasrecetas.png', '/images/recetasrecetas2.png'],
    description: 'A website for recipes from my family and friends. A personal project that made me closer to the people I love through cooking.',
    link: 'https://recetas.mabs.dev/'
  },
  {
    id: 1,
    title: 'Posts for Fall Out Boy Dreamers',
    type: 'Editorial Design',
    images: ['/images/FOBDreamerslogo.jpg', '/images/FOBDreamersWP.jpeg', '/images/FOBDreamersHorario.jpg', '/images/FOBDreamersFreebies.jpg', '/images/FOBDreamersPDCDMX.jpeg', '/images/FOBDreamersPD.jpg', '/images/FOBDreamersSeashell.jpeg', '/images/FOBDreamersGracias.jpg'],
    description: 'Posts made for the official mexican fanclub for Fall Out Boy showing announcements for both shows in Guadalajara and Mexico City.',
    link: 'https://www.facebook.com/fob.dreamers'
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
      <div className="flex flex-col h-screen">
        <div className="text-sm text-center text-white p-2 mt-6">
          Swipe or use arrows to navigate project cards!
        </div>
        <div 
          className="flex-1 overflow-hidden relative flex flex-col items-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out absolute w-full h-full"
            style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="w-full h-full flex-shrink-0 p-2 transition-all duration-300 flex justify-center items-start"
                style={{
                  transform: `translateX(${(index - currentProjectIndex) * 100}%)`,
                  opacity: index === currentProjectIndex ? 1 : 0.5,
                  scale: index === currentProjectIndex ? '1' : '0.9',
                }}
              >
                <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-sm">
                  <div className="aspect-w-16  aspect-h-9 mb-4">
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
          
          {/* Navigation buttons */}
          <button 
            onClick={() => navigateProject('prev')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md z-10"
          >
            <ChevronLeft size={15} />
          </button>
          <button 
            onClick={() => navigateProject('next')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md z-10"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // desktop screen
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen pt-12">
      {/* Contenedor izquierdo - alineado al lado derecho y con altura ajustada */}
      <div className="hidden md:flex md:flex-1 md:w-[20%] items-center justify-end">
        <div className="flex flex-col items-center justify-center h-[75vh]">
          <button
            onClick={() => navigateProject('prev')}
            className="mb-4 text-white hover:text-gray-200 transition-colors"
          >
            <ChevronUp size={32} />
          </button>
          <div className="flex flex-col items-center space-y-4 flex-1 justify-center">
            {projects.map((project, index) => (
              <Image
                key={project.id}
                src={project.images[0]}
                alt={project.title}
                width={96}
                height={96}
                onClick={() => setCurrentProjectIndex(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentProjectIndex ? 'scale-150 border-4 border-orange' : 'opacity-50 hover:opacity-75'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => navigateProject('next')}
            className="mt-4 text-white hover:text-gray-200 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Contenedor derecho */}
      <div id='CurrentProjectCard' className="md:w-3/4 flex flex-2 flex-col flex-wrap max-h-[75vh]">
        <div 
          className="flex-1 flex items-center justify-center p-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Contenedor blanco con contenido centrado */}
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-3xl flex-wrap">
            {/* Título y tipo centrados en pantallas medianas+ */}
            <div className="md:text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{projects[currentProjectIndex].title}</h1>
              <span className="text-sm text-gray-500 mb-4 block">{projects[currentProjectIndex].type}</span>
            </div>
            
            {/* Carrusel centrado en pantallas medianas+ */}
            <div id='ImageCarouselContainer' className='w-1/2 h-1/2 md:w-2/3 md:h-2/3 md:mx-auto mb-4'>
              <ImageCarousel images={projects[currentProjectIndex].images} />
            </div>
            
            <p className="text-gray-700 mb-4 mt-4 w-3/4 mx-auto">{projects[currentProjectIndex].description}</p>
            <a href={projects[currentProjectIndex].link} className='flex justify-center items-center' 
            target="_blank" rel="noopener noreferrer">
              <button className="bg-dark-orange text-white px-4 py-2 rounded hover:bg-dark-purple rounded-xl focus:outline-none focus:border-4 focus:border-orange transition-colors">
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