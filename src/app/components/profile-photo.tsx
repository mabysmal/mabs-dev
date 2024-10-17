import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type TextBox = {
  text: string;
  angle: number;
};

interface CircularProfileProps {
  speed: number; 
}

const CircularProfile: React.FC<CircularProfileProps> = ({ speed }) => {
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const textBoxes: TextBox[] = [
    { text: 'programmer', angle: 0 },
    { text: 'photographer', angle: 120 },
    { text: 'graphic designer', angle: 240 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + speed) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    setIsMobile(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const calculatePosition = (angle: number) => {
    const radian = ((angle + rotation) * Math.PI) / 180;
    const translateX = isMobile ? 120 : 150;
    return {
      transform: `rotate(${radian}rad) translateX(${translateX}px) rotate(-${radian}rad)`,
    };
  };

  return (
    <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex items-center justify-center">
      <div className="absolute w-full h-full flex items-center justify-center">
        <Image
          src="/images/iox2.jpg"
          alt="ProfileImage"
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>
      {textBoxes.map((box, index) => (
        <div
          key={index}
          className="absolute flex items-center justify-center w-full h-full"
        >
          <div
            className="text-white font-bold text-sm bg-dark-purple bg-opacity-40 rounded-md px-2 py-1"
            style={calculatePosition(box.angle)}
          >
            {box.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CircularProfile;