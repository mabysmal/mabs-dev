'use client';

import React, { useState, useEffect } from 'react';
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
    id: 2,
    title: 'Macanazos',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  {
    id: 3,
    title: 'Macanazos',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  {
    id: 4,
    title: 'Macanazos',
    type: 'Retail Website',
    images: ['/images/macanazoslogo.png', '/images/macanazosland.png', '/images/macanazoscatalogo.png', '/images/macanazosorder.png', '/images/macanazosaboutus.png'],
    description: 'Website for the mexican store Macanazos, which sells their services of cartoons in a variety of mediums.'
  },
  // ... (otros proyectos)
];

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative pb-[100%] w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={images[currentImageIndex]}
            alt={`Project image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={prevImage}
          className="bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

interface PortfolioWheelProps {
  isActive: boolean;
}

const PortfolioWheel: React.FC<PortfolioWheelProps> = ({ isActive }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [wheelPosition, setWheelPosition] = useState(0);

  useEffect(() => {
    setSelectedProject(projects[wheelPosition]);
  }, [wheelPosition]);

  const navigateUp = () => {
    if (!isActive) return;
    setWheelPosition((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const navigateDown = () => {
    if (!isActive) return;
    setWheelPosition((prev) => (prev + 1) % projects.length);
  };

  const handleProjectClick = (index: number) => {
    if (!isActive) return;
    setWheelPosition(index);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <button
            onClick={navigateUp}
            className="mb-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronUp size={32} />
          </button>
          <div className="flex flex-col items-center space-y-4">
            {projects.map((project, index) => (
              <img
                key={project.id}
                src={project.images[0]}
                alt={project.title}
                onClick={() => handleProjectClick(index)}
                className={`w-24 h-24 rounded-full transition-all duration-300 cursor-pointer ${
                  index === wheelPosition ? 'scale-150 border-4 border-blue-500' : 'opacity-50 hover:opacity-75'
                }`}
              />
            ))}
          </div>
          <button
            onClick={navigateDown}
            className="mt-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2">{selectedProject.title}</h1>
          <span className="text-sm text-gray-500 mb-4 block">{selectedProject.type}</span>
          <ImageCarousel images={selectedProject.images.slice(1)} />
          <p className="text-gray-700 mb-4 mt-4">{selectedProject.description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioWheel;