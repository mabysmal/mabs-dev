"use client";

import React, { useState } from "react";
import CircularProfile from "./profile-photo";
import PortfolioWheel from "./portfolio-wheel";
import { Poppins } from 'next/font/google';
import AnimatedText from "./typingtextanim";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '600'],
})

export default function HomeClient() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <div className="bg-wave min-h-screen">
      <main className="flex flex-col">
        <section 
          id="welcome-banner" 
          className=" h-screen flex items-center justify-center flex-col"
          onMouseEnter={() => setActiveSection("welcome")}
        >
          <CircularProfile
          speed={0.1} />
          <AnimatedText
          messages={["Hi, I'm", "Salut, je suis", "Hola, soy"]}
          className={`${poppins.className} py-4 text-white text-2xl text-center `}
          typeSpeed={100}
          deleteSpeed={10}
          pauseDuration={2000}
          >

          </AnimatedText>
          <h1 className="pt-2 text-white text-8xl font-magic-retro glow animate-glow items-center justify-center text-center">
            Mabel Castillo
          </h1>
        </section>

        
        <section 
          id="TopPortafolio" 
          className="h-screen"
          onMouseEnter={() => setActiveSection("portfolio")}
        >
          <PortfolioWheel isActive={activeSection === "portfolio"}></PortfolioWheel>
        </section>

        <section 
          id="About Me" 
          className="h-screen flex items-center justify-center"
          onMouseEnter={() => setActiveSection("about")}
        >
          <h2 className="text-3xl font-semibold">About Me</h2>
        </section>
      </main>
    </div>
  );
}
