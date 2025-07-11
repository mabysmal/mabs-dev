'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageCarousel from './imagecarousel';

// Definir el tipo de proyecto
interface Project {
  id: number;
  title: string;
  type: string;
  tools: string[];
  images: string[];
  description: string;
  link: string;
}

// Definir categorías
type CategoryType = 'webdev' | 'graphicdesign' 
// | 'photography';

const webdevProjects: Project[] = [
  {
    id: 1,
    title: 'Amygo.ca',
    type: 'Biotechnology Website',
    tools: [ 'Next.js', 'TypeScript', 'Tailwind CSS', 'Google Analytics',  'SEO', 'CMS', 'Google Workspace' ],
    images: ['/images/amygo logo.png', '/images/amygo 1.png', '/images/amygo 2.png', '/images/amygo 3.png', '/images/amygo 4.png', '/images/amygo 5.png', '/images/amygo 6.png'],
    description: 'Website for for the medical company Amygo Biotechnologies Inc.',
    link: 'https://amygo.ca'
  },
  {
    id: 2,
    title: 'Netushi',
    type: 'Restaurant Website',
    tools: [ 'Next.js', 'TypeScript', 'Tailwind CSS', 'SEO', 'CMS', 'Figma' ],
    images: ['/images/netushi logo.png', '/images/netushi 1.png', '/images/netushi 2.png', '/images/netushi 3.png', '/images/netushi 4.png', '/images/netushi 5.png'],
    description: 'Website for the Monterrey-style sushi restaurant Netushi.',
    link: 'https://netushi.com/'
  },
  {
    id: 3,
    title: 'Macanazos',
    type: 'Retail Website',
    tools: [ 'Next.js', 'Google Analytics', 'Google Business','TypeScript', 'Tailwind CSS', 'SEO', 'CMS', 'Adobe Illustrator', 'Figma'],
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of personalized cartoons in a variety of mediums.',
    link: 'https://macanazos.memaxo.art/'
  },
  {
    id: 4,
    title: 'Recetas Mabs',
    type: 'Cooking Website',
    tools: ['HTML', 'CSS', 'JavaScript'],
    images: ['/images/recetasimg.jpg', '/images/recetashome.png', '/images/recetashome2.png', '/images/recetasrecetas.png', '/images/recetasrecetas2.png'],
    description: 'A website for recipes from my family and friends. A personal project that made me closer to the people I love through cooking.',
    link: 'https://recetas.mabs.dev/'
  }
];

const graphicDesignProjects: Project[] = [
  {
    id: 5,
    title: 'Logo Redesign and Business Cards Design',
    type: 'Branding',
    tools: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'],
    images: ['/images/amygo logo.png','/images/GD/AMYGOBACK.png', '/images/GD/AMYGOFRONT.png'],
    description: 'Logo and Business Cards designed for the medical company Amygo Biotechnologies Inc.',
    link: 'https://www.behance.net/mabelcastillo'
  },
  {
    id: 6,
    title: 'Posts for Fall Out Boy Dreamers',
    type: 'Editorial Design',
    tools: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'],
    images: ['/images/FOBDreamerslogo.jpg', '/images/FOBDreamersWP.jpeg', '/images/FOBDreamersHorario.jpg', '/images/FOBDreamersFreebies.jpg', '/images/FOBDreamersPDCDMX.jpeg', '/images/FOBDreamersPD.jpg', '/images/FOBDreamersSeashell.jpeg', '/images/FOBDreamersGracias.jpg'],
    description: 'Posts made for the official mexican fanclub for Fall Out Boy showing announcements for both shows in Guadalajara and Mexico City.',
    link: 'https://www.facebook.com/fob.dreamers'
  },
  {
    id: 7,
    title: 'Internship in Institutional Communication Directorate of UANL',
    type: 'Graphic Design for Universidad Autónoma de Nuevo León ',
    tools: ['Adobe Photoshop', 'Adobe After Effects', 'Pro Tools', 'Google Workspace'],
    images: ['/images/GD/UANL.png', '/images/GD/INT2.png', '/images/GD/INT3.png', '/images/GD/INT5.png'],
    description: 'Edited video content for institutional communication and designed academic presentations for university staff and event.',
    link: 'www.linkedin.com/in/mabel-castillo-374482238'
  },
  {
    id: 8,
    title: 'Branding Material for The Monster Papas',
    type: 'Graphic Design and Commercial Photography',
    tools: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'],
    images: ['/images/GD/TheMonsterPapas.jpg', '/images/GD/TMPChorizo.png', '/images/GD/TMP1.png', '/images/GD/TMPAD.png', '/images/GD/TheMonsterPapas2.png','/images/GD/TMP9.png'],
    description: 'Food photography, menus, ads and tags for the local Monterrey-based restaurant The Monster Papas.',
    link: 'www.linkedin.com/in/mabel-castillo-374482238'
  }
];

