"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

/* ── COUNTER ANIMATION ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(t => step(t, startTime));
    };
    requestAnimationFrame(t => step(t, t));
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── REVEAL WRAPPER ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

const VALUES = [
  { num: "I",   title: "Origin",    body: "We source directly from the earth, celebrating the unique imperfections and raw character of every gemstone found." },
  { num: "II",  title: "Artistry",  body: "Our Kandy-based workshop preserves traditional Sri Lankan lapidary techniques while embracing modern, minimalist design." },
  { num: "III", title: "Integrity", body: "Transparency is our foundation. We use only ethically sourced raw materials, ensuring a positive impact on our local communities." },
  { num: "IV",  title: "Connection", body: "Every piece is a conversation between nature and wearer. We create jewels meant to be a permanent part of your personal story." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        .ab-page {
          background: #ffffff;
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          padding-top: 0;
        }

        .ab-page h1, .ab-page h2, .ab-page h3, .ab-page p {
           margin: 0;
           padding: 0;
        }

        /* ── HERO ── */
        .ab-hero {
          position: relative;
          height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          background: #faf9f6;
        }
        .ab-hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 120% 80% at 60% 40%, rgba(177,141,43,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 90% at 10% 80%, rgba(177,141,43,0.03) 0%, transparent 50%),
            #faf9f6;
        }
        .ab-hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(177,141,43,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(177,141,43,0.08) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .ab-hero-content {
          position: relative; z-index: 2;
          text-align: center;
          padding: 0 24px;
        }
        .ab-hero-eyebrow {
          font-size: 10px; letter-spacing: 0.6em; text-transform: uppercase;
          color: #b18d2b; margin-bottom: 28px; display: block;
        }
        .ab-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 12vw, 140px);
          font-weight: 300; font-style: italic;
          line-height: 0.88; letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 40px;
        }
        .ab-hero-title em { color: #b18d2b; font-style: italic; }
        .ab-hero-sub {
          font-size: clamp(13px, 1.5vw, 16px); font-weight: 300;
          color: #666; line-height: 1.8;
          max-width: 480px; margin: 0 auto 48px;
          letter-spacing: 0.04em;
        }
        .ab-hero-line {
          width: 1px; height: 80px;
          background: linear-gradient(to bottom, #b18d2b, transparent);
          margin: 0 auto;
        }

        .ab-hero-side {
          position: absolute; left: clamp(20px, 4vw, 60px); bottom: 40px;
          writing-mode: vertical-rl; transform: rotate(180deg);
          font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
          color: #999;
        }
        .ab-hero-scroll {
          position: absolute; right: clamp(20px, 4vw, 60px); bottom: 40px;
          font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
          color: #999;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
        }
        .ab-hero-scroll::after {
          content: '';
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, #ccc, transparent);
        }

        /* ── INTRO SPLIT ── */
        .ab-intro {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 80vh;
        }
        .ab-intro-left {
          background: #ffffff;
          padding: clamp(60px, 10vw, 120px) clamp(40px, 7vw, 100px);
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
          border-right: 1px solid #f0f0f0;
        }
        .ab-intro-left::before {
          content: 'MAISON';
          position: absolute; right: -40px; bottom: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 140px; font-weight: 700; color: rgba(177,141,43,0.04);
          pointer-events: none; user-select: none; letter-spacing: -0.05em;
        }
        .ab-intro-label {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; margin-bottom: 20px; display: block;
        }
        .ab-intro-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 400; line-height: 1.05; color: #1a1a1a;
          margin-bottom: 28px;
        }
        .ab-intro-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 300; line-height: 1.9;
          color: #555; max-width: 440px;
        }
        .ab-intro-rule {
          width: 48px; height: 2px; background: #b18d2b;
          margin: 32px 0;
        }

        .ab-intro-right {
          background: #faf9f6;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        .ab-stat {
          padding: clamp(30px, 5vw, 60px) clamp(24px, 4vw, 48px);
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          display: flex; flex-direction: column; justify-content: flex-end;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          z-index: 1;
        }
        .ab-stat:hover { 
          background: #ffffff; 
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(177,141,43,0.08);
          z-index: 2;
        }
        .ab-stat:nth-child(2), .ab-stat:nth-child(4) { border-right: none; }
        .ab-stat:nth-child(3), .ab-stat:nth-child(4) { border-bottom: none; }
        
        .ab-stat-num {
          font-family: serif;
          font-size: clamp(52px, 7vw, 88px);
          font-weight: 700;
          color: #1a1a1a; 
          line-height: 0.9;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        
        .ab-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #999;
          font-weight: 500;
        }

        /* ── MARQUEE ── */
        .ab-marquee-wrap {
          background: #b18d2b;
          padding: 24px 0; overflow: hidden;
        }
        .ab-marquee {
          display: flex;
          animation: marquee 22s linear infinite;
          white-space: nowrap;
        }
        .ab-marquee-item {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-style: italic; font-weight: 400;
          color: #ffffff; padding: 0 48px;
          display: flex; align-items: center; gap: 48px;
        }
        .ab-marquee-item::after { content: '✦'; font-size: 10px; color: rgba(255,255,255,0.5); }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── VALUES ── */
        .ab-values {
          background: #ffffff;
          padding: clamp(80px, 12vw, 140px) 0;
        }
        .ab-container {
          max-width: 1440px; margin: 0 auto;
          padding: 0 clamp(24px, 6vw, 80px);
        }
        .ab-values-header {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px; margin-bottom: clamp(60px, 8vw, 100px);
          align-items: end;
        }
        .ab-section-eyebrow {
          font-size: 9px; letter-spacing: 0.55em; text-transform: uppercase;
          color: #b18d2b; display: block; margin-bottom: 16px;
        }
        .ab-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 300; font-style: italic; line-height: 1.05;
          color: #1a1a1a;
        }
        .ab-section-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 300; line-height: 1.8;
          color: #777; max-width: 380px;
        }
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: #eee;
        }
        .ab-value {
          background: #ffffff;
          padding: clamp(32px, 4vw, 56px) 30px;
          position: relative; transition: background 0.5s;
        }
        .ab-value:hover { background: #faf9f6; }
        .ab-value-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px; color: #b18d2b;
          margin-bottom: 28px; display: block;
        }
        .ab-value-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 2.5vw, 30px); color: #1a1a1a;
          margin-bottom: 16px;
        }
        
        
        .ab-value-body { 
          fontFamily: "'Cormorant Garamond', serif",
          font-size: 12px; 
          font-weight: 300; 
          line-height: 1.8; 
          color: #666; 
        }

        /* ── CTA ── */
        .ab-cta {
          background: #faf9f6;
          padding: clamp(80px, 12vw, 120px) 0;
          border-top: 1px solid #eee;
        }
        .ab-cta-flex { display: flex; justify-content: space-between; align-items: center; gap: 40px; }
        .ab-btn-dark {
          font-family: 'DM Sans', sans-serif;
          padding: 18px 38px; background: #1a1a1a; color: #ffffff;
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;
          transition: 0.3s;
        }
        .ab-btn-dark:hover { opacity: 0.8; }
        .ab-btn-outline {
          font-family: 'DM Sans', sans-serif;
          padding: 18px 38px; border: 1px solid #1a1a1a; color: #1a1a1a;
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none;
          transition: 0.3s;
        }
        .ab-btn-outline:hover { background: #1a1a1a; color: #fff; }

        @media (max-width: 1024px) {
          .ab-values-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-cta-flex { flex-direction: column; text-align: center; }
        }
        @media (max-width: 768px) {
          .ab-intro { grid-template-columns: 1fr; }
          .ab-values-header { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ab-page">
        {/* HERO SECTION */}
        <section className="ab-hero" ref={heroRef}>
          <div className="ab-hero-bg" />
          <div className="ab-hero-grid" />
          <motion.div className="ab-hero-content" style={{ y: heroY, opacity: heroOpacity }}>
            <span className="ab-hero-eyebrow">Est. 2010 · Kandy</span>
            <h1 className="ab-hero-title">The Art of<br /><em>Being</em><br />Maison</h1>
            <p className="ab-hero-sub">Earth-born gemstones for the craftsman worthy of releasing them.</p>
            <div className="ab-hero-line" />
          </motion.div>
          <div className="ab-hero-side">Kandy · Colombo · Galle</div>
          <div className="ab-hero-scroll">Scroll</div>
        </section>

        {/* INTRO SECTION */}
        <section className="ab-intro">
          <Reveal className="ab-intro-left">
            <span className="ab-intro-label">Our Foundation</span>
            <h2 className="ab-intro-heading">Where precious<br />things are born</h2>
            <div className="ab-intro-rule" />
            <p className="ab-intro-body">
              In 2010, our journey began with a vision to celebrate the organic beauty of raw gemstones. 
              Over a decade later, the art of honoring the natural, unrefined spirit of each stone remains 
              the heartbeat of every piece we craft.
            </p>
          </Reveal>
          <div className="ab-intro-right">
            {[
              { num: 16, suffix: "+", label: "Years of Experience" }, 
              { num: 8, suffix: "K+", label: "Gemstones Sourced" }, 
              { num: 1, label: "Flagship Atelier" }, 
              { num: 15, suffix: "+", label: "Master Artisans" }
            ].map((stat, i) => (
              <div className="ab-stat" key={i}>
                <div className="ab-stat-num">
                    <Counter target={stat.num} suffix={stat.suffix} />
                </div>
                <div className="ab-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div className="ab-marquee-wrap">
          <div className="ab-marquee">
            {[...Array(2)].map((_, set) => 
              ["Natural Raw Gems", "Handcrafted in Kandy", "Ethical Sourcing", "Since 2010"].map((text, i) => (
                <span key={`${set}-${i}`} className="ab-marquee-item">{text}</span>
              ))
            )}
          </div>
        </div>

        {/* VALUES SECTION */}
        <section className="ab-values">
          <div className="ab-container">
            <div className="ab-values-header">
              <div>
                <span className="ab-section-eyebrow">Our Principles</span>
                <h2 className="ab-section-title">Four pillars of<br />the Maison</h2>
              </div>
              <p className="ab-section-body">Commitments that shape every decision we make, every raw stone we select.</p>
            </div>
            <div className="ab-values-grid">
              {VALUES.map((v, i) => (
                <div className="ab-value" key={i}>
                  <span className="ab-value-num">{v.num}</span>
                  <h3 className="ab-value-title">{v.title}</h3>
                  <p className="ab-value-body">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="ab-cta">
          <div className="ab-container ab-cta-flex">
            <div>
              <span className="ab-hero-eyebrow" style={{ marginBottom: 12 }}>Begin Your Journey</span>
              <h2 className="ab-intro-heading" style={{ marginBottom: 0 }}>Find the piece made for you</h2>
            </div>
            <div style={{ display: 'flex', gap: 15 }}>
              <Link href="/collections" className="ab-btn-dark">Explore</Link>
              <Link href="/contact" className="ab-btn-outline">Contact</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}