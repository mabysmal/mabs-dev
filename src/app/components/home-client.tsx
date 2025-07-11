"use client";

import React, { useState } from "react";
import CircularProfile from "./profile-photo";
import Portfolio from "./portfolio";
import { Poppins } from 'next/font/google';
import AnimatedText from "./typingtextanim";
import FloatingChevron from "./floating-down-chevron";
import ContactButton from "./contactmebutton";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '600'],
})


export default function HomeClient() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <div className="bg-wave min-h-screen pt-8">
      <main className="flex flex-col">
        <section 
          id="welcome-banner" 
          className=" h-screen flex items-center justify-center flex-col"
          onMouseEnter={() => setActiveSection("welcome")}
        >
          <CircularProfile speed={0.1} />
          <AnimatedText
            messages={["Hi, I'm", "Salut, je suis", "Hola, soy"]}
            className={`${poppins.className} py-2 text-white text-2xl text-center mt-4`}
            typeSpeed={100}
            deleteSpeed={10}
            pauseDuration={2000}
          />
          <h1 className="text-white text-8xl font-magic-retro glow animate-glow items-center justify-center text-center">
            Mabel Castillo
          </h1>
          {/* <span className="text-white text-sm mb-4 mx-8 md:font-bold text-center md:mx-64">
            I'm a front-end developer with a background in graphic design and audiovisual production. 
          </span>
          <span className="text-white text-sm hidden font-bold text-center md:mx-64 md:mb-8 md:flex">
            I love making beautiful and organized projects, cooking, and listening to Fall Out Boy.
          </span> */}
          <ContactButton></ContactButton>
          <div>
            <FloatingChevron className="bottom-4 flex flex-center justify-center"></FloatingChevron>
          </div>
        </section>

        
        <section 
          id="TopPortafolio" 
          className="w-full h-full"
          onMouseEnter={() => setActiveSection("portfolio")}
        >
          <Portfolio isActive={activeSection === "portfolio"}></Portfolio>
        </section>

        <footer className="min-h-screen">
          {/* Agregar CV aqui NO TE OLVIDES DE ESO WEY */}
        </footer>

        {/* <section 
          id="About Me" 
          className="h-screen flex items-center justify-center"
          onMouseEnter={() => setActiveSection("about")}
        >
          <h2 className="text-3xl font-semibold">About Me</h2>
        </section> */}

      
      </main>
    </div>
  );
}
