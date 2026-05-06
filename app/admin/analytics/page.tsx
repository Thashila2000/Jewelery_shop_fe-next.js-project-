"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, TrendingDown, Package, DollarSign,
  ShoppingBag, AlertTriangle, Gem
} from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const }
  }
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MONTHLY_REVENUE = [
  { month: "Aug", revenue: 38400, orders: 12 },
  { month: "Sep", revenue: 52100, orders: 17 },
  { month: "Oct", revenue: 44800, orders: 14 },
  { month: "Nov", revenue: 71200, orders: 23 },
  { month: "Dec", revenue: 96400, orders: 31 },
  { month: "Jan", revenue: 58900, orders: 19 },
  { month: "Feb", revenue: 63200, orders: 21 },
  { month: "Mar", revenue: 74500, orders: 24 },
  { month: "Apr", revenue: 81300, orders: 26 },
  { month: "May", revenue: 68700, orders: 22 },
  { month: "Jun", revenue: 89200, orders: 28 },
  { month: "Jul", revenue: 102400, orders: 33 },
];

const CATEGORY_SALES = [
  { name: "Rings",     value: 38, revenue: 142600, color: "#b18d2b" },
  { name: "Necklaces", value: 27, revenue: 101200, color: "#d4af37" },
  { name: "Earrings",  value: 21, revenue: 78800,  color: "#c8a84b" },
  { name: "Bracelets", value: 14, revenue: 52400,  color: "#8a6d1f" },
];

const TOP_PRODUCTS = [
  { name: "Aurora Borealis Necklace", sku: "NCK-001", sold: 4,  revenue: 50000, category: "Necklaces", trend: "up" },
  { name: "Eternal Solitaire",        sku: "RNG-001", sold: 9,  revenue: 43200, category: "Rings",     trend: "up" },
  { name: "Tennis Bracelet",          sku: "BRC-001", sold: 5,  revenue: 44000, category: "Bracelets", trend: "up" },
  { name: "Sapphire Halo Ring",       sku: "RNG-002", sold: 6,  revenue: 37200, category: "Rings",     trend: "down" },
  { name: "Chandelier Sapphire",      sku: "EAR-002", sold: 4,  revenue: 30400, category: "Earrings",  trend: "up" },
];

const MATERIAL_BREAKDOWN = [
  { material: "18K White Gold",  pieces: 42, revenue: 198400, pct: 36 },
  { material: "18K Yellow Gold", pieces: 31, revenue: 124600, pct: 27 },
  { material: "22K Yellow Gold", pieces: 28, revenue: 86200,  pct: 18 },
  { material: "14K Rose Gold",   pieces: 19, revenue: 68800,  pct: 12 },
  { material: "Platinum",        pieces: 8,  revenue: 96400,  pct: 7  },
];

const STONE_PERFORMANCE = [
  { stone: "Moissanite", revenue: 312400, units: 48, avgPrice: 6508, badge: "top" },
  { stone: "Sapphire",   revenue: 98600,  units: 14, avgPrice: 7043, badge: null  },
  { stone: "Ruby",       revenue: 62800,  units: 11, avgPrice: 5709, badge: null  },
  { stone: "Emerald",    revenue: 56400,  units: 6,  avgPrice: 9400, badge: "avg" },
  { stone: "Pearl",      revenue: 34800,  units: 10, avgPrice: 3480, badge: null  },
];

