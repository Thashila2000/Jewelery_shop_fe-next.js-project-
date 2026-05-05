"use client";

import React, { useState } from "react";
import {
  Plus, Search, Edit, Trash2, ArrowUpRight,
  AlertTriangle, X
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const collectionsData = {
  rings: {
    products: [
      { id: 1, name: "Eternal Solitaire Band", sku: "RNG-001", price: 4800, badge: "Bestseller", stone: "Diamond (1.2ct)", material: "18K White Gold", karat: "18K", weight: 4.2, stock: 3, supplier: "De Beers Direct", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", tagline: "Timeless and pure", description: "A classic solitaire band crafted in 18K white gold.", details: ["18K White Gold setting", "Diamond 1.2ct round brilliant", "Size J–T available"], images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80"], careInstructions: "Clean with a soft brush and mild soap. Avoid harsh chemicals.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 2, name: "Sapphire Halo Ring", sku: "RNG-002", price: 6200, badge: "Limited", stone: "Blue Sapphire (2ct)", material: "18K Yellow Gold", karat: "18K", weight: 5.8, stock: 1, supplier: "Ceylon Gems Co.", image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80", tagline: "Royal blue brilliance", description: "A stunning Ceylon sapphire surrounded by a halo of pavé diamonds.", details: ["18K Yellow Gold", "Blue Sapphire 2ct", "Diamond halo 0.3ct total"], images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80"], careInstructions: "Avoid ultrasonic cleaners. Store in a soft pouch.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 3, name: "Pavé Diamond Band", sku: "RNG-003", price: 2900, badge: "New", stone: "Diamond (0.8ct)", material: "14K Rose Gold", karat: "14K", weight: 3.1, stock: 8, supplier: "Antwerp Gems", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", tagline: "Effortlessly luxurious", description: "Delicate rose gold band set with a continuous row of pavé diamonds.", details: ["14K Rose Gold", "Diamond 0.8ct total", "Stackable design"], images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80"], careInstructions: "Remove before exercise. Polish with a lint-free cloth.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 4, name: "Emerald Cut Trilogy", sku: "RNG-004", price: 9400, badge: null, stone: "Emerald (3ct)", material: "Platinum", karat: "PT950", weight: 7.4, stock: 2, supplier: "Colombian Emeralds", image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80", tagline: "Bold, verdant, rare", description: "Three emerald-cut Colombian emeralds set in PT950 platinum.", details: ["PT950 Platinum", "Colombian Emeralds 3ct total", "Three-stone setting"], images: ["https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80"], careInstructions: "Avoid steam cleaning. Use a damp soft cloth only.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 5, name: "Classic Gold Band", sku: "RNG-005", price: 1200, badge: null, stone: "Metal Only", material: "22K Yellow Gold", karat: "22K", weight: 6.0, stock: 15, supplier: "Kandy Goldsmith", image: "https://starkle.in/cdn/shop/products/IMG_7018_2.jpg?v=1705598706&width=3456https", tagline: "Pure and enduring", description: "A traditional 22K yellow gold band, handcrafted by artisans in Kandy.", details: ["22K Yellow Gold", "Comfort-fit interior", "Sizes H–Z available"], images: ["https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&q=80"], careInstructions: "Polish regularly with a gold cloth. Store away from other metals.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
    ]
  },
  necklaces: {
    products: [
      { id: 6, name: "Diamond Rivière", sku: "NCK-001", price: 12500, badge: "Limited", stone: "Diamond (5ct total)", material: "18K White Gold", karat: "18K", weight: 12.3, stock: 1, supplier: "De Beers Direct", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", tagline: "The pinnacle of elegance", description: "A continuous line of matched round brilliant diamonds in 18K white gold.", details: ["18K White Gold", "Diamonds 5ct total", "42cm length with 5cm extender"], images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80"], careInstructions: "Professional cleaning recommended annually.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 7, name: "Pearl Pendant Drop", sku: "NCK-002", price: 3400, badge: "New", stone: "Akoya Pearl (9mm)", material: "18K Yellow Gold", karat: "18K", weight: 8.1, stock: 6, supplier: "Mikimoto", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400&q=80", tagline: "Classic and serene", description: "A single Akoya pearl suspended from an 18K yellow gold chain.", details: ["18K Yellow Gold chain", "Akoya Pearl 9mm", "AAA lustre grade", "45cm chain length"], images: ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400&q=80"], careInstructions: "Remove before swimming. Wipe pearl with damp cloth after wear.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 8, name: "Ruby Heart Pendant", sku: "NCK-003", price: 5700, badge: "Bestseller", stone: "Ruby (1.5ct)", material: "14K Rose Gold", karat: "14K", weight: 6.4, stock: 4, supplier: "Burma Gems", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", tagline: "Passion set in gold", description: "A heart-shaped Burma ruby pendant framed by pavé diamonds in 14K rose gold.", details: ["14K Rose Gold", "Burma Ruby 1.5ct", "Diamond pavé surround 0.2ct"], images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"], careInstructions: "Avoid prolonged sun exposure. Clean gently with a soft cloth.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
    ]
  },
  bracelets: {
    products: [
      { id: 9, name: "Tennis Bracelet Classic", sku: "BRC-001", price: 8800, badge: "Bestseller", stone: "Diamond (3ct total)", material: "18K White Gold", karat: "18K", weight: 14.2, stock: 2, supplier: "Antwerp Gems", image: "https://images.unsplash.com/photo-1573408301185-9519f94ae8da?w=400&q=80", tagline: "Wrist-worthy brilliance", description: "A full eternity tennis bracelet set with matched round brilliant diamonds.", details: ["18K White Gold", "Diamonds 3ct total", "18cm length", "Box clasp with safety catch"], images: ["https://images.unsplash.com/photo-1573408301185-9519f94ae8da?w=400&q=80"], careInstructions: "Check clasps regularly. Professional ultrasonic cleaning recommended.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 10, name: "Gold Bangle Stack", sku: "BRC-002", price: 2100, badge: null, stone: "Metal Only", material: "22K Yellow Gold", karat: "22K", weight: 18.5, stock: 12, supplier: "Kandy Goldsmith", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", tagline: "Stack and shine", description: "A set of three hammered 22K yellow gold bangles, sold as a trio.", details: ["22K Yellow Gold", "Set of 3 bangles", "Internal diameter 6cm", "Hammered finish"], images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80"], careInstructions: "Store individually to avoid scratching. Polish with a gold cloth.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
    ]
  },
  earrings: {
    products: [
      { id: 11, name: "Diamond Stud Pair", sku: "EAR-001", price: 3200, badge: "Bestseller", stone: "Diamond (0.5ct each)", material: "18K White Gold", karat: "18K", weight: 2.1, stock: 9, supplier: "De Beers Direct", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80", tagline: "Everyday brilliance", description: "Classic round brilliant diamond studs in 18K white gold with secure screw backs.", details: ["18K White Gold", "Diamond 0.5ct each (1ct pair)", "Screw-back fastenings", "For pierced ears"], images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80"], careInstructions: "Clean with warm soapy water and a soft brush. Dry thoroughly.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
      { id: 12, name: "Chandelier Sapphire", sku: "EAR-002", price: 7600, badge: "Limited", stone: "Sapphire (4ct total)", material: "18K Yellow Gold", karat: "18K", weight: 9.8, stock: 1, supplier: "Ceylon Gems Co.", image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80", tagline: "Statement splendour", description: "Cascading Ceylon sapphires in a multi-tier chandelier setting of 18K yellow gold.", details: ["18K Yellow Gold", "Ceylon Sapphires 4ct total", "Drop length: 6cm", "For pierced ears"], images: ["https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80"], careInstructions: "Avoid ultrasonic cleaners. Store flat to prevent tangling.", deliveryInfo: "Complimentary insured delivery in 3–5 business days." },
    ]
  }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const BADGE_STYLE = {
  New:        { bg: "#ecfdf5", color: "#065f46", border: "#6ee7b7" },
  Bestseller: { bg: "#fffbeb", color: "#92400e", border: "#fcd34d" },
  Limited:    { bg: "#fff1f2", color: "#9f1239", border: "#fda4af" },
};

function stockInfo(qty: number) {
  if (qty === 0) return { label: "Out of stock", bg: "#fff1f2", color: "#be123c", border: "#fecdd3", dot: "#e11d48", alert: true };
  if (qty <= 2)  return { label: `Only ${qty} left`, bg: "#fffbeb", color: "#b45309", border: "#fde68a", dot: "#d97706", alert: true };
  return           { label: `${qty} in stock`, bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", dot: "#16a34a", alert: false };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: any; sub?: string }) {
  return (
    <div style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 12, padding: "16px 18px" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 6px" }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 700, color: "#b18d2b", margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: "#999", marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onEdit, onDelete }: { product: any; onEdit: (p: any) => void; onDelete: (id: any) => void }) {
  const [hovered, setHovered] = useState(false);
  const badge = product.badge ? BADGE_STYLE[product.badge as keyof typeof BADGE_STYLE] : null;
  const stock = stockInfo(product.stock);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `0.5px solid ${hovered ? "#b18d2b" : "#e8e3d8"}`,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered ? "0 6px 28px rgba(177,141,43,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, background: "#f5f3ee", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={product.images?.[0] ?? product.image}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {badge && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4,
            border: `0.5px solid ${badge.border}`,
            background: badge.bg, color: badge.color,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            {product.badge}
          </span>
        )}
        {stock.alert && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: "#ffffff", borderRadius: 6, padding: "4px 6px",
            border: "0.5px solid #e8e3d8", display: "flex", alignItems: "center",
          }}>
            <AlertTriangle size={11} color={stock.dot} />
          </span>
        )}
        <button
          onClick={() => onEdit(product)}
          style={{
            position: "absolute", bottom: 10, right: 10,
            background: "#ffffff", border: "0.5px solid #e8e3d8",
            borderRadius: 7, padding: "6px 8px", cursor: "pointer",
            opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
            display: "flex", alignItems: "center",
          }}
        >
          <Edit size={12} color="#b18d2b" />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 14px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 10, background: "#ffffff" }}>

        {/* Name + SKU */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", lineHeight: 1.35, margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {product.name}
          </p>
          <p style={{ fontSize: 10, color: "#999", letterSpacing: "0.14em", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>
            {product.sku}
          </p>
        </div>

        {/* Price */}
        <p style={{ fontSize: 17, fontWeight: 800, color: "#b18d2b", letterSpacing: "-0.02em", margin: 0 }}>
          ${product.price.toLocaleString()}
        </p>

        {/* Attribute grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px",
          background: "#faf8f3", borderRadius: 8, padding: "10px 12px",
          border: "0.5px solid #ede8db",
        }}>
          {[
            ["Karat",    product.karat],
            ["Weight",   `${product.weight}g`],
            ["Stone",    product.stone],
            ["Supplier", product.supplier],
          ].map(([k, v]) => (
            <div key={k} style={{ minWidth: 0 }}>
              <p style={{ fontSize: 9, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 3px" }}>{k}</p>
              <p style={{ fontSize: 12, color: "#2d2520", fontWeight: 600, margin: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>{v}</p>
            </div>
          ))}
        </div>

        {/* Stock pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "7px 10px",
          background: stock.bg,
          border: `0.5px solid ${stock.border}`,
          borderRadius: 8,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: stock.dot, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: stock.color }}>{stock.label}</span>
          {stock.alert && <AlertTriangle size={11} style={{ marginLeft: "auto" }} color={stock.dot} />}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 9, borderTop: "0.5px solid #ede8db", marginTop: "auto" }}>
          <button
            onClick={() => onDelete(product.id)}
            onMouseEnter={e => e.currentTarget.style.color = "#e11d48"}
            onMouseLeave={e => e.currentTarget.style.color = "#bbb"}
            style={{ fontSize: 10, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", background: "none", border: "none", padding: 0, transition: "color 0.15s" }}
          >
            <Trash2 size={11} /> Remove
          </button>
          <button style={{ fontSize: 10, fontWeight: 800, color: "#b18d2b", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 3, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
            View <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared input / textarea styles ──────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  fontSize: 13, fontWeight: 500,
  color: "#1a1109",
  padding: "9px 12px",
  borderRadius: 8,
  border: "0.5px solid #d9d0bc",
  background: "#faf8f3",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "#b18d2b";
  e.target.style.boxShadow = "0 0 0 3px rgba(177,141,43,0.12)";
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "#d9d0bc";
  e.target.style.boxShadow = "none";
};

// ─── EMPTY form state ─────────────────────────────────────────────────────────
const EMPTY = {
  name: "", sku: "", price: "", badge: "",
  stone: "", material: "", karat: "18K",
  weight: "", stock: "", supplier: "",
  // primary image (kept for backward compat with card display)
  image: "",
  // new fields
  tagline: "",
  description: "",
  details: "",        // textarea — newline-separated; split to string[] on save
  image2: "",         // images[1]
  image3: "",         // images[2]
  careInstructions: "",
  deliveryInfo: "",
};

type FormState = typeof EMPTY;

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: any;
  onClose: () => void;
  onSave: (f: any) => void;
}) {
  // Initialise form — reverse-map saved product fields back to flat form state
  const [form, setForm] = useState<FormState>(() => {
    if (!product) return EMPTY;
    return {
      ...EMPTY,
      ...product,
      // details array → newline-joined string for the textarea
      details: Array.isArray(product.details)
        ? product.details.join("\n")
        : (product.details ?? ""),
      // images array → three separate URL fields
      image:  product.images?.[0] ?? product.image ?? "",
      image2: product.images?.[1] ?? "",
      image3: product.images?.[2] ?? "",
    };
  });

  // Generic setter for plain text/number inputs
  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  // Setter for textareas
  const setArea = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  // Field definitions: [key, label, type, fullWidth]
  // type: "text" | "number" | "textarea"
  const fields: [keyof FormState, string, "text" | "number" | "textarea", boolean][] = [
    ["name",             "Product Name",                      "text",     true],
    ["sku",              "SKU",                               "text",     false],
    ["tagline",          "Tagline",                           "text",     true],
    ["price",            "Price (USD)",                       "number",   false],
    ["karat",            "Karat",                             "text",     false],
    ["weight",           "Weight (g)",                        "number",   false],
    ["stone",            "Stone",                             "text",     false],
    ["material",         "Material",                          "text",     false],
    ["supplier",         "Supplier",                          "text",     false],
    ["stock",            "Stock Qty",                         "number",   false],
    ["badge",            "Badge (New / Bestseller / Limited)","text",     true],
    ["image",            "Primary Image URL",                 "text",     true],
    ["image2",           "Image 2 URL",                       "text",     true],
    ["image3",           "Image 3 URL",                       "text",     true],
    ["description",      "Description",                       "textarea", true],
    ["details",          "Details (one detail per line)",     "textarea", true],
    ["careInstructions", "Care Instructions",                 "textarea", true],
    ["deliveryInfo",     "Delivery Info",                     "text",     true],
  ];

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#a08c5b",
    marginBottom: 6,
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(20,15,5,0.55)",
      zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: 16,
        border: "0.5px solid #d9d0bc",
        width: "100%", maxWidth: 580,
        maxHeight: "90vh", overflowY: "auto",
        padding: "28px 28px 24px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1109", margin: 0 }}>
              {product ? "Edit piece" : "Add new piece"}
            </h2>
            <p style={{ fontSize: 10, color: "#a08c5b", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>
              KANDY Luxury Asset Management
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4, display: "flex" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {fields.map(([key, label, type, full]) => (
            <div key={key} style={{ gridColumn: full ? "1 / -1" : "auto" }}>
              <label style={labelStyle}>{label}</label>

              {type === "textarea" ? (
                <textarea
                  rows={key === "description" ? 4 : 3}
                  value={form[key] as string}
                  onChange={setArea(key)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    fontFamily: "inherit",
                  } as React.CSSProperties}
                />
              ) : (
                <input
                  type={type}
                  value={form[key] as string}
                  onChange={set(key)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={inputStyle}
                />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ fontSize: 12, fontWeight: 700, padding: "10px 20px", borderRadius: 8, border: "0.5px solid #d9d0bc", background: "#ffffff", color: "#555", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const parsed = {
                ...form,
                price:  +form.price,
                weight: +form.weight,
                stock:  +form.stock,
                id: product?.id || Date.now(),
                // convert newline-separated details → string[]
                details: (form.details as string)
                  .split("\n")
                  .map((s: string) => s.trim())
                  .filter(Boolean),
                // collapse three URL fields → images[]
                images: [form.image, form.image2, form.image3].filter(Boolean),
              };
              onSave(parsed);
            }}
            style={{ fontSize: 12, fontWeight: 800, padding: "10px 26px", borderRadius: 8, border: "none", background: "#b18d2b", color: "#ffffff", cursor: "pointer", letterSpacing: "0.04em" }}
          >
            Save piece
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const [data, setData] = useState(collectionsData);
  const [activeCategory, setActiveCategory] = useState<keyof typeof collectionsData>("rings");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [filterAlert, setFilterAlert] = useState(false);

  const products = data[activeCategory]?.products || [];
  const filtered = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAlert = !filterAlert || p.stock <= 2;
    return matchSearch && matchAlert;
  });

  const allProducts = Object.values(data).flatMap(c => c.products);
  const totalValue = allProducts.reduce((s, p) => s + p.price * p.stock, 0);
  const lowStockCount = allProducts.filter(p => p.stock <= 2).length;

  const handleSave = (parsed: any) => {
    setData(prev => {
      const updated = { ...prev };
      if (editProduct) {
        updated[activeCategory].products = updated[activeCategory].products.map(p =>
          p.id === parsed.id ? parsed : p
        );
      } else {
        updated[activeCategory].products = [...updated[activeCategory].products, parsed];
      }
      return updated;
    });
    setModalOpen(false);
    setEditProduct(null);
  };

  const handleDelete = (id: number) =>
    setData(prev => {
      const updated = { ...prev };
      updated[activeCategory].products = updated[activeCategory].products.filter(p => p.id !== id);
      return updated;
    });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ee", padding: "24px 16px 64px", boxSizing: "border-box", width: "100%", overflowX: "hidden" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ transform: "translateY(-10px)" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1a1109", margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Inventory Vault
          </h1>
          <p style={{ fontSize: 12, fontWeight: 800, color: "#b18d2b", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6 }}>
            KANDY Luxury Asset Management
          </p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setModalOpen(true); }}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 24px", background: "#b18d2b", color: "#ffffff", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 4px 12px rgba(177,141,43,0.2)" }}
        >
          <Plus size={14} /> Add Piece
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
        <StatCard label="Total Pieces" value={allProducts.length}                     sub="across all categories" />
        <StatCard label="Vault Value"  value={`$${(totalValue / 1000).toFixed(0)}k`} sub="cost × stock" />
        <StatCard label="Low Stock"    value={lowStockCount}                           sub="items need attention" />
        <StatCard label="Collections"  value={Object.keys(data).length}               sub="active categories" />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 2, background: "#edeae2", padding: 4, borderRadius: 10, border: "0.5px solid #ddd8cc" }}>
          {Object.keys(data).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as keyof typeof collectionsData)}
              style={{
                padding: "7px 16px", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase",
                borderRadius: 7, border: "none", cursor: "pointer", transition: "all 0.15s",
                background: activeCategory === cat ? "#b18d2b" : "transparent",
                color:      activeCategory === cat ? "#ffffff" : "#7a6a4a",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search by name or SKU…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={e => { e.target.style.borderColor = "#b18d2b"; }}
            onBlur={e => { e.target.style.borderColor = "#d9d0bc"; }}
            style={{
              width: "100%", boxSizing: "border-box",
              paddingLeft: 36, paddingRight: 12, height: 38,
              fontSize: 13, color: "#1a1109",
              background: "#ffffff",
              border: "0.5px solid #d9d0bc",
              borderRadius: 9, outline: "none", transition: "border-color 0.15s",
            }}
          />
        </div>

        <button
          onClick={() => setFilterAlert(f => !f)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            height: 38, padding: "0 14px",
            fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
            border: "0.5px solid",
            borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
            background:  filterAlert ? "#fffbeb" : "#ffffff",
            color:       filterAlert ? "#92400e" : "#7a6a4a",
            borderColor: filterAlert ? "#fcd34d" : "#d9d0bc",
          }}
        >
          <AlertTriangle size={12} /> Low stock
        </button>

        <p style={{ fontSize: 11, color: "#aaa", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {filtered.length} of {products.length} pieces
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={(prod) => { setEditProduct(prod); setModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "72px 24px",
          background: "#ffffff", borderRadius: 14,
          border: "0.5px dashed #d9d0bc",
        }}>
          <div style={{ width: 44, height: 44, background: "#faf8f3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Search size={18} color="#c4b48a" />
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", margin: 0 }}>No assets found</p>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <ProductModal
          product={editProduct}
          onClose={() => { setModalOpen(false); setEditProduct(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
