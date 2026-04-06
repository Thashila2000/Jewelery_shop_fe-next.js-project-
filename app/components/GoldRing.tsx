"use client";

import * as THREE from 'three';
import React, { useRef, useLayoutEffect } from 'react';
// 1. Changed GroupProps to ThreeElements
import { useFrame, ThreeElements } from '@react-three/fiber';
import { Torus, Environment, useEnvironment } from '@react-three/drei';
import gsap from 'gsap';

// 2. Use ThreeElements['group'] to define the props
export default function GoldRing(props: ThreeElements['group']) {
  // Use 'any' or 'THREE.Group' for the group ref if passing props to it
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

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