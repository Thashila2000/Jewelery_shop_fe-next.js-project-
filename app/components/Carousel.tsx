"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Slide {
  src: string;
  text: string;
  sub: string;
}

const slides: Slide[] = [
  { src: "/hero1.JPG", text: "Discover Necklaces", sub: "Hand-selected diamonds" },
  { src: "/hero2.PNG", text: "Timeless Elegance", sub: "For your most precious moments" },
  { src: "/hero5.JPG", text: "Handcrafted Collections", sub: "Artistry in every detail" },
  { src: "/hero4.JPG", text: "Royal Legacy Designs", sub: "Wear your story" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkRes = () => setIsDesktop(window.innerWidth >= 768);
    checkRes();
    window.addEventListener("resize", checkRes);
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkRes);
    };
  }, []);

  return (
    <div 
      className="relative w-full aspect-video md:aspect-none overflow-hidden bg-black"
      style={isDesktop ? { height: '400px' } : {}} 
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 5 }}
            className="relative w-full h-full"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].text}
              fill
              className="object-cover object-center brightness-[0.7]"
              priority
            />
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {/* SUBTITLE: Increased from text-sm to md:text-lg */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#d4af37] text-xs md:text-lg font-medium uppercase tracking-[0.4em] mb-4"
            >
              {slides[index].sub}
            </motion.p>
            
            {/* MAIN TITLE: Increased from text-3xl to md:text-6xl */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-6xl font-serif italic text-white max-w-5xl leading-tight"
            >
              {slides[index].text}
            </motion.h1>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-500 rounded-full h-1 ${
              index === i ? "w-10 bg-[#d4af37]" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}