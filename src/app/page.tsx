import Image from "next/image";
import CircularProfile from "./components/profile-photo";
import PortfolioWheel from "./components/portfolio-wheel";


export default function Home() {
  return (
    <div className="a">
      <main className="a">
        <section id="welcome-banner" className="flex flex-center justify-center">
          <h1>Hola, soy Mabel Castillo</h1>
        </section>

        <section id="TopPortafolio" className="">
          <PortfolioWheel></PortfolioWheel>
        </section>

        <section id="About Me">
          {/* <CircularProfile></CircularProfile> */}
        </section>
        
        
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
