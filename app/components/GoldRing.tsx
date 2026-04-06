"use client";



import * as THREE from 'three';

import React, { useRef, useLayoutEffect } from 'react';

import { useFrame, GroupProps } from '@react-three/fiber';

import { Torus, Environment, useEnvironment } from '@react-three/drei';

import gsap from 'gsap';



// Extending GroupProps allows you to pass 'scale', 'position', etc. from page.tsx

export default function GoldRing(props: GroupProps) {

  const ringRef = useRef<THREE.Mesh>(null!);

  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);



  // 1. High-quality environment map for realistic gold reflections

  const envMap = useEnvironment({

    files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr'

  });



  // 2. GSAP Entrance Animation

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      // Entrance: Spin the ring into view

      gsap.from(ringRef.current.rotation, {

        x: Math.PI * 2,

        y: Math.PI * 2,

        duration: 2.5,

        ease: 'power3.out'

      });



      // Material: Transition from matte to high-shine luxury

      gsap.from(materialRef.current, {

        roughness: 1,

        duration: 2,

        ease: 'expo.out'

      });

    });



    return () => ctx.revert(); // Cleanup GSAP on unmount

  }, []);



  // 3. Three.js Idle Animation (Procedural Floating)

  useFrame((state) => {

    const t = state.clock.getElapsedTime();

   

    // Slow, luxurious rotation

    ringRef.current.rotation.y = t * 0.2;

    ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;

   

    // Gentle vertical float

    ringRef.current.position.y = Math.sin(t * 1) * 0.1;

  });



  return (

    // Spreading 'props' here allows scale={2} from Home.tsx to work

    <group {...props}>

      {/* Lights specific to the ring's highlights */}

      <ambientLight intensity={0.5} />

      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

     

      {/* Environmental reflections are the secret to realistic metal */}

      <Environment map={envMap} />



      <Torus

        ref={ringRef}

        args={[1, 0.15, 32, 100]} // radius, tube thickness, segments

        castShadow

        receiveShadow

      >

        <meshStandardMaterial

          ref={materialRef}

          color="#d4af37"      // 18k Gold Hex

          metalness={1}        // Makes it behave like metal

          roughness={0.02}     // Smooth polished finish

          envMapIntensity={2}  // Amplifies the reflection brightness

        />

      </Torus>

    </group>

  );

} 