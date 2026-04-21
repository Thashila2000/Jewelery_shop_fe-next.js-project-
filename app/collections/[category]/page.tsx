"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { collectionsData } from "@/app/data/CollectionsData";

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "New Arrivals"];

/* ─── CARD ─────────────────────────────────────────────────────── */
function JewelCard({ product, idx }: { product: any; idx: number }) {
  const images: string[] = [product.image, product.image, product.image];
  const metals = ["18k Yellow Gold", "18k White Gold", "18k Rose Gold", "Platinum"];
  const sizes  = ["5", "6", "7", "8", "9"];

  const metalColors: Record<string, string> = {
    "18k Yellow Gold": "#d4a843",
    "18k White Gold":  "#c8c8c8",
    "18k Rose Gold":   "#c9837a",
    "Platinum":        "#9aa0ad",
  };

  const [imgIdx,        setImgIdx]        = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(metals[0]);
  const [selectedSize,  setSelectedSize]  = useState<string | null>(null);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [adding,        setAdding]        = useState(false);
  const [added,         setAdded]         = useState(false);

  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx(p => (p + 1) % images.length); };
  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx(p => (p - 1 + images.length) % images.length); };

  const handleEnquire = () => {
    if (added) return;
    setAdding(true);
    setTimeout(() => { setAdding(false); setAdded(true); setTimeout(() => setAdded(false), 2200); }, 900);
  };

  const badgeClass: Record<string, string> = {
    "New":        "jc-badge-new",
    "Bestseller": "jc-badge-best",
    "Limited":    "jc-badge-lim",
  };

  return (
    <motion.div
      className="jc-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Gold top accent line */}
      <div className="jc-accent" />

      {/* ── IMAGE ── */}
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

        {/* Arrows */}
        <div className="jc-arrows">
          <button className="jc-arrow" onClick={prevImg}><ChevronLeft size={14} /></button>
          <button className="jc-arrow" onClick={nextImg}><ChevronRight size={14} /></button>
        </div>

        {/* Dots */}
        <div className="jc-dots">
          {images.map((_, i) => (
            <button key={i} className={`jc-dot${i === imgIdx ? " jc-dot-on" : ""}`}
              onClick={e => { e.stopPropagation(); setImgIdx(i); }} />
          ))}
        </div>

        {/* Badge */}
        {product.badge && (
          <span className={`jc-badge ${badgeClass[product.badge] ?? ""}`}>{product.badge}</span>
        )}

        {/* Wishlist */}
        <button
          className={`jc-wish${wishlisted ? " jc-wish-on" : ""}`}
          onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
          aria-label="Wishlist"
        >
          <Heart size={14} fill={wishlisted ? "#b18d2b" : "none"} stroke={wishlisted ? "#b18d2b" : "#888"} />
        </button>
      </div>

      {/* ── BODY ── */}
      <div className="jc-body">
        {/* Name + rating */}
        <div>
          <h3 className="jc-name">{product.name}</h3>
          <div className="jc-rating">
            <Star size={11} fill="#d4af37" color="#d4af37" />
            <span className="jc-rv">4.8</span>
            <span className="jc-rc">(48)</span>
            {product.badge === "Bestseller" && <span className="jc-ship">Free shipping</span>}
          </div>
        </div>

        {/* Price — DM Serif Display */}
        <div className="jc-price-row">
          <span className="jc-price">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="jc-price-orig">${product.originalPrice.toLocaleString()}</span>
          )}
          {product.originalPrice && (
            <span className="jc-discount">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Metal */}
        <div className="jc-section">
          <p className="jc-slabel">Metal</p>
          <div className="jc-swatches">
            {metals.map(m => (
              <button
                key={m}
                className={`jc-swatch${selectedMetal === m ? " jc-swatch-on" : ""}`}
                style={{ background: metalColors[m] }}
                onClick={() => setSelectedMetal(m)}
                title={m}
              />
            ))}
          </div>
          <p className="jc-sval">{selectedMetal}</p>
        </div>

        {/* Size */}
        <div className="jc-section">
          <p className="jc-slabel">Size</p>
          <div className="jc-sizes">
            {sizes.map(s => (
              <button
                key={s}
                className={`jc-size${selectedSize === s ? " jc-size-on" : ""}`}
                onClick={() => setSelectedSize(s)}
              >{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="jc-footer">
        <button
          className={`jc-cta${added ? " jc-cta-done" : ""}`}
          onClick={handleEnquire}
          disabled={adding || added}
        >
          {adding ? <><Loader2 size={13} className="jc-spin" /> Sending…</>
          : added  ? <><Check size={13} /> Enquiry Sent</>
          :           <><ShoppingCart size={13} /> Enquire Now</>}
        </button>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────────── */
export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const data = collectionsData[category];
  if (!data) notFound();

  const [sort, setSort] = useState("Featured");

  const sorted = [...data.products].sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── PAGE ── */
        .cp-page {
          background: #ffffff;
          min-height: 100vh;
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          padding-top: 80px;
        }

        /* ── HERO ── */
        .cp-hero {
          position: relative;
          height: clamp(300px, 42vw, 520px);
          overflow: hidden;
          margin-bottom: 52px;
        }
        .cp-hero img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.38);
          transform: scale(1.06);
          transition: transform 8s ease;
        }
        .cp-hero:hover img { transform: scale(1.0); }
        .cp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.78) 0%, transparent 65%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: clamp(2rem, 5vw, 5rem);
        }
        .cp-crumb {
          font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(255,255,255,0.38); margin-bottom: 14px;
        }
        .cp-crumb a { color: inherit; text-decoration: none; transition: color 0.3s; }
        .cp-crumb a:hover { color: #d4af37; }
        .cp-hero-tag { font-size: 9px; letter-spacing: 0.6em; text-transform: uppercase; color: #d4af37; margin-bottom: 8px; }
        .cp-hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 7vw, 90px);
          font-weight: 400; font-style: italic; line-height: 0.9;
          color: #fff; margin-bottom: 16px;
        }
        .cp-hero-p { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.62); line-height: 1.8; max-width: 380px; }
        .cp-hero-num {
          position: absolute; bottom: clamp(2rem,5vw,5rem); right: clamp(2rem,5vw,5rem);
          font-family: 'Cormorant Garamond', serif; font-size: clamp(56px,10vw,120px);
          font-weight: 300; font-style: italic; color: rgba(255,255,255,0.06);
          pointer-events: none; user-select: none;
        }

        /* ── TOOLBAR ── */
        .cp-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 4rem) 32px;
          border-bottom: 1px solid #e8e4de;
          margin-bottom: 40px; gap: 16px; flex-wrap: wrap;
        }
        .cp-count { font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: #999; }
        .cp-sort { display: flex; align-items: center; gap: 10px; }
        .cp-sort-lbl { font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: #aaa; }
        .cp-sort select {
          appearance: none; background: #fff;
          border: 1px solid #ddd;
          padding: 8px 36px 8px 14px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300; color: #1a1a1a;
          cursor: pointer; border-radius: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23b18d2b' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; background-size: 10px;
          transition: border-color 0.3s;
        }
        .cp-sort select:focus { outline: none; border-color: #b18d2b; }

        /* ── GRID ── */
        .cp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          padding: 0 clamp(1.5rem, 5vw, 4rem) 100px;
        }

        /* ══ CARD ══ */
        .jc-card {
          background: #ffffff;
          border: 1px solid #ece8e1;
          border-radius: 2px;
          overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
        }
        .jc-card:hover {
          border-color: #c9a84c;
          box-shadow: 0 8px 36px rgba(177,141,43,0.12), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-4px);
        }

        /* Gold accent */
        .jc-accent {
          height: 2px;
          background: linear-gradient(to right, #b18d2b, #d4af37);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .jc-card:hover .jc-accent { transform: scaleX(1); }

        /* Image */
        .jc-img-wrap {
          position: relative; aspect-ratio: 4/3;
          overflow: hidden; background: #f5f3ef; flex-shrink: 0;
        }
        .jc-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 1.3s cubic-bezier(0.25,0.46,0.45,0.94); }
        .jc-card:hover .jc-img { transform: scale(1.08); }

        /* Arrows */
        .jc-arrows {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 10px; opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .jc-card:hover .jc-arrows { opacity: 1; pointer-events: auto; }
        .jc-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.88); backdrop-filter: blur(4px);
          border: 1px solid rgba(0,0,0,0.1); color: #333; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s, border-color 0.25s;
        }
        .jc-arrow:hover { background: #b18d2b; border-color: #b18d2b; color: #fff; }

        /* Dots */
        .jc-dots { position: absolute; bottom: 9px; left: 0; right: 0; display: flex; justify-content: center; gap: 5px; }
        .jc-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.55); border: none; cursor: pointer;
          transition: background 0.3s, width 0.3s; padding: 0;
        }
        .jc-dot-on { background: #b18d2b; width: 13px; border-radius: 3px; }

        /* Badge */
        .jc-badge {
          position: absolute; top: 12px; left: 12px;
          font-size: 8px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 2px;
        }
        .jc-badge-new  { background: #b18d2b; color: #fff; }
        .jc-badge-best { background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37; }
        .jc-badge-lim  { background: rgba(255,255,255,0.85); color: #555; border: 1px solid rgba(0,0,0,0.12); backdrop-filter: blur(6px); }

        /* Wishlist */
        .jc-wish {
          position: absolute; top: 10px; right: 10px;
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(255,255,255,0.88); backdrop-filter: blur(6px);
          border: 1px solid rgba(0,0,0,0.1); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, border-color 0.3s, transform 0.2s;
        }
        .jc-wish:hover { background: #fff7e6; border-color: #b18d2b; transform: scale(1.1); }
        .jc-wish-on { background: #fff7e6; border-color: #b18d2b; }

        /* Body */
        .jc-body { padding: 16px 18px 0; flex: 1; display: flex; flex-direction: column; gap: 11px; }

        .jc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 1.8vw, 20px); font-weight: 500; line-height: 1.2;
          color: #1a1a1a; margin: 0 0 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .jc-rating { display: flex; align-items: center; gap: 5px; }
        .jc-rv { font-size: 12px; font-weight: 500; color: #1a1a1a; }
        .jc-rc { font-size: 11px; color: #aaa; }
        .jc-ship { font-size: 10px; color: #3a9a5c; margin-left: auto; }

        /* Price — DM Serif Display for a sharp, formal look */
        .jc-price-row { display: flex; align-items: baseline; gap: 8px; }
        .jc-price {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(20px, 2.2vw, 24px);
          font-weight: 400; color: #1a1a1a; line-height: 1; letter-spacing: -0.01em;
        }
        .jc-price-orig { font-size: 12px; color: #bbb; text-decoration: line-through; font-family: 'DM Sans', sans-serif; }
        .jc-discount { font-size: 10px; font-weight: 500; color: #3a9a5c; letter-spacing: 0.04em; }

        /* Sections */
        .jc-section { display: flex; flex-direction: column; gap: 5px; }
        .jc-slabel { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: #aaa; margin: 0; }
        .jc-sval { font-size: 10px; color: #777; margin: 0; }

        /* Metal swatches */
        .jc-swatches { display: flex; gap: 7px; }
        .jc-swatch {
          width: 19px; height: 19px; border-radius: 50%;
          border: 2px solid transparent; cursor: pointer;
          transition: border-color 0.25s, transform 0.2s; outline: none;
        }
        .jc-swatch:hover { transform: scale(1.15); }
        .jc-swatch-on { border-color: #b18d2b; box-shadow: 0 0 0 2px rgba(177,141,43,0.25); }

        /* Sizes */
        .jc-sizes { display: flex; flex-wrap: wrap; gap: 6px; }
        .jc-size {
          min-width: 32px; height: 28px; padding: 0 7px;
          border-radius: 2px; border: 1px solid #ddd;
          background: #fff;
          font-size: 11px; font-weight: 400; color: #555;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .jc-size:hover { border-color: #b18d2b; color: #1a1a1a; }
        .jc-size-on { background: #b18d2b; border-color: #b18d2b; color: #fff; }

        /* Footer */
        .jc-footer {
          padding: 13px 18px 18px;
          border-top: 1px solid #ece8e1;
          margin-top: 13px;
        }
        .jc-cta {
          width: 100%; height: 40px;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase;
          background: #1a1a1a; color: #fff; border: none;
          cursor: pointer; border-radius: 1px;
          transition: background 0.35s, letter-spacing 0.3s;
        }
        .jc-cta:hover:not(:disabled) { background: #b18d2b; letter-spacing: 0.36em; }
        .jc-cta:disabled { opacity: 0.65; cursor: default; }
        .jc-cta-done { background: #2d6e45 !important; }
        .jc-spin { animation: jcspin 0.8s linear infinite; }
        @keyframes jcspin { to { transform: rotate(360deg); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .cp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 0 20px 80px; }
        }
        @media (max-width: 580px) {
          .cp-page { padding-top: 64px; }
          .cp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 0 12px 80px; }
          .cp-toolbar { padding: 0 12px 26px; }
          .jc-body { padding: 12px 13px 0; gap: 9px; }
          .jc-footer { padding: 11px 13px 14px; }
          .jc-name { font-size: 14px; }
          .jc-price { font-size: 17px; }
          .jc-cta { height: 36px; font-size: 9px; }
        }
      `}</style>

      <div className="cp-page">

        {/* HERO */}
        <div className="cp-hero">
          <Image src={data.heroImage} alt={data.name} fill priority style={{ objectFit:"cover" }} />
          <div className="cp-hero-overlay">
            <p className="cp-crumb">
              <Link href="/">Home</Link>{" / "}
              <Link href="/collections">Collections</Link>{" / "}
              <span style={{ color:"#d4af37" }}>{data.name}</span>
            </p>
            <p className="cp-hero-tag">{data.tagline}</p>
            <h1 className="cp-hero-h1">{data.name}</h1>
            <p className="cp-hero-p">{data.description}</p>
          </div>
          <div className="cp-hero-num">{String(data.products.length).padStart(2,"0")}</div>
        </div>

        {/* TOOLBAR */}
        <div className="cp-toolbar">
          <span className="cp-count">{data.products.length} pieces</span>
          <div className="cp-sort">
            <span className="cp-sort-lbl">Sort</span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="cp-grid">
          {sorted.map((product, idx) => (
            <JewelCard key={product.id} product={product} idx={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
