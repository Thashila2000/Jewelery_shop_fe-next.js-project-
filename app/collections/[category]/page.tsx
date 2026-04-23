"use client";

import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { collectionsData } from "@/app/data/CollectionsData";

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "New Arrivals"];

/* ─── CARD ─────────────────────────────────────────────────────── */
function JewelCard({ product, idx, category }: { product: any; idx: number; category: string }) {
  const images: string[] = [product.image, product.image, product.image];
  const [imgIdx, setImgIdx] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx(p => (p + 1) % images.length); };
  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx(p => (p - 1 + images.length) % images.length); };

  const badgeClass: Record<string, string> = {
    "New": "jc-badge-new",
    "Bestseller": "jc-badge-best",
    "Limited": "jc-badge-lim",
  };

  return (
    <motion.div
      className="jc-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="jc-accent" />
      <div className="jc-img-wrap">
        <motion.img
          key={imgIdx}
          src={images[imgIdx]}
          alt={product.name}
          className="jc-img"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="jc-arrows">
          <button className="jc-arrow" onClick={prevImg}><ChevronLeft size={14} /></button>
          <button className="jc-arrow" onClick={nextImg}><ChevronRight size={14} /></button>
        </div>
        <div className="jc-dots">
          {images.map((_, i) => (
            <button key={i} className={`jc-dot${i === imgIdx ? " jc-dot-on" : ""}`}
              onClick={e => { e.stopPropagation(); setImgIdx(i); }} />
          ))}
        </div>
        {product.badge && <span className={`jc-badge ${badgeClass[product.badge] ?? ""}`}>{product.badge}</span>}
        <button
          className={`jc-wish${wishlisted ? " jc-wish-on" : ""}`}
          onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={wishlisted ? "#b18d2b" : "none"} stroke={wishlisted ? "#b18d2b" : "#888"} />
        </button>
      </div>

      <div className="jc-body">
        <div>
          <h3 className="jc-name">{product.name}</h3>
          <div className="jc-rating">
            <Star size={11} fill="#d4af37" color="#d4af37" />
            <span className="jc-rv">4.8</span>
            <span className="jc-rc">(48)</span>
            {product.badge === "Bestseller" && <span className="jc-ship">Free shipping</span>}
          </div>
        </div>
        <div className="jc-price-row">
          <span className="jc-price">${product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="jc-price-orig">${product.originalPrice.toLocaleString()}</span>}
          {product.originalPrice && (
            <span className="jc-discount">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
          )}
        </div>
      </div>

      <div className="jc-footer">
        <Link href={`/collections/${category}/${product.id}`} className="jc-cta">View Details</Link>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────────── */
export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const data = collectionsData[category];
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState("Featured");

  useEffect(() => { setMounted(true); }, []);

  if (!data) notFound();

  const sorted = [...data.products].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cp-page {
          background: #ffffff;
          min-height: 100vh;
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          padding-top: 80px;
        }

        .cp-crumb {
          font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          
        }
        .cp-crumb a { color: inherit; text-decoration: none; transition: color 0.3s; }
        .cp-crumb a:hover { color: #d4af37; }
        .cp-crumb span { color: #d4af37; }

        .cp-hero {
          position: relative;
          height: clamp(180px, 22vw, 300px);
          overflow: hidden;
          margin-bottom: 44px;
          width: 100%;
        }
        .cp-hero img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover !important;
          filter: brightness(0.38);
          transform: scale(1.06);
          transition: transform 8s ease;
        }
        .cp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.78) 0%, transparent 65%);
          display: flex; flex-direction: column; justify-content: space-between;
          padding: clamp(1.5rem, 4vw, 3.5rem);
          z-index: 2;
        }

        /* DESKTOP MARGIN ADDED HERE */
        .cp-hero-tag { 
          font-size: 9px; 
          letter-spacing: 0.6em; 
          text-transform: uppercase; 
          color: #d4af37; 
          margin-bottom: 8px; 
          margin-top: 24px; 
        }

        .cp-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 7vw, 90px);
          font-weight: 400; font-style: italic; line-height: 0.9;
          color: #fff; margin-bottom: 16px;
        }
        .cp-hero-p { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.62); line-height: 1.8; max-width: 380px; }
        
        .cp-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 4rem) 32px;
          border-bottom: 1px solid #e8e4de;
          margin-bottom: 40px; gap: 16px; flex-wrap: wrap;
        }

        .cp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          padding: 0 clamp(1.5rem, 5vw, 4rem) 100px;
        }

        .jc-card { background: #fff; border: 1px solid #ece8e1; transition: all 0.35s; display: flex; flex-direction: column; }
        .jc-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #f5f3ef; }
        .jc-img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.3s; }
        .jc-body { padding: 16px 18px 0; flex: 1; display: flex; flex-direction: column; gap: 11px; }
        .jc-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #1a1a1a; margin: 0; }
        .jc-price { font-family: 'DM Serif Display', serif; font-size: 24px; }
        .jc-footer { padding: 13px 18px 18px; border-top: 1px solid #ece8e1; margin-top: 13px; }
        .jc-cta { width: 100%; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; background: #1a1a1a; color: #fff; text-decoration: none; }

        /* ── RESPONSIVE OVERRIDES ── */
        @media (max-width: 580px) {
          .cp-page { padding-top: 64px; }
          
          /* RESET TAGLINE MARGIN FOR MOBILE */
          .cp-hero-tag { margin-top: 0; }

          /* BREADCRUMB POSITION FOR MOBILE */
          .cp-crumb { padding-top: 40px; }

          .cp-hero { height: 300px; margin-bottom: 28px; }
          .cp-hero-overlay { padding: 20px; }
          .cp-hero-h1 { font-size: 40px; }
          .cp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 0 12px 80px; }
          .jc-body { padding: 12px 13px 0; }
          .jc-name { font-size: 14px; }
          .jc-price { font-size: 17px; }
        }
      `}</style>

      <div className="cp-page">
        <div className="cp-hero">
          <Image src={data.heroImage} alt={data.name} fill priority style={{ objectFit: "cover" }} />
          <div className="cp-hero-overlay">
            <p className="cp-crumb">
              <Link href="/">Home</Link>{" / "}
              <Link href="/collections">Collections</Link>{" / "}
              <span>{data.name}</span>
            </p>
            <div>
              <p className="cp-hero-tag">{data.tagline}</p>
              <h1 className="cp-hero-h1">{data.name}</h1>
              <p className="cp-hero-p">{data.description}</p>
            </div>
          </div>
        </div>  

        <div className="cp-toolbar">
          <span className="cp-count">{data.products.length} pieces</span>
          <div className="cp-sort">
            <span className="cp-sort-lbl">Sort</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="cp-grid">
          {sorted.map((product, idx) => (
            <JewelCard key={product.id} product={product} idx={idx} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}