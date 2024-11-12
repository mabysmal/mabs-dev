import React from "react";
import HomeClient from "./components/home-client"; // Importamos el componente cliente
import './globals.css';


export default function Home() {
  return (
    <main className=''>
      
     
      <HomeClient />
      <footer className="h-20 bg-black text-white flex items-center justify-center">
      <p>© 2024 Mabel Castillo</p>
      </footer>
    </main>
  );
}