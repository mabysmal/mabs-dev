import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  messages: string[];
  className: string;
  typeSpeed: number;
  deleteSpeed: number;
  pauseDuration: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  messages,
  className,
  typeSpeed,
  deleteSpeed,
  pauseDuration,
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const animateText = () => {
      const currentMessage = messages[messageIndex];
      
      if (!isDeleting && currentText !== currentMessage) {
        setCurrentText(currentMessage.slice(0, currentText.length + 1));
        timer = setTimeout(animateText, typeSpeed);
      } else if (isDeleting && currentText !== '') {
        setCurrentText(currentText.slice(0, -1));
        timer = setTimeout(animateText, deleteSpeed);
      } else if (currentText === currentMessage && !isDeleting) {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (currentText === '' && isDeleting) {
        setIsDeleting(false);
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        timer = setTimeout(animateText, typeSpeed);
      }
    };

    timer = setTimeout(animateText, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, messageIndex, messages, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <div className={`pt-8 flex items-center ${className}`}>
      <div className="flex">
        <span>{currentText}</span>
        <style jsx>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .blink-cursor {
            animation: blink 1s step-end infinite;
            margin-left: 2px;
          }
        `}</style>
        <span className="blink-cursor">|</span>
      </div>
    </div>
  );
};

export default AnimatedText;
