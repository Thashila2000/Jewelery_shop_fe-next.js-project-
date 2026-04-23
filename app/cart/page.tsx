"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield, Truck, RotateCcw, ChevronRight, Check } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [promoCode, setPromoCode]   = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkedOut,  setCheckedOut]  = useState(false);

  const VALID_PROMO = "GOLD10";
  const discount    = promoApplied ? totalPrice * 0.10 : 0;
  const shipping    = totalPrice > 3000 ? 0 : 25;
  const grandTotal  = totalPrice - discount + shipping;

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cart-page {
          background: #faf9f7;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          padding-top: 80px;
        }

        /* ── HEADER ── */
        .cart-header {
          padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem) 0;
          border-bottom: 1px solid #e8e4de;
          margin-bottom: 0;
        }
        .cart-crumb {
          font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
          color: #bbb; margin-bottom: 20px;
        }
        .cart-crumb a { color: inherit; text-decoration: none; transition: color 0.3s; }
        .cart-crumb a:hover { color: #b18d2b; }
        .cart-title-row {
          display: flex; align-items: baseline; justify-content: space-between;
          padding-bottom: 28px; gap: 16px; flex-wrap: wrap;
        }
        .cart-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 400; font-style: italic; line-height: 1;
          color: #1a1a1a; margin: 0;
        }
        .cart-title span { color: #b18d2b; }
        .cart-item-count {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #999;
        }

        /* ── LAYOUT ── */
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: clamp(2rem, 4vw, 4rem);
          padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 6vw, 5rem) 100px;
          max-width: 1400px;
          margin: 0 auto;
          align-items: start;
        }

        /* ── ITEMS LIST ── */
        .cart-items { display: flex; flex-direction: column; gap: 0; }

        .cart-cols {
          display: grid;
          grid-template-columns: 1fr 100px 120px 40px;
          gap: 16px; align-items: center;
          padding: 0 0 12px;
          border-bottom: 1px solid #e8e4de;
          margin-bottom: 4px;
        }
        .cart-col-lbl {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: #bbb;
        }
        .cart-col-lbl:not(:first-child) { text-align: center; }
        .cart-col-lbl:last-child { text-align: right; }

        .cart-item {
          display: grid;
          grid-template-columns: 1fr 100px 120px 40px;
          gap: 16px; align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid #f0ece6;
        }

        .cart-item-info { display: flex; gap: 18px; align-items: flex-start; }
        .cart-item-img {
          width: 88px; height: 88px; flex-shrink: 0;
          overflow: hidden; background: #f5f3ef;
          border: 1px solid #ece8e1;
        }
        .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
        .cart-item-details { flex: 1; }
        .cart-item-cat {
          font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #b18d2b; margin: 0 0 4px;
        }
        .cart-item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px, 1.5vw, 18px); font-weight: 500;
          color: #1a1a1a; margin: 0 0 5px; line-height: 1.2;
        }
        .cart-item-meta {
          font-size: 11px; font-weight: 300; color: #999; line-height: 1.5;
        }
        .cart-item-remove {
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: #ccc; background: none; border: none; cursor: pointer;
          padding: 0; margin-top: 10px; display: block;
          transition: color 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .cart-item-remove:hover { color: #c0392b; }

        /* Unit price */
        .cart-item-price {
          font-family: 'DM Serif Display', serif;
          font-size: 18px; font-weight: 400; color: #1a1a1a;
          text-align: center;
        }

        /* Qty control */
        .cart-qty {
          display: flex; align-items: center; justify-content: center; gap: 0;
          border: 1px solid #e0dbd4;
        }
        .cart-qty-btn {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; color: #777;
          transition: background 0.2s, color 0.2s;
        }
        .cart-qty-btn:hover { background: #f5f3ef; color: #1a1a1a; }
        .cart-qty-val {
          width: 36px; text-align: center;
          font-size: 13px; font-weight: 400; color: #1a1a1a;
          border-left: 1px solid #e0dbd4; border-right: 1px solid #e0dbd4;
          height: 32px; line-height: 32px;
        }

        /* Line total */
        .cart-item-total {
          font-family: 'DM Serif Display', serif;
          font-size: 18px; color: #1a1a1a; text-align: right;
        }

        /* Delete btn */
        .cart-delete {
          display: flex; align-items: center; justify-content: flex-end;
          background: none; border: none; cursor: pointer; color: #ccc;
          transition: color 0.3s, transform 0.2s;
          padding: 0;
        }
        .cart-delete:hover { color: #c0392b; transform: scale(1.15); }

        /* Cart footer row */
        .cart-footer-row {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 24px; flex-wrap: wrap; gap: 12px;
        }
        .cart-clear {
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          color: #bbb; background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: color 0.3s;
          padding: 0;
        }
        .cart-clear:hover { color: #c0392b; }
        .cart-continue {
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          color: #b18d2b; text-decoration: none; display: flex; align-items: center; gap: 6px;
          transition: gap 0.3s;
        }
        .cart-continue:hover { gap: 10px; }

        /* ── SUMMARY ── */
        .cart-summary {
          background: #fff;
          border: 1px solid #e8e4de;
          padding: 32px 28px;
          display: flex; flex-direction: column; gap: 0;
          position: sticky; top: 100px;
        }
        .cart-summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 400; font-style: italic;
          color: #1a1a1a; margin: 0 0 24px;
        }

        .cart-summary-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 10px 0; border-bottom: 1px solid #f5f3ef;
          font-size: 13px; font-weight: 300; color: #555;
        }
        .cart-summary-row:last-of-type { border-bottom: none; }
        .cart-summary-row.total {
          padding-top: 16px; margin-top: 8px;
          border-top: 1px solid #e8e4de; border-bottom: none;
        }
        .cart-summary-row.total .lbl {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          font-weight: 400; color: #1a1a1a;
        }
        .cart-summary-row.total .val {
          font-family: 'DM Serif Display', serif;
          font-size: 26px; color: #1a1a1a;
        }
        .cart-discount-val { color: #3a9a5c; }
        .cart-shipping-free { color: #3a9a5c; font-size: 11px; }

        /* Promo code */
        .cart-promo { margin: 20px 0 24px; }
        .cart-promo-lbl {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #aaa; display: flex; align-items: center; gap: 6px; margin-bottom: 10px;
        }
        .cart-promo-row { display: flex; gap: 0; }
        .cart-promo-input {
          flex: 1; height: 40px; padding: 0 14px;
          border: 1px solid #ddd; border-right: none;
          font-family: 'DM Sans', sans-serif; font-size: 12px; color: #1a1a1a;
          background: #faf9f7; outline: none; border-radius: 0;
          transition: border-color 0.3s;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .cart-promo-input:focus { border-color: #b18d2b; }
        .cart-promo-input.error { border-color: #c0392b; }
        .cart-promo-input.success { border-color: #3a9a5c; }
        .cart-promo-btn {
          height: 40px; padding: 0 16px;
          background: #1a1a1a; color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          letter-spacing: 0.25em; text-transform: uppercase;
          transition: background 0.3s;
          white-space: nowrap;
        }
        .cart-promo-btn:hover { background: #b18d2b; }
        .cart-promo-msg {
          font-size: 11px; margin-top: 7px;
        }
        .cart-promo-msg.success { color: #3a9a5c; }
        .cart-promo-msg.error   { color: #c0392b; }

        /* Checkout btn */
        .cart-checkout {
          width: 100%; height: 52px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase;
          background: #1a1a1a; color: #fff; border: none;
          cursor: pointer; transition: background 0.4s, letter-spacing 0.3s;
          margin-bottom: 16px;
        }
        .cart-checkout:hover:not(:disabled) { background: #b18d2b; letter-spacing: 0.4em; }
        .cart-checkout:disabled { opacity: 0.6; cursor: default; }
        .cart-checkout-done { background: #2d6e45 !important; }

        /* Trust badges */
        .cart-trust {
          display: flex; flex-direction: column; gap: 8px;
          padding-top: 16px; border-top: 1px solid #f0ece6;
        }
        .cart-trust-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 300; color: #888;
        }
        .cart-trust-item svg { color: #b18d2b; flex-shrink: 0; }

        /* Spin */
        .cart-spin { animation: cartspin 0.8s linear infinite; }
        @keyframes cartspin { to { transform: rotate(360deg); } }

        /* ── EMPTY STATE ── */
        .cart-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 20px;
          padding: 100px 24px; text-align: center;
        }
        .cart-empty-icon { color: #ddd; margin-bottom: 8px; }
        .cart-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 400; font-style: italic;
          color: #1a1a1a; margin: 0;
        }
        .cart-empty-sub {
          font-size: 13px; font-weight: 300; color: #999; margin: 0;
        }
        .cart-empty-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px;
          background: #1a1a1a; color: #fff; text-decoration: none;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase;
          transition: background 0.3s;
          margin-top: 8px;
        }
        .cart-empty-btn:hover { background: #b18d2b; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-summary { position: static; }
        }
        @media (max-width: 640px) {
          .cart-page { padding-top: 64px; }
          .cart-header { padding: 1.5rem 1rem 0; }
          .cart-layout { padding: 1.5rem 1rem 80px; gap: 2rem; }
          .cart-cols { display: none; }
          .cart-item {
            grid-template-columns: 1fr;
            gap: 12px; padding: 20px 0;
          }
          .cart-item-price { text-align: left; font-size: 20px; }
          .cart-qty { justify-content: flex-start; }
          .cart-item-total { text-align: left; font-size: 20px; }
          .cart-delete { justify-content: flex-start; }
          .cart-summary { padding: 24px 20px; }
        }
      `}</style>

      <div className="cart-page">

        {/* HEADER */}
        <div className="cart-header">
          <p className="cart-crumb">
            <Link href="/">Home</Link>{" / "}
            <Link href="/collections">Collections</Link>{" / "}
            <span style={{ color: "#b18d2b" }}>Cart</span>
          </p>
          <div className="cart-title-row">
            <h1 className="cart-title">Your <span>Cart</span></h1>
            <span className="cart-item-count">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
          </div>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && !checkedOut && (
          <div className="cart-empty">
            <ShoppingBag size={64} className="cart-empty-icon" />
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-sub">Discover our handcrafted collections and find your perfect piece.</p>
            <Link href="/collections" className="cart-empty-btn">
              Browse Collections <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* CHECKED OUT STATE */}
        {checkedOut && (
          <div className="cart-empty">
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#2d6e45", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
              <Check size={32} color="#fff" />
            </div>
            <h2 className="cart-empty-title">Order Placed!</h2>
            <p className="cart-empty-sub">Thank you for your order. We'll be in touch shortly with confirmation details.</p>
            <Link href="/collections" className="cart-empty-btn">
              Continue Shopping <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* CART LAYOUT */}
        {items.length > 0 && !checkedOut && (
          <div className="cart-layout">

            {/* ── ITEMS ── */}
            <div className="cart-items">
              {/* Column headers */}
              <div className="cart-cols">
                <span className="cart-col-lbl">Product</span>
                <span className="cart-col-lbl">Price</span>
                <span className="cart-col-lbl">Quantity</span>
                <span className="cart-col-lbl">Total</span>
              </div>

              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={`${item.category}-${item.id}`}
                    className="cart-item"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0, padding: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35 }}
                    layout
                  >
                    {/* Product info */}
                    <div className="cart-item-info">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-cat">{item.category}</p>
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-meta">
                          {item.material}{item.stone ? ` · ${item.stone}` : ""}
                        </p>
                        <button
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.id, item.category)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Unit price */}
                    <div className="cart-item-price">${item.price.toLocaleString()}</div>

                    {/* Quantity */}
                    <div className="cart-qty">
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Line total + delete */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <div className="cart-item-total">${(item.price * item.quantity).toLocaleString()}</div>
                      <button className="cart-delete" onClick={() => removeFromCart(item.id, item.category)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Footer row */}
              <div className="cart-footer-row">
                <button className="cart-clear" onClick={clearCart}>Clear Cart</button>
                <Link href="/collections" className="cart-continue">
                  Continue Shopping <ChevronRight size={13} />
                </Link>
              </div>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>

              {promoApplied && (
                <div className="cart-summary-row">
                  <span>Discount (GOLD10)</span>
                  <span className="cart-discount-val">−${discount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
              )}

              <div className="cart-summary-row">
                <span>Shipping</span>
                {shipping === 0
                  ? <span className="cart-shipping-free">Free</span>
                  : <span>${shipping}</span>
                }
              </div>

              {shipping > 0 && (
                <div style={{ fontSize: 11, color: "#b18d2b", padding: "6px 0 4px", fontWeight: 300 }}>
                  Add ${(3000 - totalPrice).toLocaleString()} more for free shipping
                </div>
              )}

              <div className="cart-summary-row total">
                <span className="lbl">Total</span>
                <span className="val">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>

              {/* Promo code */}
              <div className="cart-promo">
                <p className="cart-promo-lbl"><Tag size={11} /> Promo Code</p>
                <div className="cart-promo-row">
                  <input
                    className={`cart-promo-input${promoError ? " error" : ""}${promoApplied ? " success" : ""}`}
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value); setPromoError(false); }}
                    placeholder="ENTER CODE"
                    disabled={promoApplied}
                    onKeyDown={e => e.key === "Enter" && applyPromo()}
                  />
                  <button className="cart-promo-btn" onClick={applyPromo} disabled={promoApplied}>
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoApplied && <p className="cart-promo-msg success">✓ 10% discount applied</p>}
                {promoError   && <p className="cart-promo-msg error">Invalid promo code</p>}
                {!promoApplied && !promoError && <p style={{ fontSize: 10, color: "#ccc", marginTop: 6 }}>Try: GOLD10</p>}
              </div>

              {/* Checkout button */}
              <button
                className={`cart-checkout${checkedOut ? " cart-checkout-done" : ""}`}
                onClick={handleCheckout}
                disabled={checkingOut || checkedOut}
              >
                {checkingOut
                  ? <><span className="cart-spin" style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} /> Processing…</>
                  : checkedOut
                    ? <><Check size={14} /> Order Confirmed</>
                    : <>Proceed to Checkout <ArrowRight size={14} /></>
                }
              </button>

              {/* Trust badges */}
              <div className="cart-trust">
                <div className="cart-trust-item"><Shield size={13} /> SSL secure checkout</div>
                <div className="cart-trust-item"><Truck size={13} /> Free shipping over $3,000</div>
                <div className="cart-trust-item"><RotateCcw size={13} /> 30-day returns</div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