// const photographyProjects: Project[] = [
//   {
//     id: 6,
//     title: 'Food Photography for The Monster Papas',
//     type: 'Commercial Photography',
//     tools: ['Canon 60D', 'Lightroom', 'Photoshop', 'Adobe Camera Raw'],
//     images: ['/images/food1.jpg'], // Añade tus imágenes reales aquí
//     description: 'Commercial food photography project for The Monster Papas restaurant chain.',
//     link: 'https://behance.net'
//   }
// ];

const categoryData = {
  webdev: { projects: webdevProjects, label: 'Web Development' },
  graphicdesign: { projects: graphicDesignProjects, label: 'Graphic Design' },
  // photography: { projects: photographyProjects, label: 'Photography' }
};

interface PortfolioProps {
  isActive: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ isActive }) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('webdev');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const currentProjects = categoryData[currentCategory].projects;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset project index when category changes
  useEffect(() => {
    setCurrentProjectIndex(0);
  }, [currentCategory]);

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!isActive) return;
    setCurrentProjectIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % currentProjects.length;
      } else {
        return (prev - 1 + currentProjects.length) % currentProjects.length;
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

  // Componente para el menú de categorías
  const CategoryMenu = () => (
    <div className="flex justify-center mb-4 mt-4 md: mb-12">
      <div className="flex bg-white bg-opacity-20 rounded-full p-1">
        {Object.entries(categoryData).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setCurrentCategory(key as CategoryType)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 md: text-lg ${
              currentCategory === key
                ? 'bg-white text-purple-600 shadow-md'
                : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
          >
            {data.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Componente para mostrar las herramientas
  const ToolsDisplay = ({ tools }: { tools: string[] }) => (
    <div className="flex flex-wrap gap-2 mb-3">
      {tools.map((tool, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-purple text-white font-bold text-xs rounded-full"
        >
          {tool}
        </span>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <CategoryMenu />
        <div className="text-sm text-center text-white p-2">
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
            {currentProjects.map((project, index) => (
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
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                  <ImageCarousel 
                    key={`${currentCategory}-${project.id}`} 
                    images={project.images} 
                  />

                  </div>
                  <h2 className="text-xl text-black font-semibold mb-2">{project.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{project.type}</p>
                  <ToolsDisplay tools={project.tools} />
                  <p className="text-sm text-black mb-4">{project.description}</p>
                  <a href={project.link} className="block">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full w-full">
                      Visit Project Page
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


  // Desktop version
return (
  <div className="flex flex-col w-screen h-screen pt-12">
    {/* Category Menu for Desktop - Siempre visible arriba */}
    <div className="w-full flex justify-center mb-6">
      <CategoryMenu />
    </div>

    {/* Contenedor principal con los proyectos */}
    <div className="flex flex-row flex-1">
      {/* Contenedor izquierdo */}
      <div className="hidden md:flex md:flex-1 md:w-[20%] items-center justify-end">
        <div className="flex flex-col items-center justify-center h-[65vh]">
          <button
            onClick={() => navigateProject('prev')}
            className="mb-4 text-white hover:text-gray-200 transition-colors"
          >
            <ChevronUp size={32} />
          </button>
          <div className="flex flex-col items-center space-y-4 flex-1 justify-center">
            {currentProjects.map((project, index) => (
              <Image
                key={project.id}
                src={project.images[0]}
                alt={project.title}
                width={80}
                height={80}
                onClick={() => setCurrentProjectIndex(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentProjectIndex 
                    ? 'scale-150 border-4 border-orange' 
                    : 'opacity-50 hover:opacity-75'
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
      <div id='CurrentProjectCard' className="md:w-3/4 flex flex-2 flex-col flex-wrap max-h-[65vh]">
        <div
          className="flex-1 flex items-center justify-center p-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-3xl flex-wrap">
            <div className="md:text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {currentProjects[currentProjectIndex].title}
              </h1>
              <span className="text-sm text-gray-500 mb-4 block">
                {currentProjects[currentProjectIndex].type}
              </span>
              <div className="flex justify-center mb-4">
                <ToolsDisplay tools={currentProjects[currentProjectIndex].tools} />
              </div>
            </div>
            
            <div id='ImageCarouselContainer' className='w-1/2 h-1/2 md:w-2/3 md:h-2/3 md:mx-auto mb-4'>
            <ImageCarousel 
              key={`${currentCategory}-${currentProjects[currentProjectIndex].id}`}
              images={currentProjects[currentProjectIndex].images} 
            />
            </div>
            
            <p className="text-gray-700 mb-4 mt-4 w-3/4 mx-auto">
              {currentProjects[currentProjectIndex].description}
            </p>
            
            <div className='flex justify-center items-center'>
              <a 
                href={currentProjects[currentProjectIndex].link}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange hover:border-green-500 rounded-xl focus:outline-none focus:border-4 focus:bg-dark-purple transition-colors">
                  Visit Live Page
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Portfolio;
