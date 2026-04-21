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
    const scrollable = rect.height - window.innerHeight;
    let r = scrollable > 0 ? -rect.top / scrollable : 0;
    r = THREE.MathUtils.clamp(r, 0, 1);

    const isMobile = window.innerWidth < 768;
    const margin = 2.0;

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;

    if (isMobile) {
      const pos1Y =  0.0;   // centre — ring appears in middle of screen on slide 1
      const pos2Y =  0.5;   // slightly up for slide 2
      const pos3Y = -0.8;   // lower for slide 3

      const scale1 = 0.60;
      const scale2 = 0.68;
      const scale3 = 0.55;

      if (r < 0.33) {
        const p = THREE.MathUtils.smoothstep(r, 0, 0.25);
        targetY     = THREE.MathUtils.lerp(pos1Y - 0.5, pos1Y, p);
        targetScale = scale1;
      } else if (r < 0.66) {
        const p = THREE.MathUtils.smoothstep(r, 0.33, 0.55);
        targetY     = THREE.MathUtils.lerp(pos1Y, pos2Y, p);
        targetScale = THREE.MathUtils.lerp(scale1, scale2, p);
      } else {
        const p = THREE.MathUtils.smoothstep(r, 0.66, 0.85);
        targetY     = THREE.MathUtils.lerp(pos2Y, pos3Y, p);
        targetScale = THREE.MathUtils.lerp(scale2, scale3, p);
      }

      targetY += Math.sin(state.clock.getElapsedTime() * 0.8) * 0.12;
      targetX = 0;

    } else {
      // Desktop — untouched
      const endX   =  (viewport.width / 2) - margin;
      const startX = -(viewport.width / 2) + margin;
      targetX     = THREE.MathUtils.lerp(startX, endX, r);
      targetY     = -1.2;
      targetScale = THREE.MathUtils.lerp(0.6, 1.1, r);
    }

    const lerpSpeed = 2.5;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, lerpSpeed, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, lerpSpeed, delta);

    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, lerpSpeed, delta);
    groupRef.current.scale.set(s, s, s);

    // Mobile: hidden at r=0, fades in quickly as user starts scrolling
    // Desktop: original fade-in behaviour
    const appearance = isMobile
      ? THREE.MathUtils.smoothstep(r, 0, 0.08)
      : THREE.MathUtils.smoothstep(r, 0, 0.05);

    groupRef.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material) {
        obj.material.transparent = true;
        obj.material.opacity = appearance;
      }
    });

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      r * Math.PI * 4 + state.clock.getElapsedTime() * 0.2,
      1.5,
      delta
    );

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
