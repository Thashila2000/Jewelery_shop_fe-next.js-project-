"use client";

import * as THREE from 'three';
import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame, ThreeElements, useThree } from '@react-three/fiber';
import { Torus, Environment, useEnvironment } from '@react-three/drei';
import gsap from 'gsap';

export default function GoldRing(props: ThreeElements['group']) {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  
  // Get viewport size to handle responsive scaling
  const { size } = useThree();

  // Determine scale based on width
  // Desktop (>1024px): 1
  // Tablet (768px - 1024px): 0.75 (Reduced)
  // Mobile (<768px): 1 (As per your request to keep it okay)
  const responsiveScale = useMemo(() => {
    if (size.width >= 768 && size.width <= 1024) {
      return 0.75; // Reduced size for Tablet
    }
    return 1; // Default for Desktop and Mobile
  }, [size.width]);

  const envMap = useEnvironment({
    files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr'
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ringRef.current) {
        gsap.from(ringRef.current.rotation, {
          x: Math.PI * 2,
          y: Math.PI * 2,
          duration: 2.5,
          ease: 'power3.out'
        });
      }

      if (materialRef.current) {
        gsap.from(materialRef.current, {
          roughness: 1,
          duration: 2,
          ease: 'expo.out'
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.2;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      ringRef.current.position.y = Math.sin(t * 1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
      
      <Environment map={envMap} />

      <Torus
        ref={ringRef}
        // Apply the responsive scale here
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        args={[1, 0.15, 32, 100]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={materialRef}
          color="#d4af37"
          metalness={1}
          roughness={0.02}
          envMapIntensity={2}
        />
      </Torus>
    </group>
  );
}