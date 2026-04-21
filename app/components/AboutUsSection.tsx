"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import SceneContent from "./SceneContent";
import ParticlesBackground from "./PracticlesBackground";

export default function AboutUsSection() {
  return (
    <section
      id="about-section"
      // min-h-[500vh] is essential for mobile to provide "scroll distance"
      // md:min-h-[300vh] keeps the desktop scroll tighter
      className="w-full relative bg-white m-0 p-0 overflow-visible grid grid-cols-1 min-h-[500vh] md:min-h-[300vh]"
    >
      {/* 1. BACKGROUND & 3D LAYER (Sticky) */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none"
        style={{ gridArea: "1 / 1" }}
      >
        <div className="absolute inset-0 bg-white z-0" />
        <div
          className="absolute inset-0 opacity-40 z-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #f2f2f2 100%)`,
          }}
        />
        <ParticlesBackground />

        <Canvas
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.2]}
          camera={{ position: [0, 0, 12], fov: 35 }}
          style={{ width: "100%", height: "100%" }}
          gl={{
            antialias: true,
            toneMappingExposure: 1.1,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="apartment" />
            <ambientLight intensity={0.8} />
            <SceneContent />
            <ContactShadows opacity={0.15} scale={15} blur={3} position={[0, -3.5, 0]} frames={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. HTML CONTENT LAYER */}
      <div 
        className="relative z-20 w-full font-serif text-[#1a1a1a] pointer-events-none flex flex-col"
        style={{ gridArea: "1 / 1" }}
      >
        {/* SLIDE 1: OUR STORY 
            min-h-screen ensures it occupies the full first view.
            pb-[100vh] on mobile creates the gap where only the ring is visible.
        */}
        <div className="w-full min-h-screen flex flex-col justify-center px-10 md:px-32 pt-12 md:pt-0 pb-[100vh] md:pb-60">
          <div className="max-w-xl pointer-events-auto">
            <h2 className="text-[#b18d2b] text-xs uppercase tracking-[0.5em] mb-4 md:mb-6 font-sans">
              Our Story
            </h2>
            <h3 className="text-3xl md:text-5xl italic leading-[1.1] mb-6 md:mb-8">
              Crafted by <br /> Generations.
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-sans font-light">
              Founded in 2010, our atelier began with a single promise: to
              transform the world's finest metals.
            </p>
          </div>
        </div>

        {/* SLIDE 2: PHILOSOPHY 
            Using py-[100vh] on mobile creates gaps both above and below Slide 2.
        */}
        <div className="w-full min-h-screen flex flex-col justify-center items-end px-10 md:px-32 text-right py-[100vh] md:py-0 md:h-[70dvh]">
          <div className="max-w-xl pointer-events-auto">
            <h2 className="text-[#b18d2b] text-xs uppercase tracking-[0.5em] mb-4 md:mb-6 font-sans">
              Philosophy
            </h2>
            <h3 className="text-3xl md:text-5xl italic leading-[1.1] mb-6 md:mb-8">
              The Art of <br /> Precision.
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md ml-auto font-sans font-light">
              Every hand-set diamond is a testament to our master jewelers'
              obsession with perfection.
            </p>
          </div>
        </div>

        {/* SLIDE 3: FINAL CALL TO ACTION */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-10 pt-[50vh] pb-[100vh] md:pt-0 md:pb-0 md:h-[70dvh]">
          <div className="max-w-2xl pointer-events-auto">
            <h3 className="text-2xl md:text-4xl italic leading-tight mb-8">
              "Luxury is not a price tag, <br /> it is an experience."
            </h3>
            <button className="px-12 py-4 bg-[#1a1a1a] text-white text-xs uppercase tracking-[0.3em] hover:bg-[#b18d2b] transition-colors duration-500 font-sans cursor-pointer">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}