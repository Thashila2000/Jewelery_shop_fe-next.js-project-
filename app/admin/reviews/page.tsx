"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Search, Filter, CheckCircle2, XCircle,
  Clock, Gem, Flag, Eye, Trash2, MessageSquare,
  TrendingUp, ThumbsUp, AlertTriangle, X, ChevronDown,
  BarChart2, Plus
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

const cardVariants = {
  hidden: { y: 24, opacity: 0, scale: 0.97 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit:   { y: -10, opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden:  { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.32, ease: "easeOut" as const } },
  exit:    { x: "100%", opacity: 0, transition: { duration: 0.22, ease: "easeIn" as const } },
};

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: "RVW-001", customer: "Sophia Loren", avatar: "S",
    product: "Diamond Rivière", sku: "NCK-001", category: "Necklaces",
    rating: 5, status: "published", flagged: false,
    date: "Today, 10:22am", dateRaw: "2024-07-05",
    title: "Absolutely breathtaking",
    body: "I've worn a lot of fine jewellery over the years, but this necklace is in a league of its own. The diamonds are brilliantly matched and the setting is flawless. Received so many compliments at the gala last weekend. The packaging alone felt like an experience.",
    helpful: 24, images: true,
    reply: null,
  },
  {
    id: "RVW-002", customer: "Alexander Reed", avatar: "A",
    product: "Eternal Solitaire Band", sku: "RNG-001", category: "Rings",
    rating: 5, status: "published", flagged: false,
    date: "Today, 09:05am", dateRaw: "2024-07-05",
    title: "Perfect proposal ring",
    body: "She said yes! The ring is even more stunning in person. The craftsmanship is exceptional — you can tell this is a piece built to last generations. Delivery was fast and the insured packaging gave real peace of mind.",
    helpful: 31, images: false,
    reply: "Congratulations! We are so honoured to have been part of your special moment. Wishing you both a lifetime of joy. — KANDY Team",
  },
  {
    id: "RVW-003", customer: "Isabella Vanthorpe", avatar: "I",
    product: "Sapphire Halo Ring", sku: "RNG-002", category: "Rings",
    rating: 4, status: "pending", flagged: false,
    date: "Yesterday, 6:30pm", dateRaw: "2024-07-04",
    title: "Stunning but sizing was slightly off",
    body: "The ring is genuinely gorgeous — the sapphire colour is exactly as shown and the halo of diamonds catches light beautifully. Only minor issue was the sizing ran slightly large, but the team was helpful in arranging an exchange.",
    helpful: 8, images: true,
    reply: null,
  },
  {
    id: "RVW-004", customer: "Julian Thorne", avatar: "J",
    product: "Tennis Bracelet Classic", sku: "BRC-001", category: "Bracelets",
    rating: 5, status: "published", flagged: false,
    date: "Yesterday, 2:10pm", dateRaw: "2024-07-04",
    title: "A true heirloom piece",
    body: "Bought this for my wife's anniversary gift and she hasn't taken it off since. The diamonds are perfectly matched and the clasp is incredibly secure. Worth every penny — this is the kind of jewellery you pass down.",
    helpful: 19, images: false,
    reply: null,
  },
  {
    id: "RVW-005", customer: "Priya Nair", avatar: "P",
    product: "Pearl Pendant Drop", sku: "NCK-002", category: "Necklaces",
    rating: 3, status: "pending", flagged: true,
    date: "Jul 3, 3:45pm", dateRaw: "2024-07-03",
    title: "Nice but expected more at this price",
    body: "The pearl quality is good and the chain feels solid. I expected a bit more lustre at this price point compared to what the photos suggested. Still a beautiful piece but slightly disappointed by the presentation box which seemed generic.",
    helpful: 4, images: false,
    reply: null,
  },
  {
    id: "RVW-006", customer: "Marco Ferretti", avatar: "M",
    product: "Emerald Cut Trilogy", sku: "RNG-004", category: "Rings",
    rating: 5, status: "published", flagged: false,
    date: "Jul 3, 11:00am", dateRaw: "2024-07-03",
    title: "Museo-worthy craftsmanship",
    body: "I work in the luxury goods sector and rarely am I genuinely impressed. This ring is extraordinary. The colour saturation of the Colombian emeralds, the precision of the platinum setting, the weight and balance — all perfect. KANDY has set a new standard.",
    helpful: 42, images: true,
    reply: "Thank you for such a meaningful review, Marco. Words like these remind us why we do what we do. — KANDY Team",
  },
  {
    id: "RVW-007", customer: "Amelia Torres", avatar: "A",
    product: "Chandelier Sapphire", sku: "EAR-002", category: "Earrings",
    rating: 4, status: "published", flagged: false,
    date: "Jul 2, 5:20pm", dateRaw: "2024-07-02",
    title: "Show-stopping earrings",
    body: "Wore these to a black-tie dinner and felt like royalty. The movement of the sapphires is mesmerising. Only reason for 4 stars is they are slightly heavy for all-day wear, but for events they are absolutely perfect.",
    helpful: 13, images: true,
    reply: null,
  },
  {
    id: "RVW-008", customer: "David Chen", avatar: "D",
    product: "Diamond Stud Pair", sku: "EAR-001", category: "Earrings",
    rating: 2, status: "flagged", flagged: true,
    date: "Jul 2, 9:00am", dateRaw: "2024-07-02",
    title: "Delivery was very delayed",
    body: "The studs themselves are lovely but my order took 12 days when I was promised 5. No proactive communication from the team — I had to chase three times. The product quality is there but the service experience let it down significantly.",
    helpful: 6, images: false,
    reply: null,
  },
];

