"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08,      // Lower = Smoother/Heavier (0.05 to 0.1 is the sweet spot)
        duration: 1.5,  // How long the "slide" lasts in seconds
        smoothWheel: true,
        wheelMultiplier: 1, 
        touchMultiplier: 2, 
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}