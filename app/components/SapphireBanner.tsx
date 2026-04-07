"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: EASE } },
});

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay, ease: EASE } },
});

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay, ease: EASE } },
});

const lineExpand = (delay = 0) => ({
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, delay, ease: EASE } },
});

export default function SapphireBanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=DM+Sans:wght@200;300;400&display=swap');

        .sap-cta { transition: all 0.4s ease; }
        .sap-cta:hover { background: #d4af37 !important; color: #08090f !important; border-color: #d4af37 !important; }

        /* MOBILE ONLY OVERRIDES - Horizontal Layout */
        @media (max-width: 768px) {
          .sap-grid { 
            flex-direction: row !important; 
            min-height: 200px !important; 
            height: 240px !important; 
          }
          
          .sap-img-panel { width: 40% !important; }
          .sap-text-panel { width: 60% !important; padding: 20px 15px !important; }
          
          /* Scale down for mobile horizontal space */
          .sap-eyebrow { font-size: 7px !important; margin-bottom: 6px !important; }
          .sap-title { font-size: 20px !important; margin-bottom: 4px !important; }
          .sap-subtitle { font-size: 11px !important; margin-bottom: 10px !important; }
          .sap-desc { display: none !important; } /* Hidden on mobile horizontal */
          .sap-divider { margin-bottom: 12px !important; width: 35px !important; }
          
          .sap-discount-badge { top: 12px !important; left: 12px !important; padding: 4px 10px !important; }
          .sap-discount-badge span:first-child { font-size: 18px !important; }
          .sap-discount-badge span:last-child { font-size: 5px !important; }
          
          .sap-cta { padding: 8px 16px !important; font-size: 8px !important; }
        }
      `}</style>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ width: "100%", background: "#08090f", overflow: "hidden", position: "relative" }}
      >
        <motion.div variants={lineExpand(0.2)} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #b18d2b, #d4af37, #b18d2b, transparent)", zIndex: 10 }} />

        <div className="sap-grid" style={{ display: "flex", minHeight: 500 }}>

          {/* LEFT: Image */}
          <motion.div
            className="sap-img-panel"
            variants={fadeLeft(0.1)}
            style={{ width: "42%", position: "relative", overflow: "hidden", background: "#0d0f1a" }}
          >
            <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to right, transparent 55%, #08090f 100%)" }} />
            
            <motion.div
              className="sap-discount-badge"
              variants={fadeUp(0.6)}
              style={{
                position: "absolute", top: 24, left: 24, zIndex: 5,
                background: "#d4af37", padding: "8px 14px",
                display: "flex", flexDirection: "column", alignItems: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 200, lineHeight: 1, color: "#08090f" }}>10%</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, fontWeight: 400, letterSpacing: "0.45em", textTransform: "uppercase", color: "#08090f" }}>OFF</span>
            </motion.div>

            <Image
              src="/SAPPHIRE-NECKLACE.jpg"
              alt="Blue Sapphire Necklace"
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              priority
            />
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            className="sap-text-panel"
            variants={fadeRight(0.2)}
            style={{
              width: "58%", padding: "60px 52px",
              display: "flex", flexDirection: "column", justifyContent: "center",
              position: "relative",
            }}
          >
            <motion.span className="sap-eyebrow" variants={fadeUp(0.4)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 300, letterSpacing: "0.65em", textTransform: "uppercase", color: "#b18d2b", display: "block", marginBottom: 12 }}>
              Limited Time Offer
            </motion.span>

            <motion.h2 className="sap-title" variants={fadeUp(0.5)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 64px)", fontWeight: 200, lineHeight: 0.95, color: "#f0ebe0", margin: "0 0 12px" }}>
              Sapphire <em style={{ fontStyle: "italic", color: "rgba(177,141,43,0.9)" }}>Necklaces</em>
            </motion.h2>

            <motion.p className="sap-subtitle" variants={fadeUp(0.6)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 24px)", fontWeight: 200, fontStyle: "italic", color: "rgba(130,170,235,0.88)", margin: "0 0 20px" }}>
              10% Off — This Season Only
            </motion.p>

            <motion.div className="sap-divider" variants={lineExpand(0.7)}
              style={{ height: 1, width: 60, marginBottom: 24, background: "linear-gradient(to right, #b18d2b, rgba(177,141,43,0.1))", transformOrigin: "left" }} />

            <motion.p className="sap-desc" variants={fadeUp(0.8)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(240,235,224,0.5)", lineHeight: 1.85, maxWidth: 420, marginBottom: 32 }}>
              Discover our curated sapphire necklace collection—each piece hand-set by master jewelers.
            </motion.p>

            <motion.div variants={fadeUp(0.9)} style={{ display: "flex" }}>
              <button
                className="sap-cta"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 400, letterSpacing: "0.4em", textTransform: "uppercase", color: "#f0ebe0", background: "transparent", border: "1px solid rgba(177,141,43,0.45)", padding: "12px 28px", cursor: "pointer", whiteSpace: "nowrap" }}
                onClick={() => window.location.href = "/collections/necklaces"}
              >
                Shop Collection
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div variants={lineExpand(0.3)} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #b18d2b, #d4af37, #b18d2b, transparent)", zIndex: 10 }} />
      </motion.section>
    </>
  );
}