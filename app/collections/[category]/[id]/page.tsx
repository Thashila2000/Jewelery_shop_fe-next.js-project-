"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check, ShoppingBag, Heart, Shield, Truck, RotateCcw, Award } from "lucide-react";
import { collectionsData } from "@/app/data/CollectionsData";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = use(params);
  const categoryData = collectionsData[category];
  const product = categoryData?.products.find((p) => p.id === Number(id));
  if (!product || !categoryData) notFound();

  const { addToCart } = useCart();
  const [imgIdx,    setImgIdx]    = useState(0);
  const [wishlisted,setWishlisted]= useState(false);
  const [added,     setAdded]     = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id:            product.id,
      category,
      name:          product.name,
      price:         product.price,
      originalPrice: product.originalPrice,
      image:         product.images[0],
      material:      product.material,
      stone:         product.stone,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const badgeClass: Record<string, string> = {
    New: "dp-badge-new", Bestseller: "dp-badge-best", Limited: "dp-badge-lim",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .dp-page { background:#fff; min-height:100vh; color:#1a1a1a; font-family:'DM Sans',sans-serif; padding-top:80px; }

        .dp-crumb { padding:24px clamp(1.5rem,6vw,5rem) 0; font-size:10px; letter-spacing:0.38em; text-transform:uppercase; color:#aaa; }
        .dp-crumb a { color:inherit; text-decoration:none; transition:color 0.3s; }
        .dp-crumb a:hover { color:#b18d2b; }
        .dp-crumb span { color:#b18d2b; }

        .dp-layout { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,5vw,6rem); padding:36px clamp(1.5rem,6vw,5rem) 80px; max-width:1400px; margin:0 auto; }

        .dp-images { position:sticky; top:100px; align-self:start; }
        .dp-main-img-wrap { position:relative; aspect-ratio:1/1; overflow:hidden; background:#f5f3ef; border:1px solid #ece8e1; margin-bottom:12px; }
        .dp-main-img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s ease; display:block; }
        .dp-main-img-wrap:hover .dp-main-img { transform:scale(1.04); }
        .dp-img-prev, .dp-img-next { position:absolute; top:50%; transform:translateY(-50%); width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.9); backdrop-filter:blur(4px); border:1px solid rgba(0,0,0,0.1); cursor:pointer; display:flex; align-items:center; justify-content:center; color:#333; transition:background 0.25s, border-color 0.25s; z-index:2; }
        .dp-img-prev { left:14px; } .dp-img-next { right:14px; }
        .dp-img-prev:hover, .dp-img-next:hover { background:#b18d2b; border-color:#b18d2b; color:#fff; }
        .dp-img-accent { position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(to right,#b18d2b,#d4af37,#b18d2b); }
        .dp-thumbs { display:flex; gap:8px; }
        .dp-thumb { position:relative; flex:1; aspect-ratio:1/1; overflow:hidden; cursor:pointer; border:2px solid transparent; background:#f5f3ef; transition:border-color 0.25s; }
        .dp-thumb-on { border-color:#b18d2b; }
        .dp-thumb img { width:100%; height:100%; object-fit:cover; transition:opacity 0.25s; }
        .dp-thumb:not(.dp-thumb-on) img { opacity:0.6; }
        .dp-thumb:hover img { opacity:1; }

        .dp-info { display:flex; flex-direction:column; gap:28px; }
        .dp-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .dp-sku { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:#bbb; }
        .dp-badge { font-size:8px; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; padding:4px 10px; border-radius:2px; }
        .dp-badge-new  { background:#b18d2b; color:#fff; }
        .dp-badge-best { background:#1a1a1a; color:#d4af37; border:1px solid #d4af37; }
        .dp-badge-lim  { background:transparent; color:#888; border:1px solid #ccc; }

        .dp-tagline { font-size:9px; letter-spacing:0.55em; text-transform:uppercase; color:#b18d2b; margin:0; }
        .dp-name { font-family:'Cormorant Garamond',serif; font-size:clamp(32px,4vw,52px); font-weight:400; font-style:italic; line-height:1.0; color:#1a1a1a; margin:8px 0 0; }
        .dp-rule { height:1px; background:linear-gradient(to right,#b18d2b 0%,#ece8e1 60%,transparent 100%); border:none; margin:0; }

        .dp-price-row { display:flex; align-items:baseline; gap:12px; }
        .dp-price { font-family:'DM Serif Display',serif; font-size:clamp(28px,3.5vw,38px); font-weight:400; color:#1a1a1a; line-height:1; letter-spacing:-0.01em; }
        .dp-price-orig { font-family:'DM Sans',sans-serif; font-size:15px; color:#bbb; text-decoration:line-through; }
        .dp-discount { font-size:11px; font-weight:500; color:#3a9a5c; letter-spacing:0.04em; }

        .dp-description { font-size:14px; font-weight:300; line-height:1.85; color:#555; border-left:2px solid #ece8e1; padding-left:18px; }

        .dp-details-title { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:#aaa; margin:0 0 12px; }
        .dp-details-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
        .dp-details-list li { font-size:13px; font-weight:300; color:#444; padding-left:18px; position:relative; }
        .dp-details-list li::before { content:''; position:absolute; left:0; top:7px; width:5px; height:1px; background:#b18d2b; }

        /* ── ACTIONS ── */
        .dp-actions { display:flex; gap:10px; }
        .dp-add-cart {
          flex:1; height:52px;
          display:flex; align-items:center; justify-content:center; gap:10px;
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500;
          letter-spacing:0.3em; text-transform:uppercase;
          background:#1a1a1a; color:#fff; border:none;
          cursor:pointer; transition:background 0.35s, letter-spacing 0.3s;
        }
        .dp-add-cart:hover { background:#b18d2b; letter-spacing:0.38em; }
        .dp-add-cart.added { background:#2d6e45; }

        .dp-view-cart {
          flex:1; height:52px;
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500;
          letter-spacing:0.25em; text-transform:uppercase;
          background:transparent; color:#1a1a1a;
          border:1px solid #1a1a1a; text-decoration:none;
          transition:background 0.35s, color 0.35s;
        }
        .dp-view-cart:hover { background:#1a1a1a; color:#fff; }

        .dp-wish { width:52px; height:52px; display:flex; align-items:center; justify-content:center; border:1px solid #ddd; background:#fff; cursor:pointer; transition:border-color 0.3s, background 0.3s; flex-shrink:0; }
        .dp-wish:hover { border-color:#b18d2b; background:#fff7e6; }
        .dp-wish-on { border-color:#b18d2b; background:#fff7e6; }

        .dp-strips { display:flex; flex-direction:column; gap:0; border:1px solid #ece8e1; }
        .dp-strip { display:flex; align-items:flex-start; gap:14px; padding:16px 18px; border-bottom:1px solid #ece8e1; font-size:12px; }
        .dp-strip:last-child { border-bottom:none; }
        .dp-strip-icon { color:#b18d2b; flex-shrink:0; margin-top:1px; }
        .dp-strip-title { font-weight:500; color:#1a1a1a; margin:0 0 3px; font-size:12px; }
        .dp-strip-desc  { font-weight:300; color:#777; margin:0; line-height:1.6; font-size:11px; }

        @media (max-width:900px) { .dp-layout { grid-template-columns:1fr; gap:32px; padding:24px 20px 80px; } .dp-images { position:static; } }
        @media (max-width:480px) { .dp-page { padding-top:64px; } .dp-crumb { padding:16px 16px 0; } .dp-layout { padding:20px 16px 80px; } .dp-name { font-size:28px; } .dp-price { font-size:26px; } .dp-actions { flex-wrap:wrap; } .dp-add-cart, .dp-view-cart { flex:1 1 100%; } .dp-wish { width:100%; } }
      `}</style>

      <div className="dp-page">
        <p className="dp-crumb">
          <Link href="/">Home</Link>{" / "}
          <Link href="/collections">Collections</Link>{" / "}
          <Link href={`/collections/${category}`}>{categoryData.name}</Link>{" / "}
          <span>{product.name}</span>
        </p>

        <div className="dp-layout">
          {/* IMAGE PANEL */}
          <motion.div className="dp-images" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, ease:[0.25,0.46,0.45,0.94] }}>
            <div className="dp-main-img-wrap">
              <motion.img key={imgIdx} src={product.images[imgIdx]} alt={product.name} className="dp-main-img" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }} />
              {product.images.length > 1 && (
                <>
                  <button className="dp-img-prev" onClick={() => setImgIdx(p => (p - 1 + product.images.length) % product.images.length)}><ChevronLeft size={16} /></button>
                  <button className="dp-img-next" onClick={() => setImgIdx(p => (p + 1) % product.images.length)}><ChevronRight size={16} /></button>
                </>
              )}
              <div className="dp-img-accent" />
            </div>
            <div className="dp-thumbs">
              {product.images.map((src, i) => (
                <div key={i} className={`dp-thumb${i === imgIdx ? " dp-thumb-on" : ""}`} onClick={() => setImgIdx(i)}>
                  <img src={src} alt={`View ${i + 1}`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* INFO PANEL */}
          <motion.div className="dp-info" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.1, ease:[0.25,0.46,0.45,0.94] }}>
            <div className="dp-meta">
              <span className="dp-sku">{product.sku}</span>
              {product.badge && <span className={`dp-badge ${badgeClass[product.badge] ?? ""}`}>{product.badge}</span>}
            </div>

            <div>
              <p className="dp-tagline">{product.tagline}</p>
              <h1 className="dp-name">{product.name}</h1>
            </div>

            <hr className="dp-rule" />

            <div className="dp-price-row">
              <span className="dp-price">${product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="dp-price-orig">${product.originalPrice.toLocaleString()}</span>}
              {product.originalPrice && <span className="dp-discount">-{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span>}
            </div>

            <p className="dp-description">{product.description}</p>
            <hr className="dp-rule" />

            <div>
              <p className="dp-details-title">Specifications</p>
              <ul className="dp-details-list">
                {product.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            {/* ACTIONS */}
            <div className="dp-actions">
              <button className={`dp-add-cart${added ? " added" : ""}`} onClick={handleAddToCart}>
                {added ? <><Check size={15} /> Added to Cart</> : <><ShoppingBag size={15} /> Add to Cart</>}
              </button>
              <Link href="/cart" className="dp-view-cart">View Cart</Link>
              <button className={`dp-wish${wishlisted ? " dp-wish-on" : ""}`} onClick={() => setWishlisted(w => !w)} aria-label="Wishlist">
                <Heart size={18} fill={wishlisted ? "#b18d2b" : "none"} stroke={wishlisted ? "#b18d2b" : "#888"} />
              </button>
            </div>

            <div className="dp-strips">
              <div className="dp-strip"><Truck size={16} className="dp-strip-icon" /><div><p className="dp-strip-title">Delivery</p><p className="dp-strip-desc">{product.deliveryInfo}</p></div></div>
              <div className="dp-strip"><Shield size={16} className="dp-strip-icon" /><div><p className="dp-strip-title">Care Instructions</p><p className="dp-strip-desc">{product.careInstructions}</p></div></div>
              <div className="dp-strip"><Award size={16} className="dp-strip-icon" /><div><p className="dp-strip-title">Authenticity</p><p className="dp-strip-desc">Every piece comes with a certificate of authenticity, gemological report where applicable, and our lifetime craftsmanship guarantee.</p></div></div>
              <div className="dp-strip"><RotateCcw size={16} className="dp-strip-icon" /><div><p className="dp-strip-title">Returns</p><p className="dp-strip-desc">30-day returns on unworn items in original packaging. Custom and engraved pieces are non-returnable.</p></div></div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
