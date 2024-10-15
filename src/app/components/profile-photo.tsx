import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type TextBox = {
  text: string;
  angle: number;
};

interface CircularProfileProps {
  speed: number; // Nueva prop para controlar la velocidad
}

const CircularProfile: React.FC<CircularProfileProps> = ({ speed }) => {
  const [rotation, setRotation] = useState(0);
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

  const calculatePosition = (angle: number) => {
    const radian = ((angle + rotation) * Math.PI) / 180;
    return {
      transform: `rotate(${radian}rad) translateX(150px) rotate(-${radian}rad)`,
    };
  };

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <div className="absolute w-full h-full flex items-center justify-center">
        <Image
          src="/images/iox2.jpg"
          alt="ProfileImage"
          width={300}
          height={300}
          className="rounded-full "
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