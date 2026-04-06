"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import GoldRing from "./GoldRing";

export default function SceneContent() {
  const groupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const section = document.getElementById("about-section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    
    let r = -rect.top / (sectionHeight - window.innerHeight);
    r = THREE.MathUtils.clamp(r, 0, 1);

    const isMobile = window.innerWidth < 768;

    // --- RESPONSIVE COORDINATES ---
    const margin = 2.0; 
    const endX = (viewport.width / 2) - margin;

    // --- HEIGHT TUNING ---
    const initialY = isMobile ? 0.8 : 0; // High on screen at start
    
    // finalY is Slide 3 position. 
    // On mobile, -1.5 or lower usually puts it in the bottom half of the screen (under buttons)
    const finalY = isMobile ? -1.2 : 1.2; 

    let targetX, targetY, targetScale;

    if (r <= 0.66) {
      const movementProgress = r / 0.66; 
      
      targetX = isMobile 
        ? 0 
        : THREE.MathUtils.lerp(-(viewport.width / 2) + margin, endX, movementProgress);
        
      targetY = THREE.MathUtils.lerp(initialY, finalY, movementProgress);
      targetScale = THREE.MathUtils.lerp(isMobile ? 0.4 : 0.6, isMobile ? 0.65 : 1.1, movementProgress);
    } else {
      // Slide 3: PINNED
      targetX = isMobile ? 0 : endX; 
      targetY = finalY; 
      targetScale = isMobile ? 0.65 : 1.1;
    }

    // --- APPLY SMOOTH DAMPING ---
    // Increased damping speed (from 2.5 to 3.5) for better "snapping" to the button area
    const lerpSpeed = 1.5;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, lerpSpeed, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, lerpSpeed, delta);
    
    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, lerpSpeed, delta);
    groupRef.current.scale.set(s, s, s);

    // --- FADE & ROTATION ---
    const appearance = THREE.MathUtils.smoothstep(r, 0, 0.1);
    groupRef.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material) {
        obj.material.transparent = true;
        obj.material.opacity = appearance;
      }
    });

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      r * Math.PI * 2 + state.clock.getElapsedTime() * 0.2,
      2,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <GoldRing />
    </group>
  );
}