const RECENT_ORDERS = [
  { id: "ORD-2847", item: "Aurora Borealis Necklace", amount: 12500, status: "completed", date: "Today, 11:42am",    method: "Bank Transfer" },
  { id: "ORD-2846", item: "Eternal Solitaire",        amount: 4800,  status: "completed", date: "Today, 09:18am",    method: "Card" },
  { id: "ORD-2845", item: "Sapphire Halo Ring",       amount: 6200,  status: "pending",   date: "Yesterday, 4:55pm", method: "Card" },
  { id: "ORD-2844", item: "Tennis Bracelet",          amount: 8800,  status: "completed", date: "Yesterday, 2:30pm", method: "Bank Transfer" },
  { id: "ORD-2843", item: "Majestic Pear-Cut Drop",   amount: 3200,  status: "completed", date: "Jul 3, 10:15am",    method: "Card" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({
  label, value, sub, icon: Icon, trend, trendVal,
}: {
  label: string; value: string; sub?: string;
  icon: React.ComponentType<{ size?: number; color?: string }>; trend?: "up" | "down"; trendVal?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(177,141,43,0.15)" }}
      style={{
        background: "#ffffff",
        border: "0.5px solid #e8e3d8",
        borderRadius: 14,
        padding: "16px 16px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 60, height: 60,
        background: "radial-gradient(circle at top right, rgba(177,141,43,0.07), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
          {label}
        </p>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "rgba(177,141,43,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={14} color="#b18d2b" />
        </div>
      </div>
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: 20, fontWeight: 800, color: "#1a1109", letterSpacing: "-0.03em", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, lineHeight: 1.1 }}
        >
          {value}
        </motion.p>
        {sub && <p style={{ fontSize: 10, color: "#999", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</p>}
      </div>
      {trend && trendVal && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 3,
          fontSize: 9, fontWeight: 700,
          color: trend === "up" ? "#166534" : "#be123c",
          background: trend === "up" ? "#f0fdf4" : "#fff1f2",
          border: `0.5px solid ${trend === "up" ? "#bbf7d0" : "#fecdd3"}`,
          borderRadius: 6, padding: "2px 6px",
          width: "fit-content",
        }}>
          {trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {trendVal}
        </div>
      )}
    </motion.div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 14, fontWeight: 800, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.01em" }}>{title}</h2>
      {sub && <p style={{ fontSize: 11, color: "#a08c5b", marginTop: 3, fontWeight: 500 }}>{sub}</p>}
    </div>
  );
}

// ─── Revenue Chart ─────────────────────────────────────────────────────────────
function RevenueChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...MONTHLY_REVENUE.map(d => d.revenue));
  const H = 140;

  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <SectionHeader title="Revenue Overview" sub="Last 12 months" />
      <div style={{ position: "relative", width: "100%" }}>
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <div key={p} style={{
            position: "absolute", left: 0, right: 0,
            bottom: p * H, height: "0.5px",
            background: p === 0 ? "#e8e3d8" : "rgba(232,227,216,0.3)",
            pointerEvents: "none",
          }} />
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2%", height: H, position: "relative", zIndex: 1 }}>
          {MONTHLY_REVENUE.map((d, i) => {
            const h = (d.revenue / max) * H;
            const isHov = hovered === i;
            return (
              <div
                key={i}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", cursor: "pointer", position: "relative" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
                      style={{
                        position: "absolute", bottom: h + 8, left: "50%",
                        background: "#1a1109", color: "#fff", borderRadius: 6,
                        padding: "5px 8px", fontSize: 10, fontWeight: 700,
                        whiteSpace: "nowrap", zIndex: 10,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      }}
                    >
                      {fmt(d.revenue)}<br />
                      <span style={{ color: "#b18d2b", fontSize: 9 }}>{d.orders} orders</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: i * 0.03, duration: 0.6, ease: "circOut" as const }}
                  style={{
                    width: "100%",
                    background: isHov
                      ? "linear-gradient(to top, #8a6d1f, #d4af37)"
                      : "linear-gradient(to top, #b18d2b, #e8c84a)",
                    borderRadius: "4px 4px 2px 2px",
                    transition: "background 0.2s",
                    boxShadow: isHov ? "0 4px 16px rgba(177,141,43,0.35)" : "none",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "2%", marginTop: 8 }}>
          {MONTHLY_REVENUE.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "10px", color: hovered === i ? "#b18d2b" : "#bbb", fontWeight: 600, transition: "color 0.2s" }}>
              {d.month}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const R = 52, r = 32, cx = 70, cy = 70;
  const total = CATEGORY_SALES.reduce((s, c) => s + c.value, 0);

  let angle = -90;
  const slices = CATEGORY_SALES.map((c, i) => {
    const deg = (c.value / total) * 360;
    const a1 = (angle * Math.PI) / 180;
    const a2 = ((angle + deg) * Math.PI) / 180;
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    const ix1 = cx + r * Math.cos(a1), iy1 = cy + r * Math.sin(a1);
    const ix2 = cx + r * Math.cos(a2), iy2 = cy + r * Math.sin(a2);
    const large = deg > 180 ? 1 : 0;
    const path = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${r} ${r} 0 ${large} 0 ${ix1} ${iy1} Z`;
    angle += deg;
    return { ...c, path, i };
  });

  const hov = hovered !== null ? CATEGORY_SALES[hovered] : null;

  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <SectionHeader title="Sales by Category" sub="Revenue distribution" />
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <svg width={140} height={140} style={{ flexShrink: 0 }}>
          {slices.map(s => (
            <motion.path
              key={s.i}
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: hovered === null || hovered === s.i ? 1 : 0.35, rotate: 0 }}
              d={s.path}
              fill={s.color}
              style={{ cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={() => setHovered(s.i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
          <text x={cx} y={cy - 7} textAnchor="middle" fontSize={13} fontWeight={800} fill="#1a1109">
            {hov ? `${hov.value}%` : "100%"}
          </text>
          <text x={cx} y={cy + 9} textAnchor="middle" fontSize={9} fill="#a08c5b" fontWeight={600}>
            {hov ? hov.name.toUpperCase() : "ALL SALES"}
          </text>
        </svg>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minWidth: 160 }}>
          {CATEGORY_SALES.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", opacity: hovered === null || hovered === i ? 1 : 0.4, transition: "opacity 0.2s" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#2d2520", flex: 1 }}>{c.name}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#b18d2b" }}>{fmt(c.revenue)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Top Products ──────────────────────────────────────────────────────────────
function TopProducts() {
  const max = Math.max(...TOP_PRODUCTS.map(p => p.revenue));
  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <SectionHeader title="Top Performing Pieces" sub="By total revenue this year" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {TOP_PRODUCTS.map((p, i) => (
          <motion.div key={i} whileHover={{ x: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 5,
                  background: i === 0 ? "linear-gradient(135deg,#b18d2b,#e8c84a)" : "#f5f3ee",
                  color: i === 0 ? "#fff" : "#a08c5b",
                  fontSize: 9, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>#{i + 1}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                  <p style={{ fontSize: 9, color: "#bbb", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.sku} · {p.sold} sold</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#b18d2b" }}>{fmt(p.revenue)}</span>
                {p.trend === "up"
                  ? <TrendingUp size={12} color="#16a34a" />
                  : <TrendingDown size={12} color="#dc2626" />}
              </div>
            </div>
            <div style={{ height: 4, background: "#f5f3ee", borderRadius: 99, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(p.revenue / max) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" as const }}
                style={{
                  height: "100%", borderRadius: 99,
                  background: i === 0
                    ? "linear-gradient(to right, #b18d2b, #e8c84a)"
                    : "linear-gradient(to right, #d4af37, #e8c84a)",
                  opacity: 1 - i * 0.12,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Material Breakdown ────────────────────────────────────────────────────────
function MaterialBreakdown() {
  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <SectionHeader title="Material Performance" sub="Revenue by metal type" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MATERIAL_BREAKDOWN.map((m, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#2d2520" }}>{m.material}</span>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "#bbb", fontWeight: 600 }}>{m.pieces} pcs</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#b18d2b" }}>{fmt(m.revenue)}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#a08c5b", width: 28, textAlign: "right" }}>{m.pct}%</span>
              </div>
            </div>
            <div style={{ height: 6, background: "#f5f3ee", borderRadius: 99, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ delay: 0.4 + i * 0.1, duration: 1, ease: "easeOut" as const }}
                style={{
                  height: "100%", borderRadius: 99,
                  background: `linear-gradient(to right, hsl(${42 - i * 5}, ${70 - i * 5}%, ${45 + i * 3}%), hsl(${48 - i * 4}, 72%, 58%))`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stone Performance ─────────────────────────────────────────────────────────
function StonePerformance() {
  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <SectionHeader title="Gemstone Analytics" sub="Performance by stone type" />
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 380 }}>
          <thead>
            <tr>
              {["Stone", "Revenue", "Units", "Avg Price"].map(h => (
                <th key={h} style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", padding: "0 8px 10px", textAlign: h === "Stone" ? "left" : "right", borderBottom: "0.5px solid #ede8db", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STONE_PERFORMANCE.map((s, i) => (
              <motion.tr
                key={i}
                whileHover={{ backgroundColor: "rgba(245, 243, 238, 0.5)" }}
                style={{ borderBottom: i < STONE_PERFORMANCE.length - 1 ? "0.5px solid #f5f3ee" : "none" }}
              >
                <td style={{ padding: "10px 8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <Gem size={12} color="#b18d2b" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1109" }}>{s.stone}</span>
                    {s.badge === "top" && (
                      <span style={{ fontSize: 8, fontWeight: 800, padding: "2px 5px", borderRadius: 3, background: "#fffbeb", color: "#92400e", border: "0.5px solid #fcd34d", letterSpacing: "0.08em" }}>TOP</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: "10px 8px", textAlign: "right", fontSize: 12, fontWeight: 800, color: "#b18d2b" }}>{fmt(s.revenue)}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "#2d2520" }}>{s.units}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "#2d2520" }}>${s.avgPrice.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Recent Orders ─────────────────────────────────────────────────────────────
function RecentOrders() {
  const statusStyle = (s: string) => s === "completed"
    ? { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" }
    : { bg: "#fffbeb", color: "#92400e", border: "#fcd34d" };

  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <SectionHeader title="Recent Transactions" sub="Latest sales activity" />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {RECENT_ORDERS.map((o, i) => {
          const st = statusStyle(o.status);
          return (
            <motion.div
              key={i}
              whileHover={{ x: 8, backgroundColor: "rgba(245, 243, 238, 0.3)" }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 8px", borderRadius: 8,
                borderBottom: i < RECENT_ORDERS.length - 1 ? "0.5px solid #f5f3ee" : "none",
                flexWrap: "nowrap", transition: "background 0.2s",
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "#faf8f3", border: "0.5px solid #ede8db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShoppingBag size={14} color="#b18d2b" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.item}</p>
                <p style={{ fontSize: 10, color: "#bbb", marginTop: 2, fontWeight: 500 }}>{o.id} · {o.date}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#b18d2b" }}>${o.amount.toLocaleString()}</span>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: st.bg, color: st.color, border: `0.5px solid ${st.border}`, textTransform: "capitalize", letterSpacing: "0.06em" }}>
                  {o.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Stock Health ──────────────────────────────────────────────────────────────
function StockHealth() {
  const items = [
    { name: "Sapphire Halo Ring",  sku: "RNG-002", stock: 1, max: 5 },
    { name: "Diamond Rivière",      sku: "NCK-001", stock: 1, max: 5 },
    { name: "Chandelier Sapphire", sku: "EAR-002", stock: 1, max: 5 },
    { name: "Emerald Cut Trilogy", sku: "RNG-004", stock: 2, max: 5 },
    { name: "Tennis Bracelet",     sku: "BRC-001", stock: 2, max: 5 },
  ];
  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#ffffff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "20px 20px 16px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <SectionHeader title="Stock Alerts" sub="Items needing replenishment" />
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 5, background: "#fff1f2", color: "#9f1239", border: "0.5px solid #fda4af", letterSpacing: "0.1em", marginTop: 2 }}
        >
          {items.length} ALERTS
        </motion.span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {items.map((it, i) => (
          <motion.div key={i} whileHover={{ x: 5 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AlertTriangle size={13} color={it.stock === 1 ? "#e11d48" : "#d97706"} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.name}</p>
              <p style={{ fontSize: 9, color: "#bbb", marginTop: 1, letterSpacing: "0.1em" }}>{it.sku}</p>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 800,
              color: it.stock === 1 ? "#be123c" : "#b45309",
              background: it.stock === 1 ? "#fff1f2" : "#fffbeb",
              border: `0.5px solid ${it.stock === 1 ? "#fecdd3" : "#fde68a"}`,
              borderRadius: 5, padding: "2px 7px", flexShrink: 0,
            }}>
              {it.stock} left
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "1y">("1y");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: "100vh", background: "#f5f3ee",
        padding: "24px 16px 64px",
        boxSizing: "border-box", width: "100%",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .kpi-grid {
          display: grid;
          gap: 12px;
          margin-bottom: 20px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .kpi-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1200px) {
          .kpi-grid { grid-template-columns: repeat(6, 1fr); }
        }
      `}} />

      {/* Header */}
      <motion.div
        variants={itemVariants}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12, flexWrap: "wrap" }}
      >
        <div style={{ transform: "translateY(-10px)" }}>
          <h1 style={{ fontSize: 31, fontWeight: 750, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "sans-serif" }}>
            Analytics
          </h1>
          <p style={{ fontSize: 12, fontWeight: 800, color: "#b18d2b", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6 }}>
            Luxury Asset Management
          </p>
        </div>

        <div style={{ display: "flex", gap: 2, background: "#edeae2", padding: 4, borderRadius: 10, border: "0.5px solid #ddd8cc", flexShrink: 0 }}>
          {(["7d", "30d", "90d", "1y"] as const).map(p => (
            <motion.button
              key={p}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPeriod(p)}
              style={{
                padding: "7px 14px", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.06em", textTransform: "uppercase",
                borderRadius: 7, border: "none", cursor: "pointer", transition: "all 0.15s",
                background: period === p ? "#b18d2b" : "transparent",
                color: period === p ? "#ffffff" : "#7a6a4a",
              }}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="kpi-grid">
        <KpiCard label="Revenue"   value="$841.2k"   sub="This year"    icon={DollarSign}    trend="up"   trendVal="+14.8%" />
        <KpiCard label="Orders"    value="231"        sub="Pieces sold"  icon={ShoppingBag}   trend="up"   trendVal="+9.2%"  />
        <KpiCard label="Avg Order" value="$3,641"     sub="Per trans."   icon={TrendingUp}    trend="up"   trendVal="+5.1%"  />
        <KpiCard label="Listings"  value="94"         sub="4 categories" icon={Package} />
        <KpiCard label="Low Stock" value="5"          sub="Needs action" icon={AlertTriangle} trend="down" trendVal="-2"     />
        <KpiCard label="Top Stone" value="Moissanite" sub="$312k total"  icon={Gem} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 14 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <RevenueChart />
        </div>
        <DonutChart />
        <TopProducts />
        <MaterialBreakdown />
        <StonePerformance />
        <div style={{ gridColumn: "1 / -1" }}>
          <RecentOrders />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <StockHealth />
        </div>
      </div>
    </motion.div>
  );
}
