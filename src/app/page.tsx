import React from "react";
import HomeClient from "./components/home-client"; // Importamos el componente cliente
import './globals.css';
import MobileProjectCarousel from "./components/mobile-portfolio";

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


export default function Home() {
  return (
    <main className=''>
      
      <HomeClient />
      <footer className="h-20 bg-gray-200 flex items-center justify-center">
      <p>© 2023 Mabel Castillo</p>
      </footer>
    </main>
  );
}