'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type TextBox = {
  text: string;
  initialPosition: { top: string; left: string };
};

const CircularProfile: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const textBoxes: TextBox[] = [
    { text: 'programmer', initialPosition: { top: '10%', left: '0%' } },
    { text: 'photographer', initialPosition: { top: '50%', left: '85%' } },
    { text: 'graphic designer', initialPosition: { top: '85%', left: '10%' } },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Image
          src="/images/iox2.jpg"
          alt="Profile"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {textBoxes.map((box, index) => (
        <div
          key={index}
          className="absolute bg-white px-2 py-1 rounded-md shadow-md text-sm"
          style={{
            top: `calc(${box.initialPosition.top} + ${scrollY * 0.2}px)`,
            left: box.initialPosition.left,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.1s ease-out',
          }}
        >
          {box.text}
        </div>
      ))}
    </div>
  );
};

export default CircularProfile;