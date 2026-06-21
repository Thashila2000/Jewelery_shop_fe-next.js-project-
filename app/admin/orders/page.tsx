"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Search, Filter, 
  ExternalLink, Clock, CheckCircle2, AlertCircle,
  Package, Truck, CreditCard, Gem, X, ChevronDown,
  TrendingUp, DollarSign, Eye, Printer, RefreshCw,
  MapPin, Phone, Mail, Calendar, ArrowUpRight, Plus
} from "lucide-react";

// ─── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
} as const;
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};
const cardVariants = {
  hidden: { y: 16, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};
const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.32, ease: "easeOut" as const } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.22, ease: "easeIn" as const } },
};
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const ORDERS = [
  {
    id: "ORD-2847", customer: "Sophia Loren", email: "sophia@example.com", phone: "+94 77 123 4567",
    address: "12 Cinnamon Gardens, Colombo 7, Sri Lanka",
    item: "Aurora Borealis Necklace", sku: "NCK-001", amount: 12500, status: "processing",
    date: "Today, 11:42am", dateRaw: "2024-07-05", type: "High Jewelry",
    method: "Bank Transfer", category: "Necklaces", stone: "Diamond (5ct)",
    karat: "18K White Gold", notes: "Gift wrapping requested. Delivery by July 10.",
    timeline: [
      { label: "Order Placed", time: "11:42am", done: true },
      { label: "Payment Confirmed", time: "11:48am", done: true },
      { label: "Crafting / QC", time: "In progress", done: false },
      { label: "Dispatched", time: "—", done: false },
      { label: "Delivered", time: "—", done: false },
    ],
  },
  {
    id: "ORD-2846", customer: "Alexander Reed", email: "alex.reed@example.com", phone: "+94 71 987 6543",
    address: "45 Flower Road, Colombo 3, Sri Lanka",
    item: "Eternal Solitaire Band", sku: "RNG-001", amount: 4800, status: "completed",
    date: "Today, 09:18am", dateRaw: "2024-07-05", type: "Bridal",
    method: "Credit Card", category: "Rings", stone: "Diamond (1.2ct)",
    karat: "18K White Gold", notes: "Ring size 7. Engraving: 'Forever yours'.",
    timeline: [
      { label: "Order Placed", time: "09:18am", done: true },
      { label: "Payment Confirmed", time: "09:21am", done: true },
      { label: "Crafting / QC", time: "10:40am", done: true },
      { label: "Dispatched", time: "12:15pm", done: true },
      { label: "Delivered", time: "3:30pm", done: true },
    ],
  },
  {
    id: "ORD-2845", customer: "Isabella Vanthorpe", email: "iv@example.com", phone: "+94 76 555 7890",
    address: "8 Galle Face Terrace, Colombo 3, Sri Lanka",
    item: "Sapphire Halo Ring", sku: "RNG-002", amount: 6200, status: "pending",
    date: "Yesterday, 4:55pm", dateRaw: "2024-07-04", type: "Custom",
    method: "Card", category: "Rings", stone: "Blue Sapphire (2ct)",
    karat: "18K Yellow Gold", notes: "Awaiting payment confirmation from bank.",
    timeline: [
      { label: "Order Placed", time: "4:55pm", done: true },
      { label: "Payment Confirmed", time: "Pending", done: false },
      { label: "Crafting / QC", time: "—", done: false },
      { label: "Dispatched", time: "—", done: false },
      { label: "Delivered", time: "—", done: false },
    ],
  },
  {
    id: "ORD-2844", customer: "Julian Thorne", email: "j.thorne@example.com", phone: "+94 70 222 3344",
    address: "22 Rosmead Place, Colombo 7, Sri Lanka",
    item: "Tennis Bracelet Classic", sku: "BRC-001", amount: 8800, status: "shipped",
    date: "Yesterday, 2:30pm", dateRaw: "2024-07-04", type: "Classic",
    method: "Bank Transfer", category: "Bracelets", stone: "Diamond (3ct)",
    karat: "18K White Gold", notes: "Express courier. Tracking: DHL-9847612.",
    timeline: [
      { label: "Order Placed", time: "2:30pm", done: true },
      { label: "Payment Confirmed", time: "2:35pm", done: true },
      { label: "Crafting / QC", time: "5:00pm", done: true },
      { label: "Dispatched", time: "8:00am", done: true },
      { label: "Delivered", time: "—", done: false },
    ],
  },
  {
    id: "ORD-2843", customer: "Priya Nair", email: "priya@example.com", phone: "+94 77 444 5566",
    address: "3 Park Street, Colombo 2, Sri Lanka",
    item: "Diamond Stud Pair", sku: "EAR-001", amount: 3200, status: "completed",
    date: "Jul 3, 10:15am", dateRaw: "2024-07-03", type: "Classic",
    method: "Card", category: "Earrings", stone: "Diamond (0.5ct each)",
    karat: "18K White Gold", notes: "Standard packaging.",
    timeline: [
      { label: "Order Placed", time: "10:15am", done: true },
      { label: "Payment Confirmed", time: "10:18am", done: true },
      { label: "Crafting / QC", time: "11:30am", done: true },
      { label: "Dispatched", time: "2:00pm", done: true },
      { label: "Delivered", time: "Jul 4, 10am", done: true },
    ],
  },
  {
    id: "ORD-2842", customer: "Marco Ferretti", email: "marco@example.com", phone: "+94 71 333 2211",
    address: "67 Ward Place, Colombo 7, Sri Lanka",
    item: "Emerald Cut Trilogy", sku: "RNG-004", amount: 9400, status: "processing",
    date: "Jul 3, 8:00am", dateRaw: "2024-07-03", type: "High Jewelry",
    method: "Bank Transfer", category: "Rings", stone: "Emerald (3ct)",
    karat: "PT950", notes: "Client requests video call QC inspection before dispatch.",
    timeline: [
      { label: "Order Placed", time: "8:00am", done: true },
      { label: "Payment Confirmed", time: "9:15am", done: true },
      { label: "Crafting / QC", time: "In progress", done: false },
      { label: "Dispatched", time: "—", done: false },
      { label: "Delivered", time: "—", done: false },
    ],
  },
];

