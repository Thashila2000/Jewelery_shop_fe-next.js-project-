"use client";

import Carousel from "./components/Carousel";
import AboutUsSection from "./components/AboutUsSection";
import AngledSlider from "./components/AngledSlider";

import SapphireBanner from "./components/SapphireBanner";

const jewelryCollection = [
  { id: 1, url: "/RingsCtag.JPG", title: "The Solitaire" },
  { id: 2, url: "/NecklaceCtag.JPG", title: "Liquid Gold" },
  { id: 3, url: "/EarringsCtag.WEBP", title: "Sculpted Studs" },
  { id: 4, url: "/BraceletsCtag.WEBP", title: "Modern Cuff" },
  { id: 5, url: "/RingsCtag.JPG", title: "Eternal Band" },
];

export default function Home() {
  return (
    
    <main className="w-full bg-white flex flex-col p-0 m-0 mt-20 md:mt-24">
      
      <section className="w-full h-fit relative z-30">
        <Carousel />
      </section>

      {/* About Section Container */}
      <div className="relative z-10 w-full bg-white"> 
        <AboutUsSection />
      </div>

      <AngledSlider/>
     
     
    
           <SapphireBanner/>
   
      
    </main>
  );
}