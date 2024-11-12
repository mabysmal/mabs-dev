import React, { useState } from 'react';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialNetworks = [
    { 
      name: 'Email', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-.41 2l-5.88 5.88a1 1 0 0 1-1.42 0L5.41 6ZM20 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.41l5.88 5.88a3 3 0 0 0 4.24 0L20 7.41Z"/>
        </svg>
      ),
      color: 'hover:bg-purple',
      link: 'mailto:contact@mabs.dev'
    },
    { 
      name: 'Whatsapp', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0za5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></g>
        </svg>
      ),
      color: 'hover:bg-purple',
      link: 'https://wa.me/+17785126749'
    },
    { 
      name: 'Behance', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.07 6.35H15v1.41h5.09ZM19 16.05a2.23 2.23 0 0 1-1.3.37a2.23 2.23 0 0 1-1.7-.54a2.5 2.5 0 0 1-.62-1.76H22a6.5 6.5 0 0 0-.17-2a5.1 5.1 0 0 0-.8-1.73a4.2 4.2 0 0 0-1.42-1.21a4.4 4.4 0 0 0-2-.45a4.9 4.9 0 0 0-1.9.37a4.5 4.5 0 0 0-1.47 1a4.4 4.4 0 0 0-.95 1.52a5.4 5.4 0 0 0-.33 1.91a5.5 5.5 0 0 0 .32 1.94a4.5 4.5 0 0 0 .88 1.53a4 4 0 0 0 1.46 1a5.2 5.2 0 0 0 1.94.34a4.77 4.77 0 0 0 2.64-.7a4.2 4.2 0 0 0 1.63-2.35h-2.21a1.54 1.54 0 0 1-.62.76m-3.43-4.12a1.87 1.87 0 0 1 1-1.14a2.3 2.3 0 0 1 1-.2a1.73 1.73 0 0 1 1.36.49a2.9 2.9 0 0 1 .63 1.45h-4.15a3 3 0 0 1 .11-.6Zm-5.29-.48a3.06 3.06 0 0 0 1.28-1a2.7 2.7 0 0 0 .43-1.58a3.3 3.3 0 0 0-.29-1.48a2.4 2.4 0 0 0-.82-1a3.2 3.2 0 0 0-1.27-.52a7.5 7.5 0 0 0-1.64-.16H2v12.58h6.1a6.6 6.6 0 0 0 1.65-.21a4.6 4.6 0 0 0 1.43-.65a3.1 3.1 0 0 0 1-1.14a3.4 3.4 0 0 0 .37-1.65a3.47 3.47 0 0 0-.57-2a3 3 0 0 0-1.75-1.19ZM4.77 7.86h2.59a4 4 0 0 1 .71.06a1.6 1.6 0 0 1 .61.22a1.05 1.05 0 0 1 .42.44a1.4 1.4 0 0 1 .16.72a1.36 1.36 0 0 1-.47 1.15a2 2 0 0 1-1.22.35h-2.8Zm4.84 7.44a1.3 1.3 0 0 1-.45.5a2 2 0 0 1-.65.26a3.3 3.3 0 0 1-.78.08h-3v-3.45h3a2.4 2.4 0 0 1 1.45.41a1.65 1.65 0 0 1 .54 1.39a1.8 1.8 0 0 1-.11.81"/>
        </svg>
      ),
      color: 'hover:bg-purple',
      link: 'https://www.behance.net/mabelcastillo'

    },
    { 
      name: 'Instagram', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"/></g>
        </svg>
      ),
      color: 'hover:bg-purple',
      link: 'https://www.instagram.com/mabs.audiovisual'
    }
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.contact-button-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block contact-button-container">
      {isOpen && (
        <div className="absolute bottom-full mb-2 w-48 rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
          <div className="py-1">
            {socialNetworks.map((network, index) => (
              <a
                key={index}
                href={network.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-white ${network.color} transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {network.icon}
                </div>
                <span>{network.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-6 py-2 text-dark-purple bg-white rounded-full border-2 border-dark-purple hover:bg-purple-gray  hover:text-white focus:bg-dark-purple focus:text-white focus:outline-none focus:border-4 focus:border-orange transition-colors duration-200"
      >
        <span>Contact Me</span>
      </button>
    </div>
  );
};

export default ContactButton;