const KPI = [
  { label: "Total Orders",    value: "128",    sub: "This month",       icon: ShoppingBag, trend: "+9.2%" },
  { label: "Revenue",         value: "$841k",  sub: "This month",       icon: DollarSign,  trend: "+14.8%" },
  { label: "Avg Order",       value: "$3,641", sub: "Per transaction",  icon: TrendingUp,  trend: "+5.1%" },
  { label: "Pending",         value: "6",      sub: "Awaiting action",  icon: Clock,       trend: null },
];

const STATUS_META: Record<string, { bg: string; color: string; border: string; icon: React.ComponentType<{ size?: number; color?: string }>; label: string }> = {
  completed:  { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", icon: CheckCircle2, label: "Completed" },
  processing: { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe", icon: RefreshCw,    label: "Processing" },
  shipped:    { bg: "#f5f3ff", color: "#5b21b6", border: "#ddd6fe", icon: Truck,        label: "Shipped" },
  pending:    { bg: "#fffbeb", color: "#92400e", border: "#fcd34d", icon: AlertCircle,  label: "Pending" },
};

const ALL_STATUSES = ["all", "pending", "processing", "shipped", "completed"];

// ─── Helpers ───────────────────────────────────────────────────────────────────
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
      <Icon size={9} color={s.color} /> {s.label}
    </div>
  );
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon: Icon, trend }: {
  label: string; value: string; sub: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  trend: string | null;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(177,141,43,0.13)" }}
      style={{
        background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14,
        padding: "18px 18px 14px", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "radial-gradient(circle at top right, rgba(177,141,43,0.07), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{label}</p>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(177,141,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} color="#b18d2b" />
        </div>
      </div>
      <p style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.03em", marginTop: 0, marginBottom: 2, marginLeft: 0, marginRight: 0, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 10, color: "#999", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{sub}</p>
      {trend && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 8, fontSize: 9, fontWeight: 700, color: "#166534", background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 5, padding: "2px 6px" }}>
          <TrendingUp size={9} color="#166534" /> {trend}
        </div>
      )}
    </motion.div>
  );
}

