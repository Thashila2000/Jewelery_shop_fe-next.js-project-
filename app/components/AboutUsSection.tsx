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
      className="w-full h-[220dvh] relative bg-white m-0 p-0 overflow-visible"
    >
      
      {/* 1. MASTER BACKGROUND WRAPPER (Spans 220dvh) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#ffffff]" />
        
        {/* Radial Gradient */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #f2f2f2 100%)`
          }}
        />

        {/* STICKY PARTICLES */}
        <div className="sticky top-0 h-[100dvh] w-full">
          <ParticlesBackground />
        </div>
      </div>

      {/* 2. STICKY 3D LAYER (z-10) */}
      <div className="sticky top-0 h-[100dvh] w-full z-10 overflow-hidden pointer-events-none">
        <Canvas
          // 1. Correct Shadow Type for Three.js 0.183
          shadows={{ type: THREE.PCFShadowMap }}
          // 2. Cap resolution at 1.2 to stop the 131ms GSAP violation
          dpr={[1, 1.2]}
          camera={{ position: [0, 0, 12], fov: 35 }}
          style={{ width: "100%", height: "100%" }}
          gl={{
            antialias: true,
            toneMappingExposure: 1.1,
            // 3. Forces the browser to prioritize the GPU for this Canvas
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="apartment" />
            <ambientLight intensity={0.8} />
            <spotLight 
              position={[5, 10, 10]} 
              angle={0.15} 
              intensity={5} 
              color="#ffffff" 
              castShadow 
              shadow-mapSize={[512, 512]}
            />
            <pointLight position={[-10, 5, 5]} intensity={3} color="#fff" />
            
            <SceneContent />
            
            {/* 4. CRITICAL: frames={1} stops the shadow from re-rendering 60fps.
                This is the only way to fix the GSAP-core violation. */}
            <ContactShadows 
              opacity={0.15} 
              scale={15} 
              blur={3} 
              position={[0, -3.5, 0]} 
              color="#000000" 
              resolution={256}
              frames={1} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. HTML CONTENT LAYER (z-20) */}
      <div className="relative z-20 w-full font-serif text-[#1a1a1a] pointer-events-none mt-[-100dvh]">
        
        {/* SLIDE 1 */}
        <div className="h-[60dvh] md:h-[70dvh] flex flex-col justify-center px-10 md:px-32">
          <div className="max-w-xl pointer-events-auto">
            <h2 className="text-[#b18d2b] text-xs uppercase tracking-[0.5em] mb-4 md:mb-6 font-sans">Our Story</h2>
            <h3 className="text-3xl md:text-5xl italic leading-[1.1] mb-6 md:mb-8">Crafted by <br /> Generations.</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-sans font-light">
              Founded in 2010, our atelier began with a single promise: to transform the world's finest metals.
            </p>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="h-[60dvh] md:h-[70dvh] flex flex-col justify-center items-end px-10 md:px-32 text-right">
          <div className="max-w-xl pointer-events-auto">
            <h2 className="text-[#b18d2b] text-xs uppercase tracking-[0.5em] mb-4 md:mb-6 font-sans">Philosophy</h2>
            <h3 className="text-3xl md:text-5xl italic leading-[1.1] mb-6 md:mb-8">The Art of <br /> Precision.</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md ml-auto font-sans font-light">
              Every hand-set diamond is a testament to our master jewelers' obsession with perfection.
            </p>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="h-[80dvh] flex flex-col justify-center items-center text-center px-10">
          <div className="max-w-2xl pointer-events-auto">
            <h3 className="text-2xl md:text-4xl italic leading-tight mb-8">
              "Luxury is not a price tag, <br /> it is an experience."
            </h3>
            <button className="px-12 py-4 bg-[#1a1a1a] text-white text-xs uppercase tracking-[0.3em] hover:bg-[#b18d2b] transition-colors duration-500 font-sans pointer-events-auto">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}