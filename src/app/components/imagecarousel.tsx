'use client'
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length - 1) + 1);
  }, [isTransitioning, images.length]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextImage();
    }, 2000);

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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="relative pb-[100%] w-full">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {images.slice(1).map((image, index) => (
          <Image
            key={index + 1}
            src={image}
            alt={`Project image ${index + 2}`}
            layout="fill"
            objectFit="cover"
            className={`transition-opacity duration-1000 ${
              index + 1 === currentImageIndex
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;