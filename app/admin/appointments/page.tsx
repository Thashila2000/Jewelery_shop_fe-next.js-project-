"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, User, Phone, Mail, MapPin,
  Plus, Search, CheckCircle2, XCircle, AlertCircle,
  Gem, X, Trash2, Edit, ChevronLeft, ChevronRight,
  TrendingUp, RefreshCw, Star, MessageSquare
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

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" as const } },
  exit:    { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const APPOINTMENTS = [
  {
    id: "APT-001", customer: "Sophia Loren", avatar: "S",
    email: "sophia@example.com", phone: "+94 77 123 4567",
    date: "2024-07-08", time: "10:00 AM", duration: 60,
    type: "Bespoke Consultation", status: "confirmed",
    interest: "Custom Engagement Ring", budget: "$8,000–$12,000",
    notes: "Client interested in a pear-cut sapphire with diamond halo. Bring Ceylon sapphire samples.",
    staff: "Amara De Silva", location: "Colombo Showroom",
    createdAt: "Today, 9:15am",
  },
  {
    id: "APT-002", customer: "Alexander Reed", avatar: "A",
    email: "alex.reed@example.com", phone: "+94 71 987 6543",
    date: "2024-07-08", time: "2:00 PM", duration: 45,
    type: "Ring Sizing & Pickup", status: "confirmed",
    interest: "Eternal Solitaire Band — RNG-001", budget: "Existing Order",
    notes: "Collecting engraved ring. Final sizing check required before handover.",
    staff: "Kavindra Perera", location: "Colombo Showroom",
    createdAt: "Yesterday, 4:30pm",
  },
  {
    id: "APT-003", customer: "Isabella Vanthorpe", avatar: "I",
    email: "iv@example.com", phone: "+94 76 555 7890",
    date: "2024-07-09", time: "11:30 AM", duration: 90,
    type: "Bespoke Consultation", status: "pending",
    interest: "Bridal Set — Necklace + Earrings", budget: "$20,000+",
    notes: "High-value client. Prefers Platinum settings. Husband travelling internationally.",
    staff: "Amara De Silva", location: "Private Suite",
    createdAt: "Today, 11:00am",
  },
  {
    id: "APT-004", customer: "Julian Thorne", avatar: "J",
    email: "j.thorne@example.com", phone: "+94 70 222 3344",
    date: "2024-07-09", time: "3:30 PM", duration: 30,
    type: "Jewellery Valuation", status: "confirmed",
    interest: "Inherited piece valuation — bracelet + brooch", budget: "N/A",
    notes: "Two pieces brought in for insurance valuation. Certificates required.",
    staff: "Kavindra Perera", location: "Colombo Showroom",
    createdAt: "Jul 3, 2:00pm",
  },
  {
    id: "APT-005", customer: "Priya Nair", avatar: "P",
    email: "priya@example.com", phone: "+94 77 444 5566",
    date: "2024-07-10", time: "10:30 AM", duration: 60,
    type: "Repair & Restoration", status: "pending",
    interest: "Clasp repair on tennis bracelet + re-polishing", budget: "Service",
    notes: "BRC-001 clasp worn. Light scratches on links. Estimated turnaround 5 days.",
    staff: "Thushan Jayawardena", location: "Workshop",
    createdAt: "Today, 8:45am",
  },
  {
    id: "APT-006", customer: "Marco Ferretti", avatar: "M",
    email: "marco@example.com", phone: "+94 71 333 2211",
    date: "2024-07-10", time: "4:00 PM", duration: 60,
    type: "Bespoke Consultation", status: "cancelled",
    interest: "Anniversary gift — surprise necklace", budget: "$5,000–$8,000",
    notes: "Client cancelled due to travel. Rescheduling for July 17.",
    staff: "Amara De Silva", location: "Colombo Showroom",
    createdAt: "Jul 2, 5:00pm",
  },
  {
    id: "APT-007", customer: "Amelia Torres", avatar: "A",
    email: "amelia@example.com", phone: "+94 76 888 1122",
    date: "2024-07-11", time: "1:00 PM", duration: 45,
    type: "Ring Sizing & Pickup", status: "confirmed",
    interest: "Pavé Diamond Band — RNG-003", budget: "Existing Order",
    notes: "Ring ready for collection. Gift wrap requested.",
    staff: "Kavindra Perera", location: "Colombo Showroom",
    createdAt: "Jul 4, 10:30am",
  },
  {
    id: "APT-008", customer: "David Chen", avatar: "D",
    email: "david@example.com", phone: "+94 70 999 0011",
    date: "2024-07-12", time: "11:00 AM", duration: 90,
    type: "Bespoke Consultation", status: "pending",
    interest: "Corporate gifting — 10 branded pieces", budget: "$30,000+",
    notes: "Corporate client. Wants branded gift boxes with company monogram. Bulk pricing required.",
    staff: "Amara De Silva", location: "Private Suite",
    createdAt: "Today, 7:30am",
  },
];

const TYPE_META: Record<string, { color: string; bg: string; border: string }> = {
  "Bespoke Consultation": { color: "#5b21b6", bg: "#f5f3ff", border: "#ddd6fe" },
  "Ring Sizing & Pickup":  { color: "#065f46", bg: "#ecfdf5", border: "#6ee7b7" },
  "Jewellery Valuation":   { color: "#92400e", bg: "#fffbeb", border: "#fcd34d" },
  "Repair & Restoration":  { color: "#1e40af", bg: "#eff6ff", border: "#bfdbfe" },
};

const STATUS_META: Record<string, { bg: string; color: string; border: string; icon: any; label: string }> = {
  confirmed:  { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", icon: CheckCircle2, label: "Confirmed" },
  pending:    { bg: "#fffbeb", color: "#92400e", border: "#fcd34d", icon: AlertCircle,  label: "Pending"   },
  cancelled:  { bg: "#fff1f2", color: "#9f1239", border: "#fda4af", icon: XCircle,      label: "Cancelled" },
  completed:  { bg: "#f5f3ff", color: "#5b21b6", border: "#ddd6fe", icon: Star,         label: "Completed" },
};

const ALL_STATUSES = ["all", "confirmed", "pending", "cancelled"];
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [8, 9, 10, 11, 12, 13, 14];

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function TypeBadge({ type }: { type: string }) {
  const t = TYPE_META[type] ?? { color: "#a08c5b", bg: "#faf8f3", border: "#ede8db" };
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 4,
      background: t.bg, color: t.color, border: `0.5px solid ${t.border}`,
      textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap",
    }}>
      {type}
    </span>
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
        color: "#1a1109", 
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

// ─── Week Calendar Strip ───────────────────────────────────────────────────────
function WeekStrip({ selectedDate, onSelect, appointments }: { selectedDate: number; onSelect: (d: number) => void; appointments: any[] }) {
  const countForDate = (d: number) => appointments.filter(a => parseInt(a.date.split("-")[2]) === d).length;

  return (
    <motion.div
      variants={itemVariants}
      style={{ background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "16px 18px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#1a1109", margin: 0 }}>MAY 2026</p>
        <div style={{ display: "flex", gap: 6 }}>
          <motion.button whileTap={{ scale: 0.9 }} style={{ width: 26, height: 26, borderRadius: 7, border: "0.5px solid #e8e3d8", background: "#faf8f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={13} color="#a08c5b" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} style={{ width: 26, height: 26, borderRadius: 7, border: "0.5px solid #e8e3d8", background: "#faf8f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronRight size={13} color="#a08c5b" />
          </motion.button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {WEEK_DAYS.map((d, i) => (
          <div key={d} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>{d}</p>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelect(DATES[i])}
              style={{
                width: "100%", aspectRatio: "1", borderRadius: 9, border: "0.5px solid",
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 2,
                transition: "all 0.15s",
                background: selectedDate === DATES[i] ? "#b18d2b" : "#faf8f3",
                borderColor: selectedDate === DATES[i] ? "#b18d2b" : "#ede8db",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: selectedDate === DATES[i] ? "#fff" : "#1a1109", lineHeight: 1 }}>
                {DATES[i]}
              </span>
              {countForDate(DATES[i]) > 0 && (
                <span style={{
                  fontSize: 8, fontWeight: 800, lineHeight: 1,
                  color: selectedDate === DATES[i] ? "rgba(255,255,255,0.8)" : "#b18d2b",
                }}>
                  {countForDate(DATES[i])}
                </span>
              )}
            </motion.button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Appointment Card ─────────────────────────────────────────────────────────
function AppointmentCard({ apt, onSelect }: { apt: any; onSelect: (a: any) => void }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(177,141,43,0.1)" }}
      onClick={() => onSelect(apt)}
      style={{
        background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14,
        padding: "16px 16px 14px", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 12,
        position: "relative", overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* left colour bar by type */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: TYPE_META[apt.type]?.color ?? "#b18d2b",
        borderRadius: "14px 0 0 14px",
      }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, paddingLeft: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #b18d2b, #d4af37)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "#fff",
          }}>
            {apt.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{apt.customer}</p>
            <p style={{ fontSize: 9, color: "#bbb", margin: "1px 0 0" }}>{apt.createdAt}</p>
          </div>
        </div>
        <StatusBadge status={apt.status} />
      </div>

      {/* Time + type */}
      <div style={{ paddingLeft: 8, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: "#faf8f3", borderRadius: 7, border: "0.5px solid #ede8db" }}>
          <Clock size={11} color="#b18d2b" />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#1a1109" }}>{apt.time}</span>
          <span style={{ fontSize: 10, color: "#bbb" }}>{apt.duration}min</span>
        </div>
        <TypeBadge type={apt.type} />
      </div>

      {/* Interest */}
      <div style={{ paddingLeft: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Gem size={11} color="#b18d2b" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 12, fontWeight: 600, color: "#2d2520", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{apt.interest}</p>
        </div>
        {apt.budget !== "N/A" && apt.budget !== "Existing Order" && apt.budget !== "Service" && (
          <p style={{ fontSize: 10, color: "#a08c5b", margin: "3px 0 0", fontWeight: 600, paddingLeft: 17 }}>{apt.budget}</p>
        )}
      </div>

      {/* Footer */}
      <div style={{ paddingLeft: 8, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "0.5px solid #f0ece6", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <User size={10} color="#bbb" />
          <span style={{ fontSize: 10, color: "#bbb", fontWeight: 600 }}>{apt.staff}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={10} color="#bbb" />
          <span style={{ fontSize: 10, color: "#bbb", fontWeight: 600 }}>{apt.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Appointment Drawer ────────────────────────────────────────────────────────
function AppointmentDrawer({ apt, onClose, onAction }: { apt: any; onClose: () => void; onAction: (id: string, action: string) => void }) {
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
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Appointment</p>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1109", margin: 0, letterSpacing: "-0.02em" }}>{apt.id}</h2>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <StatusBadge status={apt.status} />
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

          {/* Date & Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              [Calendar, "Date",     apt.date],
              [Clock,    "Time",     `${apt.time} · ${apt.duration} min`],
              [User,     "Staff",    apt.staff],
              [MapPin,   "Location", apt.location],
            ].map(([Icon, label, val], i) => (
              <div key={i} style={{ background: "#faf8f3", borderRadius: 10, border: "0.5px solid #ede8db", padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  {/* @ts-ignore */}
                  <Icon size={11} color="#b18d2b" />
                  <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{label as string}</p>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1109", margin: 0 }}>{val as string}</p>
              </div>
            ))}
          </div>

          {/* Client */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "16px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px" }}>Client</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#b18d2b,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {apt.avatar}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", margin: 0 }}>{apt.customer}</p>
            </div>
            {[[Mail, apt.email], [Phone, apt.phone]].map(([Icon, val], i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: i === 0 ? 8 : 0 }}>
                {/* @ts-ignore */}
                <Icon size={12} color="#b18d2b" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#555" }}>{val as string}</span>
              </div>
            ))}
          </div>

          {/* Interest + Budget */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "16px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 10px" }}>Interest & Budget</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Gem size={14} color="#b18d2b" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", margin: 0 }}>{apt.interest}</p>
            </div>
            <TypeBadge type={apt.type} />
            {apt.budget !== "N/A" && (
              <p style={{ fontSize: 12, color: "#a08c5b", margin: "8px 0 0", fontWeight: 700 }}>Budget: {apt.budget}</p>
            )}
          </div>

          {/* Notes */}
          {apt.notes && (
            <div style={{ background: "#fffbeb", border: "0.5px solid #fde68a", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 6px" }}>Staff Notes</p>
              <p style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6, margin: 0 }}>{apt.notes}</p>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        <div style={{ padding: "14px 22px 18px", borderTop: "0.5px solid #f0ece6", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {apt.status !== "confirmed" && apt.status !== "completed" && (
              <motion.button
                whileHover={{ background: "#f0fdf4" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(apt.id, "confirm")}
                style={{ flex: 1, height: 38, borderRadius: 9, border: "0.5px solid #bbf7d0", background: "#fff", fontSize: 11, fontWeight: 700, color: "#166534", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <CheckCircle2 size={13} /> Confirm
              </motion.button>
            )}
            {apt.status === "confirmed" && (
              <motion.button
                whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(apt.id, "complete")}
                style={{ flex: 1, height: 38, borderRadius: 9, border: "none", background: "#b18d2b", fontSize: 11, fontWeight: 800, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <Star size={13} /> Mark Complete
              </motion.button>
            )}
            {apt.status !== "cancelled" && (
              <motion.button
                whileHover={{ background: "#fff1f2" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(apt.id, "cancel")}
                style={{ flex: 1, height: 38, borderRadius: 9, border: "0.5px solid #fda4af", background: "#fff", fontSize: 11, fontWeight: 700, color: "#9f1239", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <XCircle size={13} /> Cancel
              </motion.button>
            )}
            <motion.button
              whileHover={{ background: "#fff1f2" } as any}
              whileTap={{ scale: 0.96 }}
              onClick={() => onAction(apt.id, "delete")}
              style={{ width: 38, height: 38, borderRadius: 9, border: "0.5px solid #fda4af", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Trash2 size={14} color="#9f1239" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── New Appointment Modal ─────────────────────────────────────────────────────
const EMPTY_FORM = {
  customer: "", email: "", phone: "",
  date: "", time: "", duration: "60",
  type: "Bespoke Consultation", interest: "", budget: "", notes: "",
  staff: "Amara De Silva", location: "Colombo Showroom",
};

function NewAppointmentModal({ onClose, onSave }: { onClose: () => void; onSave: (f: any) => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const set = (k: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const inputBase: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", fontSize: 16, color: "#1a1109",
    padding: "9px 12px", borderRadius: 8, border: "0.5px solid #d9d0bc",
    background: "#faf8f3", outline: "none", fontFamily: "inherit",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };
  const onFocus = (e: any) => { e.target.style.borderColor = "#b18d2b"; e.target.style.boxShadow = "0 0 0 3px rgba(177,141,43,0.12)"; };
  const onBlur  = (e: any) => { e.target.style.borderColor = "#d9d0bc"; e.target.style.boxShadow = "none"; };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a08c5b", marginBottom: 6 };

  const fields: [keyof typeof EMPTY_FORM, string, string, boolean][] = [
    ["customer", "Client Name",   "text",   false],
    ["email",    "Email",         "email",  false],
    ["phone",    "Phone",         "text",   false],
    ["date",     "Date",          "date",   false],
    ["time",     "Time",          "time",   false],
    ["duration", "Duration (min)","number", false],
    ["interest", "Interest",      "text",   true],
    ["budget",   "Budget",        "text",   false],
    ["notes",    "Notes",         "textarea", true],
  ];

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden" animate="visible" exit="exit"
      style={{ position: "fixed", inset: 0, background: "rgba(20,15,5,0.55)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden" animate="visible" exit="exit"
        onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 16, border: "0.5px solid #d9d0bc", width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", padding: "28px 28px 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1109", margin: 0 }}>New Appointment</h2>
            <p style={{ fontSize: 10, color: "#a08c5b", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>KANDY Luxury Asset Management</p>
          </div>
          <motion.button onClick={onClose} whileHover={{ rotate: 90, color: "#e11d48" } as any} whileTap={{ scale: 0.88 }} transition={{ duration: 0.2 }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4, display: "flex" }}>
            <X size={18} />
          </motion.button>
        </div>

        {/* Type + Staff + Location selects */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Appointment Type</label>
            <select value={form.type} onChange={set("type")} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, appearance: "none" }}>
              {Object.keys(TYPE_META).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Staff Member</label>
            <select value={form.staff} onChange={set("staff")} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, appearance: "none" }}>
              {["Amara De Silva", "Kavindra Perera", "Thushan Jayawardena"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <select value={form.location} onChange={set("location")} onFocus={onFocus} onBlur={onBlur} style={{ ...inputBase, appearance: "none" }}>
              {["Colombo Showroom", "Private Suite", "Workshop"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Dynamic fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {fields.map(([key, label, type, full], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.25 }}
              style={{ gridColumn: full ? "1 / -1" : "auto" }}
            >
              <label style={labelStyle}>{label}</label>
              {type === "textarea" ? (
                <textarea rows={3} value={form[key]} onChange={set(key)} onFocus={onFocus} onBlur={onBlur}
                  style={{ ...inputBase, resize: "vertical" } as React.CSSProperties} />
              ) : (
                <input type={type} value={form[key]} onChange={set(key)} onFocus={onFocus} onBlur={onBlur} style={inputBase} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <motion.button onClick={onClose} whileHover={{ background: "#f5f3ee" } as any} whileTap={{ scale: 0.96 }}
            style={{ fontSize: 12, fontWeight: 700, padding: "10px 20px", borderRadius: 8, border: "0.5px solid #d9d0bc", background: "#fff", color: "#555", cursor: "pointer" }}>
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSave({ ...form, id: `APT-${Date.now()}`, avatar: form.customer.charAt(0).toUpperCase(), status: "pending", createdAt: "Just now" })}
            style={{ fontSize: 12, fontWeight: 800, padding: "10px 26px", borderRadius: 8, border: "none", background: "#b18d2b", color: "#fff", cursor: "pointer", letterSpacing: "0.04em" }}
          >
            Book Appointment
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [statusFilter, setStatusFilter]   = useState("all");
  const [searchTerm,   setSearchTerm]     = useState("");
  const [selectedDate, setSelectedDate]   = useState<number | null>(null);
  const [selectedApt,  setSelectedApt]    = useState<any>(null);
  const [modalOpen,    setModalOpen]      = useState(false);

  const filtered = appointments.filter(a => {
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchSearch =
      a.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = selectedDate === null || parseInt(a.date.split("-")[2]) === selectedDate;
    return matchStatus && matchSearch && matchDate;
  });

  const handleAction = (id: string, action: string) => {
    if (action === "delete") {
      setAppointments(prev => prev.filter(a => a.id !== id));
      setSelectedApt(null);
    } else {
      const statusMap: Record<string, string> = { confirm: "confirmed", cancel: "cancelled", complete: "completed" };
      if (statusMap[action]) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: statusMap[action] } : a));
        setSelectedApt((prev: any) => prev ? { ...prev, status: statusMap[action] } : null);
      }
    }
  };

  const handleSave = (form: any) => {
    setAppointments(prev => [form, ...prev]);
    setModalOpen(false);
  };

  const confirmedCount = appointments.filter(a => a.status === "confirmed").length;
  const pendingCount   = appointments.filter(a => a.status === "pending").length;
  const todayCount     = appointments.filter(a => a.date === "2024-07-08").length;

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
            Appointments
          </h1>
          <p style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#b18d2b",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0,
          }}>
            KANDY Client Scheduling
          </p>
        </div>
        <motion.button
          whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 20px", background: "#b18d2b", color: "#fff", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 4px 12px rgba(177,141,43,0.2)", flexShrink: 0 }}
        >
          <Plus size={14} /> New Appointment
        </motion.button>
      </motion.div>

      {/* KPI Grid */}
      <motion.div
        variants={containerVariants}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 22 }}
      >
        <KpiCard label="Total"      value={appointments.length} sub="All appointments"      icon={Calendar}    trend="+5 this week" />
        <KpiCard label="Today"      value={todayCount}          sub="Scheduled today"        icon={Clock} />
        <KpiCard label="Confirmed"  value={confirmedCount}      sub="Ready to proceed"       icon={CheckCircle2} />
        <KpiCard label="Pending"    value={pendingCount}        sub="Awaiting confirmation"  icon={AlertCircle} />
      </motion.div>

      {/* Week Strip */}
      <motion.div variants={itemVariants} style={{ marginBottom: 22 }}>
        <WeekStrip
          selectedDate={selectedDate ?? -1}
          onSelect={d => setSelectedDate(prev => prev === d ? null : d)}
          appointments={appointments}
        />
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
                  ? `All (${appointments.length})`
                  : `${s} (${appointments.filter(a => a.status === s).length})`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search + date clear + count */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search by client, type or interest…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={e => { e.target.style.borderColor = "#b18d2b"; }}
              onBlur={e => { e.target.style.borderColor = "#d9d0bc"; }}
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 36, paddingRight: 12, height: 38, fontSize: 16, color: "#1a1109", background: "#fff", border: "0.5px solid #d9d0bc", borderRadius: 9, outline: "none", transition: "border-color 0.15s" }}
            />
          </div>
          {selectedDate !== null && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(null)}
              style={{ display: "flex", alignItems: "center", gap: 5, height: 38, padding: "0 12px", flexShrink: 0, fontSize: 11, fontWeight: 700, border: "0.5px solid #fcd34d", borderRadius: 9, cursor: "pointer", background: "#fffbeb", color: "#92400e" }}
            >
              <X size={11} /> Jul {selectedDate}
            </motion.button>
          )}
          <p style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", flexShrink: 0 }}>
            {filtered.length} of {appointments.length}
          </p>
        </div>
      </motion.div>

      {/* Appointments Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={statusFilter + searchTerm + String(selectedDate)}
            variants={containerVariants}
            initial="hidden" animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 14 }}
          >
            {filtered.map(a => (
              <motion.div key={a.id} variants={cardVariants}>
                <AppointmentCard apt={a} onSelect={setSelectedApt} />
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
              <Calendar size={18} color="#c4b48a" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", margin: 0 }}>No appointments found</p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedApt && (
          <AppointmentDrawer
            apt={selectedApt}
            onClose={() => setSelectedApt(null)}
            onAction={handleAction}
          />
        )}
      </AnimatePresence>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {modalOpen && (
          <NewAppointmentModal
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}