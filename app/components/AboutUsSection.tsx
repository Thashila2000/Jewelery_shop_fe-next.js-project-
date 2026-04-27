"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ── REVEAL WRAPPER ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutStorySection() {
  const { scrollYProgress } = useScroll();
  // Adjusting parallax for the floating image
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -140]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');

        .story-section {
          background: #ffffff;
          padding: clamp(100px, 15vw, 180px) 0;
          overflow: hidden;
        }

        .story-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(24px, 6vw, 80px);
        }

        /* ── MATCHED HEADING STYLE ── */
        .section-header {
          text-align: center;
          margin-bottom: clamp(60px, 10vw, 120px);
        }

        .about-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 0.6em;
          text-transform: uppercase;
          color: #b18d2b;
          margin-bottom: 14px;
        }

        .about-main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(46px, 8vw, 72px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin: 0 0 16px;
        }

        .about-main-title em {
          font-style: italic;
          color: rgba(177,141,43,0.85);
        }

        .title-divider {
          height: 1px;
          width: 64px;
          margin: 0 auto;
          background: linear-gradient(to right, transparent, #b18d2b, transparent);
        }

        /* ── GRID CONTENT ── */
        .story-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: clamp(60px, 8vw, 120px);
        }

        .story-visuals {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .story-main-img {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          z-index: 2;
          overflow: hidden;
          background: #faf9f6;
        }

        .story-floating-img {
          position: absolute;
          bottom: -160px; /* Pushed down to clear the workshop image */
          right: -30px;
          width: 50%;
          aspect-ratio: 1/1;
          z-index: 3;
          overflow: hidden;
          border: 20px solid #ffffff;
          background: #faf9f6;
          box-shadow: 0 40px 80px rgba(0,0,0,0.06);
        }

        .story-visuals img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-gold-frame {
          position: absolute;
          top: -30px;
          left: -30px;
          width: 60%;
          height: 60%;
          border: 1px solid rgba(177, 141, 43, 0.15);
          z-index: 1;
        }

        .story-label {
          font-size: 9px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #b18d2b;
          margin-bottom: 24px;
          display: block;
        }

        .story-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 300;
          line-height: 1.1;
          color: #1a1a1a;
          margin-bottom: 32px;
        }

        .story-title em { font-style: italic; color: #b18d2b; }

        .story-body {
          font-size: 15px;
          font-weight: 300;
          line-height: 2;
          color: #555;
          margin-bottom: 40px;
          max-width: 460px;
        }

        .story-quote {
          border-left: 1px solid #b18d2b;
          padding-left: 32px;
          margin-top: 60px;
        }

        .story-quote p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-style: italic;
          color: #1a1a1a;
          line-height: 1.4;
        }

        .story-signature {
          display: block;
          margin-top: 16px;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #999;
        }

        @media (max-width: 992px) {
          .story-grid { grid-template-columns: 1fr; }
          .story-visuals { margin-bottom: 150px; width: 85%; }
          .story-floating-img { width: 60%; bottom: -100px; right: -10px; }
        }
      `}</style>

      <section className="story-section">
        <div className="story-container">
          
          {/* HEADER (MATCHES SLIDER STYLE) */}
          <Reveal className="section-header">
            <span className="about-label">Handcrafted Excellence</span>
            <h2 className="about-main-title">
              About <em>Us</em>
            </h2>
            <div className="title-divider" />
          </Reveal>

          <div className="story-grid">
            {/* LEFT: IMAGES */}
            <div className="story-visuals">
              <div className="story-gold-frame" />
              
              <Reveal className="story-main-img">
                <Image 
                  src="/workshop.webp" 
                  alt="Our Workshop" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </Reveal>

              <motion.div 
                className="story-floating-img"
                style={{ y: imgY }}
              >
                <Image 
                  src="/details.avif" 
                  alt="Jewelry Detail" 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            </div>

            {/* RIGHT: TEXT */}
            <div className="story-content">
              <Reveal delay={0.2}>
                <span className="story-label">Philosophy</span>
                <h2 className="story-title">
                  The Soul of <em>Pure</em> <br />Craftsmanship.
                </h2>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="story-body">
                  There is a specific kind of <em style={{ color: '#b18d2b', fontStyle: 'italic' }}>silence</em> in our atelier when a new gem arrives. 
                  It’s the respect you feel for something the earth made so perfectly. 
                  Our job is a humble one: <strong style={{ fontWeight: '400', color: '#1a1a1a' }}>we stay out of the way.</strong> 
                  <br /><br />
                  We use our hands to nudge the light, to tuck the gold behind the curves of the stone, 
                  and to ensure that when you put it on, it feels like it has 
                  <em style={{ color: '#b18d2b', fontStyle: 'italic' }}> always belonged to you.</em> 
                  It’s not about jewelry that shouts; it’s about a piece that whispers a story 
                  only you and the artisan truly know.
                </p>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="story-quote">
                  <p>"To create something timeless, one must first respect time itself."</p>
                  <span className="story-signature">Pierre Maison — Founder</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}