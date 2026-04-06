"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Rings",
    tagline: "The Signature Series",
    description: "Eternal symbols of devotion, from architectural solitaires to intricate pavé bands.",
    image: "/RingsCtag.jpg",
    href: "/collections/rings",
    featured: true,
  },
  {
    id: 2,
    name: "Necklaces",
    tagline: "Liquid Light",
    description: "Chains and pendants crafted to catch the light at every movement.",
    image: "/NecklaceCtag.jpg",
    href: "/collections/necklaces",
    featured: false,
  },
  {
    id: 3,
    name: "Earrings",
    tagline: "Sculpted Radiance",
    description: "From minimalist studs to high-drama drops.",
    image: "/EarringsCtag.webp",
    href: "/collections/earrings",
    featured: false,
  },
  {
    id: 4,
    name: "Bracelets",
    tagline: "Wrist Couture",
    description: "Bangles and cuffs designed for effortless stacking.",
    image: "/BraceletsCtag.webp",
    href: "/collections/bracelets",
    featured: false,
  },
];

export default function CollectionsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@200;400;500&display=swap');

        .col-page { background: #ffffff; min-height: 100vh; color: #1a1a1a; padding-top: 40px; overflow-x: hidden; }

        /* Header */
        .col-header { text-align: center; padding: 60px 24px 70px; position: relative; }
        
        /* BOLD CINEMATIC HEADER - FONT WEIGHT 500 */
        .col-title { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: clamp(48px, 6vw, 72px); 
          font-weight: 500; 
          line-height: 0.9; 
          letter-spacing: -0.01em; 
          color: #1a1a1a; 
          margin-bottom: 24px;
        }
        .col-title em { font-style: italic; color: #b18d2b; font-weight: 500; }
        
        .col-divider { height: 2px; width: 80px; margin: 0 auto 32px; background: #b18d2b; }
        
        .col-subtitle { 
          font-family: 'DM Sans', sans-serif; 
          font-size: 14px; 
          font-weight: 500; 
          color: #444444; 
          line-height: 1.8; 
          letter-spacing: 0.12em; 
          max-width: 500px; 
          margin: 0 auto; 
          text-transform: uppercase;
        }

        /* Grid */
        .col-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 1440px; margin: 0 auto; padding: 0 32px 100px; }
        .col-grid-rows { grid-auto-rows: 320px; }
        .col-featured { grid-column: span 2; grid-row: span 2; }

        /* Card */
        .col-card { position: relative; overflow: hidden; background: #f7f7f7; cursor: pointer; border-radius: 2px; height: 100%; }
        .col-card-img { position: absolute; inset: 0; z-index: 1; }
        .col-card-img img { width: 100%; height: 100%; object-fit: cover; }
        
        .col-card-vignette { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); z-index: 2; pointer-events: none; }

        .col-border-top { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #b18d2b; z-index: 5; }
        .col-border-bot { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #b18d2b; z-index: 5; }

        .col-index { position: absolute; top: 24px; left: 28px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.2em; color: #ffffff; opacity: 0.8; z-index: 10; }

        /* Content */
        .col-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 40px; z-index: 10; }
        .col-tagline { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.5em; text-transform: uppercase; color: #d4af37; display: block; margin-bottom: 8px; }
        
        /* INCREASED FONT WEIGHT FOR CARD TITLES */
        .col-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 3vw, 48px); font-weight: 500; line-height: 1; letter-spacing: -0.01em; color: #ffffff; margin-bottom: 12px; }
        
        .col-desc { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.9); line-height: 1.7; letter-spacing: 0.03em; max-width: 280px; margin-bottom: 24px; }

        /* Button */
        .col-btn { display: inline-flex; align-items: center; gap: 10px; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #ffffff; background: #b18d2b; border: none; padding: 14px 28px; cursor: pointer; transition: background 0.3s ease; }
        .col-btn:hover { background: #d4af37; }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .col-page { padding-top: 20px; margin-top: 60px; }
          .col-header { padding: 40px 20px 40px; }
          .col-grid { grid-template-columns: 1fr; padding: 0 16px 80px; gap: 20px; }
          .col-grid-rows { grid-auto-rows: 450px; }
          .col-featured { grid-column: span 1; grid-row: span 1; }
          .col-content { padding: 30px; }
          .col-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="col-page">
        <motion.header 
          className="col-header"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="col-title">Our <em>Collections</em></h1>
          <motion.div 
            className="col-divider"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="col-subtitle">
            Handcrafted Masterpieces curated for the modern era
          </p>
        </motion.header>

        <div className="col-grid col-grid-rows">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className={`col-card ${cat.featured ? "col-featured" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => (window.location.href = cat.href)}
            >
              <div className="col-card-img">
                <motion.img 
                  src={cat.image} 
                  alt={cat.name} 
                  animate={{ 
                    scale: hoveredId === cat.id ? 1.08 : 1,
                    filter: hoveredId === cat.id ? "brightness(0.5)" : "brightness(1)"
                  }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>

              <div className="col-card-vignette" />

              <motion.div 
                className="col-border-top" 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredId === cat.id ? 1 : 0 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div 
                className="col-border-bot" 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredId === cat.id ? 1 : 0 }}
                style={{ transformOrigin: "right" }}
              />

              <span className="col-index">0{idx + 1}</span>

              <div className="col-content">
                <motion.span 
                  className="col-tagline"
                  animate={{ y: hoveredId === cat.id ? -5 : 0 }}
                >
                  {cat.tagline}
                </motion.span>
                
                <h2 className="col-name">{cat.name}</h2>
                
                <AnimatePresence>
                  {(hoveredId === cat.id || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="col-desc">{cat.description}</p>
                      <button
                        className="col-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = cat.href;
                        }}
                      >
                        <span>View Collection</span>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                          <path
                            d="M1 5h12M9 1l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}