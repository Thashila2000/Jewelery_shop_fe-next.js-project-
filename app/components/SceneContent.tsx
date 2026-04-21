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

    // Calculate progress (r) across the section height
    // r=0 (Start), r=0.5 (Middle/Slide 2), r=1 (End/Slide 3)
    let r = -rect.top / (sectionHeight - window.innerHeight);
    r = THREE.MathUtils.clamp(r, 0, 1);

    const isMobile = window.innerWidth < 768;
    const margin = 2.0;

    // --- MOBILE STEP LOGIC ---
    // We define three "Stop" points for the ring to rest at.
    // Slide 1: r=0 to 0.1
    // Slide 2: r=0.4 to 0.6
    // Slide 3: r=0.9 to 1.0
    
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;

    if (isMobile) {
      // POSITION CONSTANTS FOR MOBILE
      const pos1Y = 2.2;  // High (Top of screen for Slide 1)
      const pos2Y = 0.0;  // Center (Middle of screen for Slide 2)
      const pos3Y = -1.5; // Low (Bottom half for Slide 3)

      const scale1 = 0.55;
      const scale2 = 0.75;
      const scale3 = 0.65;

      if (r < 0.33) {
        // --- SLIDE 1 AREA ---
        // Progress within first third (0 to 1)
        const p1 = THREE.MathUtils.smoothstep(r, 0, 0.2); 
        targetY = pos1Y;
        targetScale = scale1;
      } else if (r >= 0.33 && r < 0.66) {
        // --- TRANSITION TO SLIDE 2 ---
        const p2 = THREE.MathUtils.smoothstep(r, 0.33, 0.45);
        targetY = THREE.MathUtils.lerp(pos1Y, pos2Y, p2);
        targetScale = THREE.MathUtils.lerp(scale1, scale2, p2);
      } else {
        // --- TRANSITION TO SLIDE 3 ---
        const p3 = THREE.MathUtils.smoothstep(r, 0.66, 0.85);
        targetY = THREE.MathUtils.lerp(pos2Y, pos3Y, p3);
        targetScale = THREE.MathUtils.lerp(scale2, scale3, p3);
      }
      
      // Floating animation only when active
      targetY += Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
      targetX = 0; // Always centered on mobile

    } else {
      // --- DESKTOP LOGIC (Original sliding behavior) ---
      const endX = (viewport.width / 2) - margin;
      const startX = -(viewport.width / 2) + margin;
      
      targetX = THREE.MathUtils.lerp(startX, endX, r);
      targetY = -1.2; 
      targetScale = THREE.MathUtils.lerp(0.6, 1.1, r);
    }

    // --- SMOOTH DAMPING ---
    const lerpSpeed = 2.5;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, lerpSpeed, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, lerpSpeed, delta);

    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, lerpSpeed, delta);
    groupRef.current.scale.set(s, s, s);

    // --- FADE & ROTATION ---
    const appearance = THREE.MathUtils.smoothstep(r, 0, 0.05);
    groupRef.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material) {
        obj.material.transparent = true;
        obj.material.opacity = appearance;
      }
    });

    // Elegant rotation: Combination of scroll progress and time
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      r * Math.PI * 4 + state.clock.getElapsedTime() * 0.2,
      1.5,
      delta
    );
    
    // Subtle tilt
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1,
      1.0,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <GoldRing />
    </group>
  );
}