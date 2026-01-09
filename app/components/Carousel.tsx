"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { src: "/hero1.jpg", text: "Discover Necklaces" },
  { src: "/hero2.png", text: "Timeless Elegance" },
  { src: "/hero5.jpg", text: "Handcrafted Collections" },
  { src: "/hero4.jpg", text: "Royal Legacy Designs" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slides[index].src}
            alt={slides[index].text}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

     {/* Overlay text */}
    <div className="absolute inset-0 flex items-center justify-start bg-black/30 px-8">
       <h1 className="text-5xl md:text-5xl font-bold text-white drop-shadow">
         {slides[index].text}
       </h1>
     </div>

    </div>
  );
}
