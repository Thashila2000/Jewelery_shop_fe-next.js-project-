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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BLURRED OVERLAY */}
          <motion.div
            className="side-cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className="side-cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <style>{`
              .side-cart-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                z-index: 999;
              }

              .side-cart-drawer {
                position: fixed;
                top: 0;
                right: 0;
                width: 420px;
                height: 100vh;
                background: #ffffff;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                box-shadow: -10px 0 50px rgba(0,0,0,0.1);
              }

              .side-cart-header {
                padding: 30px 24px;
                border-bottom: 1px solid #f0ece6;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              .side-cart-title {
                font-family: 'Cormorant Garamond', serif;
                font-size: 28px;
                font-weight: 500;
                margin: 0;
                color: #1a1a1a;
              }

              .side-cart-title em {
                font-style: italic;
                color: #b18d2b;
              }

              .close-btn {
                background: none;
                border: none;
                cursor: pointer;
                color: #1a1a1a;
                padding: 5px;
              }

              .side-cart-items {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
              }

              .side-cart-item {
                display: flex;
                gap: 16px;
                padding-bottom: 20px;
                margin-bottom: 20px;
                border-bottom: 1px solid #f5f3ef;
              }

              .side-cart-img {
                width: 80px;
                height: 100px;
                background: #f7f7f7;
                overflow: hidden;
                flex-shrink: 0;
              }

              .side-cart-img img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              .item-details { flex: 1; position: relative; }

              .item-name {
                font-family: 'Cormorant Garamond', serif;
                font-size: 18px;
                font-weight: 500;
                margin: 0 0 4px;
                color: #1a1a1a;
              }

              .item-price {
                font-family: 'DM Sans', sans-serif;
                font-size: 14px;
                font-weight: 500;
                color: #444;
                margin-bottom: 12px;
              }

              .item-actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: auto;
              }

              .qty-mini {
                display: flex;
                align-items: center;
                border: 1px solid #e8e4de;
                width: fit-content;
              }

              .qty-mini-btn {
                background: none;
                border: none;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #1a1a1a;
              }

              .qty-mini-val {
                width: 30px;
                text-align: center;
                font-size: 12px;
                color: #1a1a1a;
              }

              .item-delete-btn {
                background: none;
                border: none;
                color: #1a1a1a;
                cursor: pointer;
                opacity: 0.4;
                transition: all 0.3s ease;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .item-delete-btn:hover {
                color: #c0392b;
                opacity: 1;
                transform: scale(1.1);
              }

              .side-cart-footer {
                padding: 24px;
                background: #fff;
                border-top: 1px solid #f0ece6;
              }

              .side-cart-total-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                color: #1a1a1a;
              }

              .total-val {
                font-family: 'Cormorant Garamond', serif;
                font-size: 24px;
                font-weight: 600;
              }

              .btn-checkout {
                display: block;
                background: #1a1a1a;
                color: #fff;
                text-align: center;
                padding: 16px;
                font-size: 11px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                text-decoration: none;
                margin-bottom: 10px;
                transition: background 0.3s;
              }

              .btn-checkout:hover { background: #b18d2b; }

              .btn-view-cart {
                display: block;
                text-align: center;
                font-size: 10px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: #1a1a1a;
                text-decoration: underline;
                text-underline-offset: 4px;
              }

              /* ── MOBILE OVERRIDES ── */
              @media (max-width: 768px) {
                .side-cart-drawer {
                  width: 85%;
                }
                .side-cart-title {
                  font-size: 24px;
                }
              }
            `}</style>

            <div className="side-cart-header">
              <h2 className="side-cart-title">Your <em>Cart</em></h2>
              <button className="close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="side-cart-items">
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                  <ShoppingBag size={40} style={{ color: '#eee', marginBottom: '15px' }} />
                  <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', color: '#999' }}>
                    Your cart is currently empty
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={`${item.category}-${item.id}`} 
                      className="side-cart-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                    >
                      <div className="side-cart-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">${item.price.toLocaleString()}</p>
                        
                        <div className="item-actions">
                          <div className="qty-mini">
                            <button 
                              className="qty-mini-btn" 
                              onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="qty-mini-val">{item.quantity}</span>
                            <button 
                              className="qty-mini-btn" 
                              onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <button 
                            className="item-delete-btn"
                            title="Remove item"
                            onClick={() => removeFromCart(item.id, item.category)}
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="side-cart-footer">
                <div className="side-cart-total-row">
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>Subtotal</span>
                  <span className="total-val">${totalPrice.toLocaleString()}</span>
                </div>
                <Link href="/checkout" className="btn-checkout" onClick={onClose}>
                  Checkout
                </Link>
                <Link href="/cart" className="btn-view-cart" onClick={onClose}>
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