const RATING_DIST = [
  { stars: 5, count: 68, pct: 64 },
  { stars: 4, count: 22, pct: 21 },
  { stars: 3, count: 9,  pct: 8  },
  { stars: 2, count: 4,  pct: 4  },
  { stars: 1, count: 3,  pct: 3  },
];

const STATUS_META: Record<string, { bg: string; color: string; border: string; icon: any; label: string }> = {
  published: { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", icon: CheckCircle2, label: "Published" },
  pending:   { bg: "#fffbeb", color: "#92400e", border: "#fcd34d", icon: Clock,        label: "Pending"   },
  flagged:   { bg: "#fff1f2", color: "#9f1239", border: "#fda4af", icon: Flag,         label: "Flagged"   },
  rejected:  { bg: "#f5f3ee", color: "#888",    border: "#e8e3d8", icon: XCircle,      label: "Rejected"  },
};

const ALL_STATUSES = ["all", "published", "pending", "flagged"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? "#b18d2b" : "none"}
          color={i <= rating ? "#b18d2b" : "#ddd8cc"}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_META[status] ?? STATUS_META.pending;
  const Icon = s.icon;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 6,
      background: s.bg, color: s.color, border: `0.5px solid ${s.border}`,
      textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap",
    }}>
      <Icon size={9} /> {s.label}
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon: Icon, trend }: any) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(177,141,43,0.13)" }}
      style={{
        background: "#fff", 
        border: "0.5px solid #e8e3d8", 
        borderRadius: 14,
        padding: "18px 18px 14px", 
        position: "relative", 
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 70, height: 70, background: "radial-gradient(circle at top right, rgba(177,141,43,0.08), transparent 70%)", pointerEvents: "none" }} />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.14em", margin: 0 }}>
          {label}
        </p>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(177,141,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={14} color="#b18d2b" />
        </div>
      </div>

      {/* CHANGED: color from #b18d2b to #1a1109 */}
      <p style={{ 
        fontSize: 24, 
        fontWeight: 800, 
        color: "#1a1109", // Rich Black
        margin: "0 0 2px", 
        lineHeight: 1, 
        letterSpacing: "-0.02em" 
      }}>
        {value}
      </p>

      <p style={{ fontSize: 11, color: "#999", margin: 0 }}>{sub}</p>

      {trend && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 8, fontSize: 9, fontWeight: 700, color: "#166534", background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 5, padding: "2px 6px" }}>
          <TrendingUp size={9} /> {trend}
        </div>
      )}
    </motion.div>
  );
}
// ─── Rating Distribution ───────────────────────────────────────────────────────
function RatingDistribution() {
  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        {/* Big average */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <p style={{ fontSize: 48, fontWeight: 800, color: "#b18d2b", margin: 0, lineHeight: 1, letterSpacing: "-0.04em" }}>4.6</p>
          <StarRow rating={5} size={14} />
          <p style={{ fontSize: 10, color: "#bbb", marginTop: 5, fontWeight: 600 }}>106 reviews</p>
        </div>

        {/* Bars */}
        <div style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 8 }}>
          {RATING_DIST.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                <Star size={10} fill="#b18d2b" color="#b18d2b" />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#7a6a4a", width: 8 }}>{r.stars}</span>
              </div>
              <div style={{ flex: 1, height: 6, background: "#f5f3ee", borderRadius: 99, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: "easeOut" as const }}
                  style={{ height: "100%", borderRadius: 99, background: "linear-gradient(to right, #b18d2b, #e8c84a)" }}
                />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#a08c5b", width: 28, textAlign: "right", flexShrink: 0 }}>{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ review, onSelect }: { review: any; onSelect: (r: any) => void }) {
  const truncated = review.body.length > 160 ? review.body.slice(0, 160) + "…" : review.body;

  return (
    <motion.div
  variants={cardVariants}
  whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(177,141,43,0.1)" }}
  onClick={() => onSelect(review)}
  style={{
    background: "#fff", 
    border: "0.5px solid #e8e3d8", 
    borderRadius: 14,
    padding: "10px 16px 14px", 
    cursor: "pointer",
    display: "flex", 
    flexDirection: "column", 
    gap: 8, 
    position: "relative", 
    overflow: "hidden",
    transition: "border-color 0.2s",
  }}
>
  {/* flagged stripe */}
  {review.flagged && (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #e11d48, #fda4af)" }} />
  )}

  {/* Header */}
  <div style={{ 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    gap: 8,
    marginTop: review.flagged ? "4px" : "0px" 
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <div style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, #b18d2b, #d4af37)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 800, color: "#fff",
      }}>
        {review.avatar}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1109", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {review.customer}
        </p>
        <p style={{ fontSize: 9, color: "#bbb", margin: 0, letterSpacing: "0.06em", lineHeight: 1.2 }}>
          {review.date}
        </p>
      </div>
    </div>
    <StatusBadge status={review.status} />
  </div>
      {/* Stars + title */}
      <div>
        <StarRow rating={review.rating} size={11} />
        <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", margin: "6px 0 0", lineHeight: 1.3 }}>{review.title}</p>
      </div>

      {/* Body */}
      <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, margin: 0 }}>{truncated}</p>

      {/* Product tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: "#faf8f3", borderRadius: 7, border: "0.5px solid #ede8db", width: "fit-content" }}>
        <Gem size={10} color="#b18d2b" />
        <span style={{ fontSize: 10, fontWeight: 700, color: "#a08c5b" }}>{review.product}</span>
        <span style={{ fontSize: 9, color: "#ccc", fontWeight: 500 }}>· {review.sku}</span>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "0.5px solid #f0ece6", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ThumbsUp size={11} color="#b18d2b" />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#a08c5b" }}>{review.helpful} found helpful</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {review.images && (
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#eff6ff", color: "#1e40af", border: "0.5px solid #bfdbfe" }}>
              PHOTOS
            </span>
          )}
          {review.reply && (
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#f0fdf4", color: "#166534", border: "0.5px solid #bbf7d0" }}>
              REPLIED
            </span>
          )}
          {review.flagged && (
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#fff1f2", color: "#9f1239", border: "0.5px solid #fda4af" }}>
              FLAGGED
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Review Detail Drawer ──────────────────────────────────────────────────────
function ReviewDrawer({ review, onClose, onAction }: { review: any; onClose: () => void; onAction: (id: string, action: string) => void }) {
  const [reply, setReply] = useState(review.reply ?? "");
  const [replying, setReplying] = useState(false);

  return (
    <>
      <motion.div
        variants={overlayVariants}
        initial="hidden" animate="visible" exit="exit"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(20,15,5,0.45)", zIndex: 300 }}
      />
      <motion.div
        variants={drawerVariants}
        initial="hidden" animate="visible" exit="exit"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(500px, 100vw)",
          background: "#fff", zIndex: 301,
          borderLeft: "0.5px solid #e8e3d8",
          display: "flex", flexDirection: "column",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: "20px 22px 16px", borderBottom: "0.5px solid #f0ece6", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Review Details</p>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: "#1a1109", margin: 0, letterSpacing: "-0.02em" }}>{review.id}</h2>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <StatusBadge status={review.status} />
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90 } as any}
                whileTap={{ scale: 0.88 }}
                style={{ background: "#f5f3ee", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <X size={15} color="#888" />
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Reviewer */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#b18d2b,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
              {review.avatar}
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", margin: 0 }}>{review.customer}</p>
              <p style={{ fontSize: 10, color: "#bbb", margin: "2px 0 0" }}>{review.date}</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <StarRow rating={review.rating} size={14} />
            </div>
          </div>

          {/* Review content */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "16px" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", margin: "0 0 10px" }}>{review.title}</p>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>{review.body}</p>
            {review.images && (
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{ width: 64, height: 64, borderRadius: 8, background: "linear-gradient(135deg, #f5f3ee, #ede8db)", border: "0.5px solid #e8e3d8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Eye size={14} color="#c4b48a" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "14px 16px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 10px" }}>Reviewed Piece</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(177,141,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Gem size={16} color="#b18d2b" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", margin: 0 }}>{review.product}</p>
                <p style={{ fontSize: 10, color: "#a08c5b", margin: "2px 0 0", fontWeight: 600 }}>{review.sku} · {review.category}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#a08c5b", fontWeight: 600 }}>
                <ThumbsUp size={10} color="#b18d2b" /> {review.helpful} helpful votes
              </div>
            </div>
          </div>

          {/* Existing reply */}
          {review.reply && !replying && (
            <div style={{ background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 8px" }}>Your Reply</p>
              <p style={{ fontSize: 12, color: "#166534", lineHeight: 1.6, margin: 0 }}>{review.reply}</p>
              <button
                onClick={() => setReplying(true)}
                style={{ marginTop: 10, fontSize: 10, fontWeight: 700, color: "#b18d2b", background: "none", border: "none", cursor: "pointer", padding: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                Edit Reply
              </button>
            </div>
          )}

          {/* Reply box */}
          {(!review.reply || replying) && (
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 8px" }}>
                {review.reply ? "Edit Reply" : "Reply to Review"}
              </p>
              <textarea
                rows={4}
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Write a thoughtful reply on behalf of KANDY…"
                onFocus={e => { e.target.style.borderColor = "#b18d2b"; e.target.style.boxShadow = "0 0 0 3px rgba(177,141,43,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = "#d9d0bc"; e.target.style.boxShadow = "none"; }}
                style={{
                  width: "100%", boxSizing: "border-box", fontSize: 13, color: "#1a1109",
                  padding: "10px 12px", borderRadius: 10, border: "0.5px solid #d9d0bc",
                  background: "#faf8f3", outline: "none", resize: "vertical",
                  fontFamily: "inherit", lineHeight: 1.6,
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
              />
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        <div style={{ padding: "14px 22px 18px", borderTop: "0.5px solid #f0ece6", flexShrink: 0 }}>
          {/* Reply submit */}
          {(!review.reply || replying) && (
            <motion.button
              whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
              whileTap={{ scale: 0.96 }}
              style={{ width: "100%", height: 38, borderRadius: 9, border: "none", background: "#b18d2b", fontSize: 12, fontWeight: 800, color: "#fff", cursor: "pointer", marginBottom: 10, letterSpacing: "0.04em" }}
            >
              {review.reply ? "Update Reply" : "Post Reply"}
            </motion.button>
          )}

          {/* Status actions */}
          <div style={{ display: "flex", gap: 8 }}>
            {review.status !== "published" && (
              <motion.button
                whileHover={{ background: "#f0fdf4" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(review.id, "publish")}
                style={{ flex: 1, height: 36, borderRadius: 9, border: "0.5px solid #bbf7d0", background: "#fff", fontSize: 11, fontWeight: 700, color: "#166534", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <CheckCircle2 size={12} /> Approve
              </motion.button>
            )}
            {review.status !== "rejected" && (
              <motion.button
                whileHover={{ background: "#fff1f2" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(review.id, "reject")}
                style={{ flex: 1, height: 36, borderRadius: 9, border: "0.5px solid #fda4af", background: "#fff", fontSize: 11, fontWeight: 700, color: "#9f1239", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <XCircle size={12} /> Reject
              </motion.button>
            )}
            <motion.button
              whileHover={{ background: "#fff1f2" } as any}
              whileTap={{ scale: 0.96 }}
              onClick={() => onAction(review.id, "delete")}
              style={{ width: 36, height: 36, borderRadius: 9, border: "0.5px solid #fda4af", background: "#fff", fontSize: 11, fontWeight: 700, color: "#9f1239", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Trash2 size={13} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReviewsPage() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const filtered = reviews.filter(r => {
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchSearch =
      r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRating = ratingFilter === null || r.rating === ratingFilter;
    return matchStatus && matchSearch && matchRating;
  });

  const handleAction = (id: string, action: string) => {
    if (action === "delete") {
      setReviews(prev => prev.filter(r => r.id !== id));
      setSelectedReview(null);
    } else if (action === "publish") {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: "published", flagged: false } : r));
      setSelectedReview((prev: any) => prev ? { ...prev, status: "published", flagged: false } : null);
    } else if (action === "reject") {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" } : r));
      setSelectedReview((prev: any) => prev ? { ...prev, status: "rejected" } : null);
    }
  };

  const pendingCount  = reviews.filter(r => r.status === "pending").length;
  const flaggedCount  = reviews.filter(r => r.status === "flagged").length;
  const avgRating     = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      style={{ minHeight: "100vh", background: "#f5f3ee", padding: "24px 16px 64px", boxSizing: "border-box", width: "100%" }}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12, flexWrap: "wrap" }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 800, color: "#1a1109", margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Reviews
          </h1>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#b18d2b", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6 }}>
            KANDY Client Sentiment
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {/* Rating filter pills */}
          <div style={{ display: "flex", gap: 4 }}>
            {[5, 4, 3, 2, 1].map(n => (
              <motion.button
                key={n}
                whileTap={{ scale: 0.92 }}
                onClick={() => setRatingFilter(ratingFilter === n ? null : n)}
                style={{
                  display: "flex", alignItems: "center", gap: 3,
                  height: 34, padding: "0 10px",
                  fontSize: 11, fontWeight: 800, borderRadius: 8, border: "0.5px solid", cursor: "pointer",
                  transition: "all 0.15s",
                  background: ratingFilter === n ? "#fffbeb" : "#fff",
                  color:      ratingFilter === n ? "#92400e" : "#7a6a4a",
                  borderColor: ratingFilter === n ? "#fcd34d" : "#d9d0bc",
                }}
              >
                <Star size={10} fill={ratingFilter === n ? "#b18d2b" : "none"} color={ratingFilter === n ? "#b18d2b" : "#bbb"} />
                {n}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <motion.div
        variants={containerVariants}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 22 }}
      >
        <KpiCard label="Avg Rating"    value={avgRating}         sub="Out of 5.0"             icon={Star}          trend="+0.2 this month" />
        <KpiCard label="Total Reviews" value={reviews.length}    sub="All time"               icon={MessageSquare} trend="+12 this month" />
        <KpiCard label="Pending"       value={pendingCount}      sub="Awaiting moderation"    icon={Clock} />
        <KpiCard label="Flagged"       value={flaggedCount}      sub="Needs attention"        icon={Flag} />
      </motion.div>

      {/* Rating Distribution */}
      <motion.div variants={itemVariants} style={{ marginBottom: 22 }}>
        <RatingDistribution />
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {/* Status tabs */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as any }}>
          <div style={{ display: "flex", gap: 2, background: "#edeae2", padding: 4, borderRadius: 10, border: "0.5px solid #ddd8cc", width: "fit-content", minWidth: "100%" }}>
            {ALL_STATUSES.map(s => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: "7px 16px", fontSize: 11, fontWeight: 800,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  borderRadius: 7, border: "none", cursor: "pointer",
                  transition: "background 0.15s, color 0.15s", whiteSpace: "nowrap",
                  background: statusFilter === s ? "#b18d2b" : "transparent",
                  color:      statusFilter === s ? "#fff" : "#7a6a4a",
                }}
              >
                {s === "all"
                  ? `All (${reviews.length})`
                  : `${s} (${reviews.filter(r => r.status === s).length})`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search + count */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search by customer, product or title…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={e => { e.target.style.borderColor = "#b18d2b"; }}
              onBlur={e => { e.target.style.borderColor = "#d9d0bc"; }}
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 36, paddingRight: 12, height: 38, fontSize: 16, color: "#1a1109", background: "#fff", border: "0.5px solid #d9d0bc", borderRadius: 9, outline: "none", transition: "border-color 0.15s" }}
            />
          </div>
          <p style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", flexShrink: 0 }}>
            {filtered.length} of {reviews.length}
          </p>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={statusFilter + searchTerm + String(ratingFilter)}
            variants={containerVariants}
            initial="hidden" animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 14 }}
          >
            {filtered.map(r => (
              <motion.div key={r.id} variants={cardVariants}>
                <ReviewCard review={r} onSelect={setSelectedReview} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 24px", background: "#fff", borderRadius: 14, border: "0.5px dashed #d9d0bc" }}
          >
            <div style={{ width: 44, height: 44, background: "#faf8f3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Search size={18} color="#c4b48a" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", margin: 0 }}>No reviews found</p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Detail Drawer */}
      <AnimatePresence>
        {selectedReview && (
          <ReviewDrawer
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
            onAction={handleAction}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}