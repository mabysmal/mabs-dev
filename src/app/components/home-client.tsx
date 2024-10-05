"use client";

import React, { useState } from "react";
import CircularProfile from "./profile-photo";
import PortfolioWheel from "./portfolio-wheel";


export default function HomeClient() {
  const [activeSection, setActiveSection] = useState("welcome");

  return (
    <div className="min-h-screen">
      <main className="flex flex-col">
        <section 
          id="welcome-banner" 
          className="h-screen flex items-center justify-center flex-col flex wrap bg-gradient-to-r from-black to-purple"
          onMouseEnter={() => setActiveSection("welcome")}
        >
          <CircularProfile></CircularProfile>
          <span className="pt-4 text-white text-xl">Hola, soy</span>
          <h1 className="pt-2 text-white text-8xl font-magic-retro">Mabel Castillo</h1>
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
          {/* <CircularProfile></CircularProfile> */}
        </section>
      </main>
    </div>
  );
}
