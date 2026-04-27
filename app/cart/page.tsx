"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield, Truck, ChevronRight, Check } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [promoCode, setPromoCode]   = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkedOut,  setCheckedOut]  = useState(false);

  const VALID_PROMO = "GOLD10";
  const discount     = promoApplied ? totalPrice * 0.10 : 0;
  const shipping     = totalPrice > 3000 ? 0 : 25;
  const grandTotal   = totalPrice - discount + shipping;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => { setCheckingOut(false); setCheckedOut(true); }, 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display@0;1&display=swap');
        
        *, *::before, *::after { box-sizing: border-box; }

        .cart-page {
          background: #ffffff;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          padding-top: 60px;
          overflow-x: hidden;
        }

        /* ── HEADER ── */
        .cart-header { 
          text-align: center; 
          padding: 60px 24px 70px; 
          position: relative; 
        }
        .cart-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 500; 
          line-height: 0.9;
          letter-spacing: -0.01em; 
          color: #1a1a1a; 
          margin-bottom: 24px;
        }
        .cart-title em { 
          font-style: italic; 
          color: #b18d2b; 
          font-weight: 500; 
        }
        .cart-divider { 
          height: 2px; 
          width: 80px; 
          margin: 0 auto 32px; 
          background: #b18d2b; 
        }
        .cart-subtitle {
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

        /* ── LAYOUT ── */
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: clamp(1.5rem, 4vw, 4rem);
          padding: 0 clamp(1rem, 6vw, 5rem) 100px;
          max-width: 1440px;
          margin: 0 auto;
          align-items: start;
        }

        /* ── ITEMS LIST ── */
        .cart-items { display: flex; flex-direction: column; gap: 0; }

        .cart-cols {
          display: grid;
          grid-template-columns: 1fr 100px 140px 120px; /* Adjusted last col for delete btn */
          gap: 20px; align-items: center;
          padding: 0 0 15px;
          border-bottom: 1px solid #e8e4de;
          margin-bottom: 5px;
        }
        .cart-col-lbl {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #999;
        }
        .cart-col-lbl:not(:first-child) { text-align: center; }
        .cart-col-lbl:last-child { text-align: right; padding-right: 10px; }

        .cart-item {
          display: grid;
          grid-template-columns: 1fr 100px 140px 120px;
          gap: 20px; align-items: center;
          padding: 30px 0;
          border-bottom: 1px solid #f0ece6;
        }

        .cart-item-info { display: flex; gap: 24px; align-items: center; }
        .cart-item-img {
          width: 90px; height: 110px; flex-shrink: 0;
          overflow: hidden; background: #f9f8f6;
          border: 1px solid #ece8e1;
          border-radius: 1px;
        }
        .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
        
        .cart-item-cat {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #b18d2b; margin: 0 0 6px;
        }
        .cart-item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 500;
          color: #1a1a1a; margin: 0 0 4px; line-height: 1.2;
        }
        .cart-item-meta {
          font-size: 12px; font-weight: 300; color: #888;
        }

        .cart-item-price {
          font-size: 16px; font-weight: 400; color: #1a1a1a;
          text-align: center;
        }

        .cart-qty {
          display: flex; align-items: center; justify-content: center;
          border: 1px solid #e0dbd4;
          width: fit-content;
          margin: 0 auto;
        }
        .cart-qty-btn {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; color: #1a1a1a;
          transition: background 0.2s;
        }
        .cart-qty-btn:hover { background: #f5f3ef; }
        .cart-qty-val {
          width: 40px; text-align: center;
          font-size: 14px; font-weight: 400; color: #1a1a1a;
          border-left: 1px solid #e0dbd4; border-right: 1px solid #e0dbd4;
          height: 34px; line-height: 34px;
        }

        /* ── UPDATED TOTAL + DELETE ALIGNMENT ── */
        .cart-total-group {
          display: flex; 
          align-items: center; 
          justify-content: flex-end; 
          gap: 15px; /* Space between price and trash icon */
        }
        .cart-item-total {
          font-family: 'DM Serif Display', serif;
          font-size: 19px; color: #1a1a1a;
        }
        .cart-delete {
          background: none; border: none; cursor: pointer; color: #ccc;
          transition: color 0.3s, transform 0.2s; padding: 5px;
          display: flex; align-items: center; justify-content: center;
        }
        .cart-delete:hover { color: #c0392b; transform: scale(1.1); }

        .cart-footer-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 32px;
        }
        .cart-clear {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #999; background: none; border: none; cursor: pointer;
          transition: color 0.3s;
        }
        .cart-clear:hover { color: #c0392b; }
        .cart-continue {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #1a1a1a; text-decoration: underline; text-underline-offset: 4px;
          display: flex; align-items: center; gap: 8px;
        }

        /* ── SUMMARY ── */
        .cart-summary {
          background: #ffffff;
          border: 1px solid #e8e4de;
          padding: 40px;
          position: sticky; top: 120px;
          border-radius: 2px;
        }
        .cart-summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 400;
          color: #1a1a1a; margin: 0 0 30px;
        }
        .cart-summary-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 12px 0; border-bottom: 1px solid #f5f3ef;
          font-size: 14px; color: #555;
        }
        .cart-summary-row.total {
          padding-top: 24px; margin-top: 10px;
          border-top: 1px solid #1a1a1a; border-bottom: none;
        }
        .cart-summary-row.total .lbl {
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          font-weight: 500; color: #1a1a1a;
        }
        .cart-summary-row.total .val {
          font-family: 'DM Serif Display', serif;
          font-size: 32px; color: #1a1a1a;
        }

        .cart-promo { margin: 30px 0; }
        .cart-promo-lbl {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #888; margin-bottom: 12px;
        }
        .cart-promo-row { display: flex; }
        .cart-promo-input {
          flex: 1; height: 44px; padding: 0 15px;
          border: 1px solid #e8e4de; border-right: none;
          font-size: 13px; outline: none; background: #fff;
        }
        .cart-promo-btn {
          height: 44px; padding: 0 20px;
          background: #1a1a1a; color: #fff; border: none; cursor: pointer;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
        }

        .cart-checkout {
          width: 100%; height: 56px;
          background: #1a1a1a; color: #fff; border: none;
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          cursor: pointer; transition: background 0.3s;
          margin-bottom: 20px;
        }
        .cart-checkout:hover { background: #b18d2b; }

        .cart-trust {
          display: flex; flex-direction: column; gap: 10px;
          padding-top: 20px; border-top: 1px solid #f0ece6;
        }
        .cart-trust-item { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #888; }

        @media (max-width: 1024px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-summary { position: static; }
        }
        @media (max-width: 768px) {
          .cart-cols { display: none; }
          .cart-item { grid-template-columns: 1fr; text-align: center; }
          .cart-item-info { flex-direction: column; align-items: center; }
          .cart-qty { margin: 10px auto; }
          .cart-total-group { justify-content: center; margin-top: 10px; }
        }
      `}</style>

      <div className="cart-page">
        <motion.header className="cart-header">
          <h1 className="cart-title">Your <em>Cart</em></h1>
          <motion.div className="cart-divider" initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 0.5, duration: 0.8 }} />
          <p className="cart-subtitle">
            {totalItems} {totalItems === 1 ? "Handcrafted Piece" : "Handcrafted Masterpieces"} Ready for you
          </p>
        </motion.header>

        {items.length === 0 && !checkedOut && (
          <div style={{ textAlign: 'center', padding: '100px 24px' }}>
            <ShoppingBag size={64} strokeWidth={1} color="#ddd" />
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '36px', margin: '20px 0' }}>Your cart is empty</h2>
            <Link href="/collections" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 40px', background: '#1a1a1a', color: '#fff', textDecoration: 'none', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Browse Collections <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {items.length > 0 && !checkedOut && (
          <div className="cart-layout">
            <div className="cart-products">
              <div className="cart-cols">
                <span className="cart-col-lbl">Product</span>
                <span className="cart-col-lbl">Price</span>
                <span className="cart-col-lbl">Quantity</span>
                <span className="cart-col-lbl">Total</span>
              </div>

              <AnimatePresence>
                {items.map(item => (
                  <motion.div key={`${item.category}-${item.id}`} className="cart-item" exit={{ opacity: 0, x: -20 }} layout>
                    <div className="cart-item-info">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-cat">{item.category}</p>
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-meta">{item.material}</p>
                      </div>
                    </div>

                    <div className="cart-item-price">${item.price.toLocaleString()}</div>

                    <div className="cart-qty">
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-total-group">
                      <div className="cart-item-total">${(item.price * item.quantity).toLocaleString()}</div>
                      <button className="cart-delete" onClick={() => removeFromCart(item.id, item.category)}>
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="cart-footer-row">
                <button className="cart-clear" onClick={clearCart}>Clear Cart</button>
                <Link href="/collections" className="cart-continue">
                  Continue Shopping <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <aside className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                {shipping === 0 ? <span style={{ color: '#2d6e45' }}>Complimentary</span> : <span>${shipping}</span>}
              </div>
              <div className="cart-summary-row total">
                <span className="lbl">Total</span>
                <span className="val">${grandTotal.toLocaleString()}</span>
              </div>

              <div className="cart-promo">
                <p className="cart-promo-lbl">Promo Code</p>
                <div className="cart-promo-row">
                  <input className="cart-promo-input" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="ENTER CODE" />
                  <button className="cart-promo-btn" onClick={applyPromo}>Apply</button>
                </div>
              </div>

              <button className="cart-checkout" onClick={handleCheckout} disabled={checkingOut}>
                {checkingOut ? "Processing..." : "Proceed to Checkout"}
              </button>

              <div className="cart-trust">
                <div className="cart-trust-item"><Shield size={14} color="#b18d2b" /> SSL secure checkout</div>
                <div className="cart-trust-item"><Truck size={14} color="#b18d2b" /> Handcrafted Delivery</div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}