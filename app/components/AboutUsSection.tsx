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
      className="w-full relative bg-white m-0 p-0 overflow-visible grid grid-cols-1"
      style={{ minHeight: "250dvh" }}
    >
      {/* 1. BACKGROUND & 3D LAYER (Sticky) */}
      <div
        className="sticky top-0 w-full overflow-hidden pointer-events-none"
        style={{ gridArea: "1 / 1", height: "100dvh" }}
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
            <ContactShadows
              opacity={0.15}
              scale={15}
              blur={3}
              position={[0, -3.5, 0]}
              frames={1}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. HTML CONTENT LAYER */}
      <div
        className="relative z-20 w-full font-serif text-[#1a1a1a] pointer-events-none flex flex-col"
        style={{ gridArea: "1 / 1" }}
      >
        {/* SLIDE 1 */}
        <div
          className="w-full pointer-events-none flex flex-col justify-start md:justify-center"
          style={{
            height: "100dvh",
            paddingLeft:   "2.5rem",
            paddingRight:  "2.5rem",
            paddingTop:    "3rem",
            paddingBottom: "0",
          }}
        >
          <div className="md:px-20 max-w-xl pointer-events-auto">
            <h2 className="text-[#b18d2b] text-xs uppercase tracking-[0.5em] mb-4 font-sans">
              Our Story
            </h2>
            <h3 className="text-3xl md:text-5xl italic leading-[1.1] mb-6">
              Crafted by <br /> Generations.
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-sans font-light">
              Founded in 2010, our atelier began with a single promise: to
              transform the world's finest metals.
            </p>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div
          className="w-full pointer-events-none flex flex-col justify-center items-end text-right"
          style={{
            height: "100dvh",
            paddingLeft:  "2.5rem",
            paddingRight: "2.5rem",
          }}
        >
          <div className="md:px-20 max-w-xl pointer-events-auto">
            <h2 className="text-[#b18d2b] text-xs uppercase tracking-[0.5em] mb-4 font-sans">
              Philosophy
            </h2>
            <h3 className="text-3xl md:text-5xl italic leading-[1.1] mb-6">
              The Art of <br /> Precision.
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md ml-auto font-sans font-light">
              Every hand-set diamond is a testament to our master jewelers'
              obsession with perfection.
            </p>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div
          className="w-full pointer-events-none flex flex-col justify-center items-center text-center"
          style={{
            height: "100dvh",
            paddingLeft:  "2.5rem",
            paddingRight: "2.5rem",
          }}
        >
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
