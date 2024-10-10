import React from "react";
import HomeClient from "./components/home-client"; // Importamos el componente cliente
import './globals.css';

export default function Home() {
  return (
    <main className='bg-wave'>
      
      <HomeClient />
      <footer className="h-20 bg-gray-200 flex items-center justify-center">
      <p>© 2023 Mabel Castillo</p>
      </footer>
    </main>
  );
}