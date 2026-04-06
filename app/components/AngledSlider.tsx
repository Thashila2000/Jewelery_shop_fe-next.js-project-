"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

const slides = [
  { id: 1, url: "/RingsCtag.JPG",      tag: "Rings",     name: "Solitaire Ring"    },
  { id: 2, url: "/NecklaceCtag.JPG",   tag: "Necklaces", name: "Diamond Pendant"   },
  { id: 3, url: "/EarringsCtag.WEBP",  tag: "Earrings",  name: "Pearl Drops"       },
  { id: 4, url: "/BraceletsCtag.WEBP", tag: "Bracelets", name: "Gold Cuff"          },
];

const CARD_W  = 240;
const CARD_H  = 300;
const GAP     = 28;
const ANGLE   = 18;   
const SPEED   = 38;   

const duplicated = [...slides, ...slides, ...slides];

function Card({ item }: { item: typeof slides[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        position: "relative",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        overflow: "hidden",
      }}
      animate={{
        rotateY: hovered ? 0 : ANGLE,
        scale:   hovered ? 1.06 : 1,
        z:       hovered ? 80 : 20,
        opacity: hovered ? 1 : 0.88,
      }}
      transition={{ type: "spring", mass: 2, stiffness: 380, damping: 45 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Image
        src={item.url}
        alt={item.name}
        fill
        className="object-cover"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.7s ease" }}
      />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,8,5,0.85) 0%, rgba(10,8,5,0.15) 50%, transparent 80%)",
      }} />

      {/* Gold border on hover */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        border: hovered ? "1px solid rgba(212,175,55,0.55)" : "1px solid transparent",
        boxShadow: hovered ? "0 0 28px rgba(212,175,55,0.12)" : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }} />

      {/* Info */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 18px", zIndex: 5,
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <span style={{
          display: "block",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 8, fontWeight: 300,
          letterSpacing: "0.45em", textTransform: "uppercase",
          color: "#d4af37", marginBottom: 5,
        }}>
          {item.tag}
        </span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, fontWeight: 300,
          color: "#fff", lineHeight: 1,
        }}>
          {item.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function AngledSlider() {
  const x          = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const animRef    = useRef<ReturnType<typeof animate> | null>(null);
  const loopWidth  = (CARD_W + GAP) * slides.length;

  useEffect(() => {
    if (paused) { animRef.current?.stop(); return; }

    const run = () => {
      const cur      = x.get();
      const remaining = loopWidth - Math.abs(cur % loopWidth);
      const duration  = SPEED * (remaining / loopWidth);

      animRef.current = animate(x, cur - remaining, {
        duration,
        ease: "linear",
        onComplete: () => { x.set(0); run(); },
      });
    };

    run();
    return () => animRef.current?.stop();
  }, [paused, loopWidth, x]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');
      `}</style>

      <section style={{ width: "100%", background: "#fff", padding: "60px 0 72px", overflow: "hidden" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span style={{
            display: "block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 300,
            letterSpacing: "0.6em", textTransform: "uppercase",
            color: "#b18d2b", marginBottom: 14,
          }}>
            Handcrafted Excellence
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5vw, 56px)",
            fontWeight: 300, lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#1a1a1a", margin: "0 0 16px",
          }}>
            Our{" "}
            <em style={{ fontStyle: "italic", color: "rgba(177,141,43,0.85)" }}>
              Collection
            </em>
          </h2>
          <div style={{
            height: 1, width: 64, margin: "0 auto",
            background: "linear-gradient(to right, transparent, #b18d2b, transparent)",
          }} />
        </div>

        {/* Track */}
        <div
          style={{ width: "100%", overflow: "hidden", position: "relative", height: CARD_H + 40, perspective: 1100 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          

          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              gap: GAP,
              paddingLeft: GAP,
              x,
              transformStyle: "preserve-3d",
            }}
          >
            {duplicated.map((item, i) => (
              <Card key={`${item.id}-${i}`} item={item} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}