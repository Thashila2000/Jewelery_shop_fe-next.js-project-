"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideCart({ isOpen, onClose }: SideCartProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navH = scrolled ? 64 : 80;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BLURRED OVERLAY */}
          <motion.div
            className="sc-overlay"
            style={{ top: navH }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className="sc-drawer"
            style={{ top: navH, height: `calc(100vh - ${navH}px)` }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Serif+Display@0&display=swap');

              .sc-overlay {
                position: fixed;
                left: 0; right: 0; bottom: 0;
                background: rgba(0, 0, 0, 0.25);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                z-index: 199;
              }

              .sc-drawer {
                position: fixed;
                right: 0;
                width: 400px;
                background: #ffffff;
                z-index: 200;
                display: flex;
                flex-direction: column;
                box-shadow: -8px 0 40px rgba(0,0,0,0.12);
                font-family: 'DM Sans', sans-serif;
                overflow: hidden; /* Prevent the drawer itself from scrolling */
              }

              /* ── HEADER ── */
              .sc-header {
                padding: 24px 24px 20px;
                border-bottom: 1px solid #f0ece6;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
              }
              .sc-title {
                font-family: 'Cormorant Garamond', serif;
                font-size: 26px;
                font-weight: 500;
                margin: 0 0 2px;
                color: #1a1a1a;
                line-height: 1;
              }
              .sc-title em { font-style: italic; color: #b18d2b; }
              .sc-count {
                font-size: 10px;
                letter-spacing: 0.3em;
                text-transform: uppercase;
                color: #bbb;
                font-weight: 300;
              }
              .sc-close {
                background: none; border: none; cursor: pointer;
                color: #888; padding: 6px;
                transition: color 0.2s, transform 0.2s;
                display: flex; align-items: center; justify-content: center;
              }
              .sc-close:hover { color: #1a1a1a; transform: rotate(90deg); }

              /* ── ITEMS (The Scrollable Area) ── */
              .sc-items {
                flex: 1; /* This pushes the footer to the bottom */
                overflow-y: auto;
                padding: 20px 24px;
                -webkit-overflow-scrolling: touch;
              }
              .sc-items::-webkit-scrollbar { width: 4px; }
              .sc-items::-webkit-scrollbar-track { background: transparent; }
              .sc-items::-webkit-scrollbar-thumb { background: #e8e4de; border-radius: 2px; }

              .sc-empty {
                display: flex; flex-direction: column;
                align-items: center; justify-content: center;
                height: 100%; gap: 14px; text-align: center;
                padding: 40px 24px;
              }
              .sc-empty-icon { color: #e8e4de; }
              .sc-empty-title {
                font-family: 'Cormorant Garamond', serif;
                font-size: 22px; font-style: italic; color: #aaa;
                margin: 0;
              }
              .sc-empty-sub { font-size: 12px; font-weight: 300; color: #ccc; margin: 0; }
              .sc-empty-link {
                display: inline-flex; align-items: center; gap: 6px;
                padding: 10px 22px; background: #1a1a1a; color: #fff;
                font-size: 9px; font-weight: 500; letter-spacing: 0.3em;
                text-transform: uppercase; text-decoration: none;
                transition: background 0.3s; margin-top: 8px;
              }
              .sc-empty-link:hover { background: #b18d2b; }

              .sc-item {
                display: flex; gap: 14px;
                padding-bottom: 18px; margin-bottom: 18px;
                border-bottom: 1px solid #f5f3ef;
              }
              .sc-item:last-child { border-bottom: none; margin-bottom: 0; }
              .sc-item-img {
                width: 76px; height: 90px;
                background: #f5f3ef; overflow: hidden; flex-shrink: 0;
                border: 1px solid #ece8e1;
              }
              .sc-item-img img { width: 100%; height: 100%; object-fit: cover; }
              .sc-item-body { flex: 1; display: flex; flex-direction: column; gap: 4px; }
              .sc-item-cat {
                font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase;
                color: #b18d2b; margin: 0;
              }
              .sc-item-name {
                font-family: 'Cormorant Garamond', serif;
                font-size: 16px; font-weight: 500; color: #1a1a1a;
                margin: 0; line-height: 1.2;
              }
              .sc-item-meta { font-size: 10px; font-weight: 300; color: #aaa; margin: 0; }
              .sc-item-price {
                font-family: 'DM Serif Display', serif;
                font-size: 17px; font-weight: 400; color: #1a1a1a;
                margin: 4px 0 0;
              }
              .sc-item-actions {
                display: flex; align-items: center;
                justify-content: space-between; margin-top: 8px;
              }

              .sc-qty { display: flex; align-items: center; border: 1px solid #e0dbd4; }
              .sc-qty-btn {
                background: none; border: none;
                width: 26px; height: 26px;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; color: #666;
                transition: background 0.2s, color 0.2s;
              }
              .sc-qty-btn:hover { background: #f5f3ef; color: #1a1a1a; }
              .sc-qty-val {
                width: 28px; text-align: center;
                font-size: 12px; font-weight: 400; color: #1a1a1a;
                border-left: 1px solid #e0dbd4; border-right: 1px solid #e0dbd4;
                line-height: 26px;
              }
              .sc-del {
                background: none; border: none; cursor: pointer;
                color: #ccc; padding: 4px;
                display: flex; align-items: center; justify-content: center;
                transition: color 0.2s, transform 0.2s;
              }
              .sc-del:hover { color: #c0392b; transform: scale(1.15); }

              /* ── FOOTER (Always Fixed at Bottom) ── */
              .sc-footer {
                padding: 20px 24px;
                border-top: 1px solid #f0ece6;
                background: #fff;
                flex-shrink: 0; /* Prevents the footer from squishing */
              }
              .sc-subtotal {
                display: flex; justify-content: space-between; align-items: baseline;
                margin-bottom: 6px;
              }
              .sc-subtotal-lbl {
                font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
                color: #aaa; font-weight: 400;
              }
              .sc-subtotal-val {
                font-family: 'DM Serif Display', serif;
                font-size: 22px; font-weight: 400; color: #1a1a1a;
              }
              .sc-shipping-note {
                font-size: 10px; font-weight: 300; color: #b18d2b;
                margin: 0 0 16px; text-align: right;
              }
              .sc-btn-checkout {
                display: flex; align-items: center; justify-content: center; gap: 8px;
                width: 100%; padding: 14px;
                background: #1a1a1a; color: #fff;
                font-family: 'DM Sans', sans-serif;
                font-size: 10px; font-weight: 500;
                letter-spacing: 0.3em; text-transform: uppercase;
                text-decoration: none; margin-bottom: 12px;
                transition: background 0.35s, letter-spacing 0.3s;
                border: none; cursor: pointer;
              }
              .sc-btn-checkout:hover { background: #b18d2b; letter-spacing: 0.38em; }
              .sc-btn-viewcart {
                display: block; text-align: center;
                font-size: 10px; font-weight: 300; letter-spacing: 0.2em;
                text-transform: uppercase; color: #888;
                text-decoration: none;
                transition: color 0.3s;
              }
              .sc-btn-viewcart:hover { color: #b18d2b; }

              @media (max-width: 480px) {
                .sc-drawer { width: 100%; }
                .sc-title { font-size: 22px; }
                .sc-footer { padding-bottom: 30px; } /* Extra space for mobile home bars */
              }
            `}</style>

            {/* HEADER */}
            <div className="sc-header">
              <div className="sc-header-left">
                <h2 className="sc-title">Your <em>Cart</em></h2>
                <span className="sc-count">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
              <button className="sc-close" onClick={onClose} aria-label="Close cart">
                <X size={18} />
              </button>
            </div>

            {/* SCROLLABLE ITEMS */}
            <div className="sc-items">
              {items.length === 0 ? (
                <div className="sc-empty">
                  <ShoppingBag size={44} className="sc-empty-icon" />
                  <h3 className="sc-empty-title">Your cart is empty</h3>
                  <p className="sc-empty-sub">Discover our handcrafted collections.</p>
                  <Link href="/collections" className="sc-empty-link" onClick={onClose}>
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.category}-${item.id}`}
                      className="sc-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, height: 0, padding: 0, margin: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <div className="sc-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="sc-item-body">
                        <p className="sc-item-cat">{item.category}</p>
                        <h3 className="sc-item-name">{item.name}</h3>
                        <p className="sc-item-meta">
                          {item.material}{item.stone ? ` · ${item.stone}` : ""}
                        </p>
                        <p className="sc-item-price">${item.price.toLocaleString()}</p>
                        <div className="sc-item-actions">
                          <div className="sc-qty">
                            <button className="sc-qty-btn"
                              onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}>
                              <Minus size={10} />
                            </button>
                            <span className="sc-qty-val">{item.quantity}</span>
                            <button className="sc-qty-btn"
                              onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}>
                              <Plus size={10} />
                            </button>
                          </div>
                          <button className="sc-del"
                            onClick={() => removeFromCart(item.id, item.category)}
                            aria-label="Remove item">
                            <Trash2 size={15} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* FIXED FOOTER */}
            {items.length > 0 && (
              <div className="sc-footer">
                <div className="sc-subtotal">
                  <span className="sc-subtotal-lbl">Subtotal</span>
                  <span className="sc-subtotal-val">${totalPrice.toLocaleString()}</span>
                </div>
                <p className="sc-shipping-note">
                  {totalPrice >= 3000 ? "✓ Free shipping applied" : `Add $${(3000 - totalPrice).toLocaleString()} more for free shipping`}
                </p>
                <Link href="/cart" className="sc-btn-checkout" onClick={onClose}>
                  Proceed to Checkout
                </Link>
                <Link href="/cart" className="sc-btn-viewcart" onClick={onClose}>
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}