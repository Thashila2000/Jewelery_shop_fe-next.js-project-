"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Edit, Trash2, X, Eye, EyeOff,
  Image, Calendar, Tag, ToggleLeft, ToggleRight, AlertTriangle
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const modalOverlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" as const } },
  exit:    { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.18 } },
};

const cardVariants = {
  hidden:  { y: 20, opacity: 0, scale: 0.97 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit:    { y: -10, opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Placement = "Hero" | "Collection" | "Sidebar" | "Footer";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  placement: Placement;
  startDate: string;
  endDate: string;
  active: boolean;
  bgColor: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_BANNERS: Banner[] = [
  {
    id: 1,
    title: "The Summer Vault Collection",
    subtitle: "Discover rare gemstones handcrafted for the season",
    ctaText: "Explore Now",
    ctaLink: "/collections/summer",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    placement: "Hero",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    active: true,
    bgColor: "#1a1109",
  },
  {
    id: 2,
    title: "New Arrivals: Sapphire Edit",
    subtitle: "Ceylon sapphires in platinum and 18K gold",
    ctaText: "Shop the Edit",
    ctaLink: "/collections/sapphire",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
    placement: "Collection",
    startDate: "2025-07-10",
    endDate: "2025-08-10",
    active: true,
    bgColor: "#0d1b2a",
  },
  {
    id: 3,
    title: "Complimentary Gift Wrapping",
    subtitle: "On all orders above $2,000 this month",
    ctaText: "Learn More",
    ctaLink: "/gifting",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    placement: "Sidebar",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    active: false,
    bgColor: "#2d1f0e",
  },
  {
    id: 4,
    title: "Artisan Craftsmanship Since 1987",
    subtitle: "Handcrafted in Kandy, Sri Lanka",
    ctaText: "Our Story",
    ctaLink: "/about",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80",
    placement: "Footer",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    active: true,
    bgColor: "#1c1c1c",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const PLACEMENT_STYLE: Record<Placement, { bg: string; color: string; border: string }> = {
  Hero:       { bg: "#faf8f3", color: "#92400e", border: "#fcd34d" },
  Collection: { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe" },
  Sidebar:    { bg: "#f5f3ff", color: "#5b21b6", border: "#ddd6fe" },
  Footer:     { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
};

const PLACEMENTS: Placement[] = ["Hero", "Collection", "Sidebar", "Footer"];

const EMPTY: Omit<Banner, "id"> = {
  title: "", subtitle: "", ctaText: "", ctaLink: "",
  image: "", placement: "Hero", startDate: "", endDate: "",
  active: true, bgColor: "#1a1109",
};

function isExpired(endDate: string) {
  return endDate ? new Date(endDate) < new Date() : false;
}

function formatDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Input style ──────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  fontSize: 14, fontWeight: 400, color: "#1a1109",
  padding: "9px 12px", borderRadius: 8,
  border: "0.5px solid #d9d0bc", background: "#faf8f3",
  outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
  fontFamily: "inherit",
};
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "#b18d2b";
  e.target.style.boxShadow = "0 0 0 3px rgba(177,141,43,0.1)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "#d9d0bc";
  e.target.style.boxShadow = "none";
};

// ─── Banner Card ──────────────────────────────────────────────────────────────
function BannerCard({ banner, onEdit, onDelete, onToggle }: {
  banner: Banner;
  onEdit: (b: Banner) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const placement = PLACEMENT_STYLE[banner.placement];
  const expired = isExpired(banner.endDate);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(177,141,43,0.13)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `0.5px solid ${hovered ? "#b18d2b" : "#e8e3d8"}`,
        borderRadius: 14, overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "border-color 0.2s",
        opacity: !banner.active ? 0.7 : 1,
      }}
    >
      {/* Preview image */}
      <div style={{ position: "relative", height: 160, overflow: "hidden", background: banner.bgColor, flexShrink: 0 }}>
        <motion.img
          src={banner.image}
          alt={banner.title}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.45, ease: "easeOut" as const }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.55 }}
        />
        {/* Overlay text preview */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "14px 16px", background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginTop: 0, marginBottom: 3, marginLeft: 0, marginRight: 0, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{banner.title}</p>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{banner.subtitle}</p>
        </div>

        {/* Status badge */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 5 }}>
          <span style={{
            fontSize: 8, fontWeight: 800, padding: "3px 8px", letterSpacing: "0.12em", textTransform: "uppercase",
            background: banner.active && !expired ? "rgba(22,101,52,0.9)" : "rgba(127,29,29,0.85)",
            color: "#ffffff", borderRadius: 4,
          }}>
            {expired ? "Expired" : banner.active ? "Live" : "Inactive"}
          </span>
          <span style={{
            fontSize: 8, fontWeight: 800, padding: "3px 8px", letterSpacing: "0.12em", textTransform: "uppercase",
            background: placement.bg, color: placement.color,
            border: `0.5px solid ${placement.border}`, borderRadius: 4,
          }}>
            {banner.placement}
          </span>
        </div>

        {/* Edit hover button */}
        <motion.button
          onClick={() => onEdit(banner)}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          whileTap={{ scale: 0.9 }}
          style={{ position: "absolute", bottom: 10, right: 10, background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 7, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <Edit size={12} color="#b18d2b" />
        </motion.button>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 3, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{banner.title}</p>
          <p style={{ fontSize: 11, color: "#999", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{banner.subtitle}</p>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#faf8f3", border: "0.5px solid #ede8db", borderRadius: 7, padding: "7px 10px" }}>
          <Tag size={11} color="#b18d2b" />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#2d2520", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{banner.ctaText} → {banner.ctaLink}</span>
        </div>

        {/* Dates */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 10px" }}>
          {[["Start", banner.startDate], ["End", banner.endDate]].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: 9, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginTop: 0, marginBottom: 3, marginLeft: 0, marginRight: 0 }}>{k}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#2d2520", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{formatDate(v as string)}</p>
            </div>
          ))}
        </div>

        {/* Expired warning */}
        {expired && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: "#fff1f2", border: "0.5px solid #fecdd3", borderRadius: 7 }}>
            <AlertTriangle size={11} color="#e11d48" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#be123c" }}>This promotion has expired</span>
          </div>
        )}

        {/* Footer actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 9, borderTop: "0.5px solid #ede8db", marginTop: "auto" }}>
          <motion.button
            onClick={() => onDelete(banner.id)}
            whileHover={{ color: "#e11d48" } as any}
            whileTap={{ scale: 0.94 }}
            style={{ fontSize: 10, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", background: "none", border: "none", padding: 0 }}
          >
            <Trash2 size={11} /> Delete
          </motion.button>

          <motion.button
            onClick={() => onToggle(banner.id)}
            whileTap={{ scale: 0.9 }}
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", background: "none", border: "none", padding: 0, color: banner.active ? "#166534" : "#aaa" }}
          >
            {banner.active
              ? <><ToggleRight size={16} color="#b18d2b" /> Active</>
              : <><ToggleLeft size={16} color="#ccc" /> Inactive</>
            }
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function BannerModal({ banner, onClose, onSave }: {
  banner: Banner | null;
  onClose: () => void;
  onSave: (b: Omit<Banner, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<Banner, "id">>(banner ? {
    title: banner.title, subtitle: banner.subtitle, ctaText: banner.ctaText,
    ctaLink: banner.ctaLink, image: banner.image, placement: banner.placement,
    startDate: banner.startDate, endDate: banner.endDate,
    active: banner.active, bgColor: banner.bgColor,
  } : { ...EMPTY });

  const set = (k: keyof Omit<Banner, "id">) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 9, fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.15em",
    color: "#a08c5b", marginBottom: 6,
  };

  const sectionLabel = (title: string) => (
    <p style={{ fontSize: 9, fontWeight: 800, color: "#b18d2b", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0, paddingBottom: 6, borderBottom: "0.5px solid #ede8db" }}>
      {title}
    </p>
  );

  return (
    <motion.div
      variants={modalOverlayVariants}
      initial="hidden" animate="visible" exit="exit"
      style={{ position: "fixed", inset: 0, background: "rgba(20,15,5,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden" animate="visible" exit="exit"
        onClick={e => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 16, border: "0.5px solid #d9d0bc", width: "100%", maxWidth: 580, maxHeight: "92vh", overflowY: "auto", padding: "26px 26px 22px", boxShadow: "0 24px 64px rgba(0,0,0,0.22)", boxSizing: "border-box" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, paddingBottom: 16, borderBottom: "0.5px solid #ede8db" }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 4, marginLeft: 0, marginRight: 0 }}>
              {banner ? "Edit Banner" : "New Banner"}
            </h2>
            <p style={{ fontSize: 10, color: "#a08c5b", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
              KANDY Luxury Asset Management
            </p>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90, color: "#e11d48" } as any}
            whileTap={{ scale: 0.88 }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4, display: "flex" }}
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Content */}
        {sectionLabel("Content")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Banner Title</label>
            <input value={form.title} onChange={set("title")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="e.g. The Summer Vault Collection" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Subtitle</label>
            <input value={form.subtitle} onChange={set("subtitle")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="Supporting line of text" />
          </div>
          <div>
            <label style={labelStyle}>CTA Button Text</label>
            <input value={form.ctaText} onChange={set("ctaText")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="e.g. Shop Now" />
          </div>
          <div>
            <label style={labelStyle}>CTA Link</label>
            <input value={form.ctaLink} onChange={set("ctaLink")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="/collections/summer" />
          </div>
        </div>

        {/* Visuals */}
        {sectionLabel("Visuals")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Image URL</label>
            <input value={form.image} onChange={set("image")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} placeholder="https://... or /images/banner.jpg" />
          </div>
          {/* Image preview */}
          {form.image && (
            <div style={{ gridColumn: "1 / -1", height: 120, borderRadius: 8, overflow: "hidden", border: "0.5px solid #ede8db", background: form.bgColor, position: "relative" }}>
              <img src={form.image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 6 }}>Preview</span>
              </div>
            </div>
          )}
          <div>
            <label style={labelStyle}>Background Colour</label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="color" value={form.bgColor} onChange={set("bgColor")} style={{ width: 38, height: 38, borderRadius: 7, border: "0.5px solid #d9d0bc", cursor: "pointer", background: "none", padding: 2 }} />
              <input value={form.bgColor} onChange={set("bgColor")} onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, flex: 1 }} placeholder="#1a1109" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Placement</label>
            <select value={form.placement} onChange={set("placement")} onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, appearance: "none" }}>
              {PLACEMENTS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Schedule */}
        {sectionLabel("Schedule")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input type="date" value={form.startDate} onChange={set("startDate")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>End Date</label>
            <input type="date" value={form.endDate} onChange={set("endDate")} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Status</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => setForm(f => ({ ...f, active: val }))}
                  style={{
                    flex: 1, padding: "9px 0", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                    border: "0.5px solid", borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                    background: form.active === val ? (val ? "#f0fdf4" : "#fff1f2") : "#ffffff",
                    color: form.active === val ? (val ? "#166534" : "#be123c") : "#aaa",
                    borderColor: form.active === val ? (val ? "#bbf7d0" : "#fecdd3") : "#e8e3d8",
                  }}
                >
                  {val ? "Active" : "Inactive"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 16, borderTop: "0.5px solid #ede8db" }}>
          <motion.button onClick={onClose} whileTap={{ scale: 0.96 }}
            style={{ fontSize: 11, fontWeight: 700, padding: "10px 20px", borderRadius: 8, border: "0.5px solid #d9d0bc", background: "#ffffff", color: "#555", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSave(form)}
            style={{ fontSize: 11, fontWeight: 800, padding: "10px 26px", borderRadius: 8, border: "none", background: "#b18d2b", color: "#ffffff", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {banner ? "Save Changes" : "Create Banner"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PromotionsPage() {
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [placementFilter, setPlacementFilter] = useState<Placement | "All">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");

  const filtered = banners.filter(b => {
    const matchPlacement = placementFilter === "All" || b.placement === placementFilter;
    const matchStatus = statusFilter === "All" || (statusFilter === "Active" ? b.active : !b.active);
    return matchPlacement && matchStatus;
  });

  const activeCount   = banners.filter(b => b.active).length;
  const inactiveCount = banners.filter(b => !b.active).length;
  const expiredCount  = banners.filter(b => isExpired(b.endDate)).length;

  const handleSave = (form: Omit<Banner, "id">) => {
    if (editBanner) {
      setBanners(prev => prev.map(b => b.id === editBanner.id ? { ...form, id: editBanner.id } : b));
    } else {
      setBanners(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditBanner(null);
  };

  const handleDelete = (id: number) => setBanners(prev => prev.filter(b => b.id !== id));
  const handleToggle = (id: number) => setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      style={{ minHeight: "100vh", background: "#f5f3ee", padding: "24px 16px 64px", boxSizing: "border-box", width: "100%" }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 12, flexWrap: "wrap" }}>
        <div style={{ transform: "translateY(-10px)" }}>
          <h1 style={{ fontSize: 31, fontWeight: 750, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "sans-serif" }}>
            Promotions
          </h1>
          <p style={{ fontSize: 12, fontWeight: 800, color: "#b18d2b", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            KANDY Luxury Asset Management
          </p>
        </div>
        <motion.button
          whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setEditBanner(null); setModalOpen(true); }}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 20px", background: "#b18d2b", color: "#ffffff", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 4px 12px rgba(177,141,43,0.2)", flexShrink: 0 }}
        >
          <Plus size={14} /> New Banner
        </motion.button>
      </motion.div>

      {/* Stat cards */}
      <motion.div variants={containerVariants} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Banners", value: banners.length,  sub: "all placements", icon: Image },
          { label: "Active",        value: activeCount,      sub: "live now",        icon: Eye },
          { label: "Inactive",      value: inactiveCount,    sub: "paused",          icon: EyeOff },
          { label: "Expired",       value: expiredCount,     sub: "need updating",   icon: AlertTriangle },
        ].map(({ label, value, sub, icon: Icon }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(177,141,43,0.13)" }}
            style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "18px 18px 14px", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: 0, right: 0, width: 70, height: 70, background: "radial-gradient(circle at top right, rgba(177,141,43,0.08), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{label}</p>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(177,141,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} color="#b18d2b" />
              </div>
            </div>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#1a1a1a", marginTop: 0, marginBottom: 2, marginLeft: 0, marginRight: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</p>
            <p style={{ fontSize: 11, color: "#999", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 22 }}>
        {/* Placement filter */}
        <div style={{ display: "flex", gap: 2, background: "#edeae2", padding: 4, borderRadius: 10, border: "0.5px solid #ddd8cc" }}>
          {(["All", ...PLACEMENTS] as const).map(p => (
            <motion.button
              key={p}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlacementFilter(p)}
              style={{
                padding: "7px 14px", fontSize: 10, fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase",
                borderRadius: 7, border: "none", cursor: "pointer",
                transition: "background 0.15s, color 0.15s", whiteSpace: "nowrap",
                background: placementFilter === p ? "#b18d2b" : "transparent",
                color:      placementFilter === p ? "#ffffff" : "#7a6a4a",
              }}
            >
              {p}
            </motion.button>
          ))}
        </div>

        {/* Status filter */}
        <div style={{ display: "flex", gap: 2, background: "#edeae2", padding: 4, borderRadius: 10, border: "0.5px solid #ddd8cc" }}>
          {(["All", "Active", "Inactive"] as const).map(s => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "7px 14px", fontSize: 10, fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase",
                borderRadius: 7, border: "none", cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
                background: statusFilter === s ? "#b18d2b" : "transparent",
                color:      statusFilter === s ? "#ffffff" : "#7a6a4a",
              }}
            >
              {s}
            </motion.button>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "#aaa", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {filtered.length} of {banners.length} banners
        </p>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={placementFilter + statusFilter}
            variants={containerVariants}
            initial="hidden" animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}
          >
            {filtered.map(b => (
              <motion.div key={b.id} variants={cardVariants}>
                <BannerCard
                  banner={b}
                  onEdit={banner => { setEditBanner(banner); setModalOpen(true); }}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 24px", background: "#ffffff", borderRadius: 14, border: "0.5px dashed #d9d0bc" }}
          >
            <div style={{ width: 44, height: 44, background: "#faf8f3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Image size={18} color="#c4b48a" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>No banners found</p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 4, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>Try adjusting your filters or create a new banner.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <BannerModal
            banner={editBanner}
            onClose={() => { setModalOpen(false); setEditBanner(null); }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}