// ─── Order Detail Drawer ────────────────────────────────────────────────────────
function OrderDrawer({ order, onClose }: { order: any; onClose: () => void }) {
  const s = STATUS_META[order.status] ?? STATUS_META.pending;
  return (
    <>
      <motion.div
        key="overlay"
        variants={overlayVariants}
        initial="hidden" animate="visible" exit="exit"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(20,15,5,0.45)", zIndex: 300 }}
      />
      <motion.div
        key="drawer"
        variants={drawerVariants}
        initial="hidden" animate="visible" exit="exit"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(480px, 100vw)",
          background: "#fff", zIndex: 301,
          borderLeft: "0.5px solid #e8e3d8",
          display: "flex", flexDirection: "column",
          boxShadow: "-12px 0 40px rgba(0,0,0,0.1)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 22px 16px", borderBottom: "0.5px solid #f0ece6", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 0, marginBottom: 4, marginLeft: 0, marginRight: 0 }}>Order Details</p>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.02em" }}>{order.id}</h2>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <StatusBadge status={order.status} />
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
          <p style={{ fontSize: 11, color: "#bbb", marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            <Calendar size={10} style={{ verticalAlign: "middle", marginRight: 4 }} />{order.date}
          </p>
        </div>

        <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Item */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "16px 16px 14px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 10, marginLeft: 0, marginRight: 0 }}>Piece</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(177,141,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Gem size={18} color="#b18d2b" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{order.item}</p>
                <p style={{ fontSize: 10, color: "#a08c5b", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0, fontWeight: 600 }}>{order.sku} · {order.category} · {order.type}</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginTop: 14 }}>
              {[["Stone", order.stone], ["Metal", order.karat], ["Method", order.method]].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginTop: 0, marginBottom: 2, marginLeft: 0, marginRight: 0 }}>{k}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#2d2520", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{v}</p>
                </div>
              ))}
              <div>
                <p style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginTop: 0, marginBottom: 2, marginLeft: 0, marginRight: 0 }}>Amount</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#b18d2b", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>${order.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Client */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "16px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0 }}>Client</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#b18d2b,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {order.customer.charAt(0)}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{order.customer}</p>
            </div>
            {([
              [Mail,  order.email],
              [Phone, order.phone],
              [MapPin, order.address],
            ] as [React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>, string][]).map(([Icon, val], i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: i < 2 ? 8 : 0 }}>
                <Icon size={12} color="#b18d2b" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Notes */}
          {order.notes && (
            <div style={{ background: "#fffbeb", border: "0.5px solid #fde68a", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 5, marginLeft: 0, marginRight: 0 }}>Notes</p>
              <p style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{order.notes}</p>
            </div>
          )}

          {/* Timeline */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 14, marginLeft: 0, marginRight: 0 }}>Order Timeline</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {order.timeline.map((step: any, i: number) => {
                const isLast = i === order.timeline.length - 1;
                const isActive = step.done && (isLast || !order.timeline[i + 1]?.done);
                return (
                  <div key={i} style={{ display: "flex", gap: 12, paddingBottom: isLast ? 0 : 16, position: "relative" }}>
                    {!isLast && (
                      <div style={{ position: "absolute", left: 10, top: 22, bottom: 0, width: 1, background: step.done ? "#b18d2b" : "#e8e3d8" }} />
                    )}
                    <div style={{
                      width: 21, height: 21, borderRadius: "50%", flexShrink: 0,
                      background: step.done ? (isActive ? "#b18d2b" : "#ede8db") : "#f5f3ee",
                      border: `1.5px solid ${step.done ? "#b18d2b" : "#ddd8cc"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1,
                    }}>
                      {step.done && <CheckCircle2 size={11} color={isActive ? "#fff" : "#b18d2b"} />}
                    </div>
                    <div style={{ paddingTop: 2 }}>
                      <p style={{ fontSize: 12, fontWeight: step.done ? 700 : 500, color: step.done ? "#1a1109" : "#bbb", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{step.label}</p>
                      <p style={{ fontSize: 10, color: "#bbb", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{step.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer actions */}
        <div style={{ padding: "16px 22px", borderTop: "0.5px solid #f0ece6", flexShrink: 0, display: "flex", gap: 10 }}>
          <motion.button
            whileHover={{ background: "#f5f3ee" } as any}
            whileTap={{ scale: 0.96 }}
            style={{ flex: 1, height: 38, borderRadius: 9, border: "0.5px solid #d9d0bc", background: "#fff", fontSize: 11, fontWeight: 700, color: "#555", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <Printer size={13} /> Print Invoice
          </motion.button>
          <motion.button
            whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
            whileTap={{ scale: 0.96 }}
            style={{ flex: 1, height: 38, borderRadius: 9, border: "none", background: "#b18d2b", fontSize: 11, fontWeight: 800, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            Update Status <ArrowUpRight size={13} />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const filtered = ORDERS.filter(o => {
    const matchSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      style={{ minHeight: "100vh", background: "#f5f3ee", padding: "24px 16px 64px", boxSizing: "border-box", width: "100%" }}
    >
      {/* Header — matches promotions page exactly */}
      <motion.div
        variants={itemVariants}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 12, flexWrap: "wrap" }}
      >
        <div style={{ transform: "translateY(-10px)" }}>
          <h1 style={{
            fontSize: 31,
            fontWeight: 750,
            color: "#1a1109",
            marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}>
            Order Registry
          </h1>
          <p style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#b18d2b",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0,
          }}>
            KANDY Luxury Client Acquisitions
          </p>
        </div>
        <motion.button
          whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
          whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 20px", background: "#b18d2b", color: "#fff", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", flexShrink: 0 }}
        >
          <Plus size={14} /> New Order
        </motion.button>
      </motion.div>

      {/* KPI Grid */}
      <motion.div
        variants={containerVariants}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 22 }}
      >
        {KPI.map((k, i) => <KpiCard key={i} {...k} />)}
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
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
                  color: statusFilter === s ? "#fff" : "#7a6a4a",
                }}
              >
                {s === "all" ? `All (${ORDERS.length})` : `${s} (${ORDERS.filter(o => o.status === s).length})`}
              </motion.button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search by order ID, client or item…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={e => { e.target.style.borderColor = "#b18d2b"; }}
              onBlur={e => { e.target.style.borderColor = "#d9d0bc"; }}
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 36, paddingRight: 12, height: 38, fontSize: 16, color: "#1a1109", background: "#fff", border: "0.5px solid #d9d0bc", borderRadius: 9, outline: "none", transition: "border-color 0.15s" }}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilterBar(f => !f)}
            style={{
              display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 14px", flexShrink: 0,
              fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
              border: "0.5px solid", borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
              background: showFilterBar ? "#fffbeb" : "#fff",
              color: showFilterBar ? "#92400e" : "#7a6a4a",
              borderColor: showFilterBar ? "#fcd34d" : "#d9d0bc",
            }}
          >
            <Filter size={12} /> Filter
          </motion.button>
          <p style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", flexShrink: 0 }}>{filtered.length} of {ORDERS.length}</p>
        </div>
      </motion.div>

      {/* Orders table */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div key={statusFilter + searchTerm} variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            <motion.div
              variants={itemVariants}
              style={{ background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px -5px rgba(0,0,0,0.05)" }}
            >
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                  <thead>
                    <tr style={{ background: "#faf8f3", borderBottom: "0.5px solid #e8e3d8" }}>
                      {["Order", "Client", "Piece", "Amount", "Status", "Date", ""].map((h, i) => (
                        <th key={i} style={{ textAlign: "left", padding: "14px 18px", fontSize: 9, fontWeight: 800, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        whileHover={{ backgroundColor: "rgba(245,243,238,0.6)" } as any}
                        onClick={() => setSelectedOrder(order)}
                        style={{ borderBottom: i < filtered.length - 1 ? "0.5px solid #f5f3ee" : "none", cursor: "pointer" }}
                      >
                        <td style={{ padding: "16px 18px" }}>
                          <p style={{ fontSize: 12, fontWeight: 800, color: "#1a1109", marginTop: 0, marginBottom: 2, marginLeft: 0, marginRight: 0 }}>{order.id}</p>
                          <p style={{ fontSize: 9, color: "#bbb", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontWeight: 500 }}>{order.type}</p>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#b18d2b,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                              {order.customer.charAt(0)}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontSize: 12, fontWeight: 700, color: "#2d2520", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.customer}</p>
                              <p style={{ fontSize: 9, color: "#bbb", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{order.method}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <Gem size={12} color="#b18d2b" style={{ flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>{order.item}</p>
                              <p style={{ fontSize: 9, color: "#a08c5b", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontWeight: 600 }}>{order.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <p style={{ fontSize: 14, fontWeight: 800, color: "#b18d2b", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>${order.amount.toLocaleString()}</p>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <StatusBadge status={order.status} />
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <p style={{ fontSize: 11, color: "#888", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, whiteSpace: "nowrap" }}>{order.date}</p>
                        </td>
                        <td style={{ padding: "16px 18px" }}>
                          <motion.div
                            whileHover={{ x: 3 }}
                            style={{ width: 28, height: 28, borderRadius: 7, background: "#f5f3ee", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                          >
                            <Eye size={13} color="#a08c5b" />
                          </motion.div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ padding: "14px 18px", background: "#faf8f3", borderTop: "0.5px solid #e8e3d8", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#a08c5b", fontWeight: 600 }}>Showing {filtered.length} of 128 orders</span>
                <div style={{ display: "flex", gap: 5 }}>
                  {[1, 2, 3, "…", 12].map((n, i) => (
                    <button key={i} style={{
                      minWidth: 28, height: 28, borderRadius: 6,
                      border: "0.5px solid #e8e3d8",
                      background: n === 1 ? "#b18d2b" : "#fff",
                      color: n === 1 ? "#fff" : "#7a6a4a",
                      fontSize: 11, fontWeight: 700, cursor: "pointer", padding: "0 6px",
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </motion.div>
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
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>No orders found</p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 4, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Detail Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}