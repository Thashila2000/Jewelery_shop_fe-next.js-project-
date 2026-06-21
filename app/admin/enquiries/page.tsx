"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Search, Mail, Phone, Clock,
  CheckCircle2, XCircle, AlertCircle, Gem,
  X, Trash2, Plus, TrendingUp, Send,
  User, Tag, ArrowUpRight, Inbox, RefreshCw,
  ChevronDown, Star, Calendar
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Reply {
  author: string;
  time: string;
  text: string;
}

interface Inquiry {
  id: string;
  customer: string;
  avatar: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  priority: string;
  product: string | null;
  date: string;
  dateRaw: string;
  replies: Reply[];
  assignee: string | null;
}

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
const INQUIRIES: Inquiry[] = [
  {
    id: "INQ-001", customer: "Sophia Loren", avatar: "S",
    email: "sophia@example.com", phone: "+94 77 123 4567",
    subject: "Custom engagement ring — pear cut sapphire",
    message: "Hello, I'm looking to commission a bespoke engagement ring with a pear-cut Ceylon sapphire, approximately 2.5ct, surrounded by a pavé diamond halo. I would prefer an 18K white gold setting. Could you advise on pricing and availability? I'd ideally like to have it ready within 6 weeks.",
    category: "Bespoke", status: "open", priority: "high",
    product: null, date: "Today, 10:14am", dateRaw: "2024-07-05",
    replies: [],
    assignee: "Amara De Silva",
  },
  {
    id: "INQ-002", customer: "Alexander Reed", avatar: "A",
    email: "alex.reed@example.com", phone: "+94 71 987 6543",
    subject: "Order status — ORD-2846",
    message: "Hi, I placed an order for the Eternal Solitaire Band last week. Could you confirm the current status and expected delivery date? The order reference is ORD-2846. Thank you.",
    category: "Order Status", status: "resolved", priority: "medium",
    product: "Eternal Solitaire Band", date: "Today, 09:30am", dateRaw: "2024-07-05",
    replies: [
      { author: "Kavindra Perera", time: "Today, 09:45am", text: "Good morning Alexander! Your order ORD-2846 is currently with our finishing team and will be dispatched by 3pm today. You will receive a tracking number via email shortly." },
    ],
    assignee: "Kavindra Perera",
  },
  {
    id: "INQ-003", customer: "Isabella Vanthorpe", avatar: "I",
    email: "iv@example.com", phone: "+94 76 555 7890",
    subject: "Bridal jewellery set — full suite enquiry",
    message: "I am getting married in October and am interested in a complete bridal suite — necklace, earrings and bracelet. My budget is approximately $25,000–$35,000. I would prefer diamonds and platinum throughout. Could we arrange a private consultation?",
    category: "Bespoke", status: "open", priority: "high",
    product: null, date: "Yesterday, 6:45pm", dateRaw: "2024-07-04",
    replies: [],
    assignee: null,
  },
  {
    id: "INQ-004", customer: "Julian Thorne", avatar: "J",
    email: "j.thorne@example.com", phone: "+94 70 222 3344",
    subject: "Repair enquiry — tennis bracelet clasp",
    message: "My Tennis Bracelet Classic (purchased last year, ref BRC-001) has developed a loose clasp. I would like to bring it in for repair. How long does this typically take and what is the cost? Is a warranty applicable?",
    category: "Repair", status: "in-progress", priority: "medium",
    product: "Tennis Bracelet Classic", date: "Yesterday, 3:00pm", dateRaw: "2024-07-04",
    replies: [
      { author: "Thilina Jayawardena", time: "Yesterday, 4:10pm", text: "Hello Julian, thank you for reaching out. Clasp repairs on the Tennis Bracelet Classic are covered under our 2-year warranty. Please bring the piece to our Colombo showroom at your convenience — turnaround is typically 3–5 business days." },
    ],
    assignee: "Thilina Jayawardena",
  },
  {
    id: "INQ-005", customer: "Priya Nair", avatar: "P",
    email: "priya@example.com", phone: "+94 77 444 5566",
    subject: "Pearl Pendant Drop — lustre concern",
    message: "I received my Pearl Pendant Drop last week and while it is beautiful, the lustre seems slightly less than what was shown in the product photos. Is this normal variation or could there be an issue with the piece? I'd appreciate your thoughts before I decide whether to keep it.",
    category: "Product Query", status: "open", priority: "low",
    product: "Pearl Pendant Drop", date: "Jul 3, 5:20pm", dateRaw: "2024-07-03",
    replies: [],
    assignee: null,
  },
  {
    id: "INQ-006", customer: "Marco Ferretti", avatar: "M",
    email: "marco@example.com", phone: "+94 71 333 2211",
    subject: "Corporate gifting — 10 personalised pieces",
    message: "We are a luxury hospitality group looking to source 10 bespoke gift pieces for VIP clients — ideally gold bangles or pendants with company monogram engraving and branded packaging. Budget is $30,000–$40,000. Who should I speak with to move forward?",
    category: "Corporate", status: "open", priority: "high",
    product: null, date: "Jul 3, 11:30am", dateRaw: "2024-07-03",
    replies: [],
    assignee: "Amara De Silva",
  },
  {
    id: "INQ-007", customer: "Amelia Torres", avatar: "A",
    email: "amelia@example.com", phone: "+94 76 888 1122",
    subject: "Ring size exchange — Pavé Diamond Band",
    message: "I ordered the Pavé Diamond Band in size L but it fits slightly loose. I'd like to exchange for size K. Is this possible and what is the process? The order was placed 10 days ago.",
    category: "Exchange", status: "resolved", priority: "low",
    product: "Pavé Diamond Band", date: "Jul 2, 2:00pm", dateRaw: "2024-07-02",
    replies: [
      { author: "Kavindra Perera", time: "Jul 2, 3:30pm", text: "Hello Amelia! Absolutely — size exchanges are no problem within 30 days of purchase. Please bring or courier the ring to us and we will resize or exchange at no charge. Expect 5–7 days turnaround." },
    ],
    assignee: "Kavindra Perera",
  },
  {
    id: "INQ-008", customer: "David Chen", avatar: "D",
    email: "david@example.com", phone: "+94 70 999 0011",
    subject: "Complaint — delayed delivery ORD-2843",
    message: "My order ORD-2843 was promised within 5 business days but took 12 days to arrive with no proactive communication. I had to chase your team multiple times. While the product itself is lovely, the service experience was disappointing and not befitting a luxury brand.",
    category: "Complaint", status: "in-progress", priority: "high",
    product: "Diamond Stud Pair", date: "Jul 2, 9:15am", dateRaw: "2024-07-02",
    replies: [
      { author: "Amara De Silva", time: "Jul 2, 11:00am", text: "Dear David, please accept our sincere apologies for the delay and lack of communication on order ORD-2843. This falls well short of our standards. I am personally reviewing what went wrong and will follow up with a full explanation and goodwill gesture by end of day." },
    ],
    assignee: "Amara De Silva",
  },
];

const CATEGORY_META: Record<string, { color: string; bg: string; border: string }> = {
  "Bespoke":       { color: "#5b21b6", bg: "#f5f3ff", border: "#ddd6fe" },
  "Order Status":  { color: "#1e40af", bg: "#eff6ff", border: "#bfdbfe" },
  "Repair":        { color: "#92400e", bg: "#fffbeb", border: "#fcd34d" },
  "Product Query": { color: "#065f46", bg: "#ecfdf5", border: "#6ee7b7" },
  "Corporate":     { color: "#9f1239", bg: "#fff1f2", border: "#fda4af" },
  "Exchange":      { color: "#0e7490", bg: "#ecfeff", border: "#a5f3fc" },
  "Complaint":     { color: "#b45309", bg: "#fff7ed", border: "#fed7aa" },
};

const PRIORITY_META: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  high:   { color: "#be123c", bg: "#fff1f2", border: "#fecdd3", dot: "#e11d48" },
  medium: { color: "#b45309", bg: "#fffbeb", border: "#fde68a", dot: "#d97706" },
  low:    { color: "#166534", bg: "#f0fdf4", border: "#bbf7d0", dot: "#16a34a" },
};

const STATUS_META: Record<string, { bg: string; color: string; border: string; icon: React.ComponentType<{ size?: number; color?: string }>; label: string }> = {
  "open":        { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe", icon: Inbox,        label: "Open"        },
  "in-progress": { bg: "#fffbeb", color: "#92400e", border: "#fcd34d", icon: RefreshCw,    label: "In Progress" },
  "resolved":    { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", icon: CheckCircle2, label: "Resolved"    },
  "closed":      { bg: "#f5f3ee", color: "#888",    border: "#e8e3d8", icon: XCircle,      label: "Closed"      },
};

const ALL_STATUSES = ["all", "open", "in-progress", "resolved"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const s = STATUS_META[status] ?? STATUS_META["open"];
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

function CategoryBadge({ category }: { category: string }) {
  const c = CATEGORY_META[category] ?? { color: "#a08c5b", bg: "#faf8f3", border: "#ede8db" };
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 4,
      background: c.bg, color: c.color, border: `0.5px solid ${c.border}`,
      textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap",
    }}>
      {category}
    </span>
  );
}

function PriorityDot({ priority }: { priority: string }) {
  const p = PRIORITY_META[priority] ?? PRIORITY_META.low;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.dot, flexShrink: 0 }} />
      <span style={{ fontSize: 9, fontWeight: 800, color: p.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{priority}</span>
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon: Icon, trend }: {
  label: string; value: number | string; sub: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  trend?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(177,141,43,0.13)" }}
      style={{
        background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14,
        padding: "18px 18px 14px", position: "relative", overflow: "hidden",
      }}
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
      {trend && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 8, fontSize: 9, fontWeight: 700, color: "#166534", background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 5, padding: "2px 6px" }}>
          <TrendingUp size={9} color="#166534" /> {trend}
        </div>
      )}
    </motion.div>
  );
}

// ─── Inquiry Card ─────────────────────────────────────────────────────────────
function InquiryCard({ inq, onSelect }: { inq: Inquiry; onSelect: (i: Inquiry) => void }) {
  const truncated = inq.message.length > 140 ? inq.message.slice(0, 140) + "…" : inq.message;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(177,141,43,0.1)" }}
      onClick={() => onSelect(inq)}
      style={{
        background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14,
        padding: "16px 16px 14px", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 11,
        position: "relative", overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {/* priority stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: inq.priority === "high"
          ? "linear-gradient(to right, #e11d48, #fda4af)"
          : inq.priority === "medium"
          ? "linear-gradient(to right, #d97706, #fde68a)"
          : "transparent",
      }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, #b18d2b, #d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>
            {inq.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inq.customer}</p>
            <p style={{ fontSize: 9, color: "#bbb", marginTop: 1, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{inq.date}</p>
          </div>
        </div>
        <StatusBadge status={inq.status} />
      </div>

      {/* Subject */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 6, marginLeft: 0, marginRight: 0, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {inq.subject}
        </p>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{truncated}</p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <CategoryBadge category={inq.category} />
        <PriorityDot priority={inq.priority} />
        {inq.product && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Gem size={9} color="#b18d2b" />
            <span style={{ fontSize: 9, color: "#a08c5b", fontWeight: 600 }}>{inq.product}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "0.5px solid #f0ece6", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {inq.assignee ? (
            <>
              <User size={10} color="#b18d2b" />
              <span style={{ fontSize: 10, color: "#a08c5b", fontWeight: 600 }}>{inq.assignee}</span>
            </>
          ) : (
            <span style={{ fontSize: 10, color: "#ccc", fontWeight: 600 }}>Unassigned</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {inq.replies.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MessageSquare size={10} color="#b18d2b" />
              <span style={{ fontSize: 10, color: "#a08c5b", fontWeight: 600 }}>{inq.replies.length}</span>
            </div>
          )}
          <motion.div whileHover={{ x: 3 }} style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#b18d2b", textTransform: "uppercase", letterSpacing: "0.08em" }}>View</span>
            <ArrowUpRight size={10} color="#b18d2b" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Inquiry Drawer ────────────────────────────────────────────────────────────
function InquiryDrawer({ inq, onClose, onAction }: {
  inq: Inquiry;
  onClose: () => void;
  onAction: (id: string, action: string, payload?: string) => void;
}) {
  const [reply, setReply] = useState("");

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
          width: "min(520px, 100vw)",
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
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 0, marginBottom: 4, marginLeft: 0, marginRight: 0 }}>Inquiry Thread</p>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.02em" }}>{inq.id}</h2>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <StatusBadge status={inq.status} />
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

          {/* Client info */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "14px 16px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 10, marginLeft: 0, marginRight: 0 }}>Client</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#b18d2b,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {inq.avatar}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{inq.customer}</p>
            </div>
            {([
              [Mail,  inq.email],
              [Phone, inq.phone],
            ] as [React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>, string][]).map(([Icon, val], i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: i === 0 ? 6 : 0 }}>
                <Icon size={12} color="#b18d2b" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#555" }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Subject + meta */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              <CategoryBadge category={inq.category} />
              <PriorityDot priority={inq.priority} />
              {inq.product && (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Gem size={10} color="#b18d2b" />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b" }}>{inq.product}</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#1a1109", marginTop: 0, marginBottom: 4, marginLeft: 0, marginRight: 0, lineHeight: 1.3 }}>{inq.subject}</p>
            <p style={{ fontSize: 10, color: "#bbb", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{inq.date}</p>
          </div>

          {/* Original message */}
          <div style={{ background: "#faf8f3", borderRadius: 12, border: "0.5px solid #ede8db", padding: "14px 16px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0 }}>Message</p>
            <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{inq.message}</p>
          </div>

          {/* Replies */}
          {inq.replies.length > 0 && (
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 12, marginLeft: 0, marginRight: 0 }}>Thread ({inq.replies.length})</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {inq.replies.map((r, i) => (
                  <div key={i} style={{ background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#166534" }}>{r.author}</span>
                      <span style={{ fontSize: 10, color: "#bbb" }}>{r.time}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#166534", lineHeight: 1.6, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignee */}
          <div style={{ background: "#faf8f3", borderRadius: 10, border: "0.5px solid #ede8db", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <User size={13} color="#b18d2b" />
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>Assignee</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1109", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{inq.assignee ?? "Unassigned"}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ background: "#ede8db" } as any}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: 10, fontWeight: 700, color: "#a08c5b", background: "#ede8db", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer" }}
            >
              Reassign
            </motion.button>
          </div>

          {/* Reply box */}
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 0, marginBottom: 8, marginLeft: 0, marginRight: 0 }}>Reply</p>
            <textarea
              rows={4}
              value={reply}
              onChange={e => setReply(e.target.value)}
              placeholder="Type your reply on behalf of KANDY…"
              onFocus={e => { e.target.style.borderColor = "#b18d2b"; e.target.style.boxShadow = "0 0 0 3px rgba(177,141,43,0.12)"; }}
              onBlur={e => { e.target.style.borderColor = "#d9d0bc"; e.target.style.boxShadow = "none"; }}
              style={{ width: "100%", boxSizing: "border-box", fontSize: 13, color: "#1a1109", padding: "10px 12px", borderRadius: 10, border: "0.5px solid #d9d0bc", background: "#faf8f3", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6, transition: "border-color 0.15s, box-shadow 0.15s" }}
            />
          </div>
        </div>

        {/* Drawer Actions */}
        <div style={{ padding: "14px 22px 18px", borderTop: "0.5px solid #f0ece6", flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          <motion.button
            whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
            whileTap={{ scale: 0.96 }}
            onClick={() => onAction(inq.id, "reply", reply)}
            style={{ width: "100%", height: 38, borderRadius: 9, border: "none", background: "#b18d2b", fontSize: 12, fontWeight: 800, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, letterSpacing: "0.04em" }}
          >
            <Send size={13} /> Send Reply
          </motion.button>
          <div style={{ display: "flex", gap: 8 }}>
            {inq.status !== "resolved" && (
              <motion.button
                whileHover={{ background: "#f0fdf4" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(inq.id, "resolve")}
                style={{ flex: 1, height: 36, borderRadius: 9, border: "0.5px solid #bbf7d0", background: "#fff", fontSize: 11, fontWeight: 700, color: "#166534", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <CheckCircle2 size={12} color="#166534" /> Resolve
              </motion.button>
            )}
            {inq.status !== "in-progress" && inq.status !== "resolved" && (
              <motion.button
                whileHover={{ background: "#fffbeb" } as any}
                whileTap={{ scale: 0.96 }}
                onClick={() => onAction(inq.id, "progress")}
                style={{ flex: 1, height: 36, borderRadius: 9, border: "0.5px solid #fcd34d", background: "#fff", fontSize: 11, fontWeight: 700, color: "#92400e", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
              >
                <RefreshCw size={12} color="#92400e" /> In Progress
              </motion.button>
            )}
            <motion.button
              whileHover={{ background: "#fff1f2" } as any}
              whileTap={{ scale: 0.96 }}
              onClick={() => onAction(inq.id, "delete")}
              style={{ width: 36, height: 36, borderRadius: 9, border: "0.5px solid #fda4af", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Trash2 size={14} color="#9f1239" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InquiriesPage() {
  const [inquiries, setInquiries]           = useState<Inquiry[]>(INQUIRIES);
  const [statusFilter, setStatusFilter]     = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchText, setSearchText]         = useState("");
  const [selectedInq, setSelectedInq]       = useState<Inquiry | null>(null);
  const [showCatFilter, setShowCatFilter]   = useState(false);

  const filtered = inquiries.filter(i => {
    const matchStatus   = statusFilter   === "all" || i.status   === statusFilter;
    const matchCategory = categoryFilter === "all" || i.category === categoryFilter;
    const matchSearch   =
      i.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      i.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      i.message.toLowerCase().includes(searchText.toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  const handleAction = (id: string, action: string, payload?: string) => {
    if (action === "delete") {
      setInquiries(prev => prev.filter(i => i.id !== id));
      setSelectedInq(null);
    } else if (action === "resolve") {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: "resolved" } : i));
      setSelectedInq(prev => prev ? { ...prev, status: "resolved" } : null);
    } else if (action === "progress") {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: "in-progress" } : i));
      setSelectedInq(prev => prev ? { ...prev, status: "in-progress" } : null);
    } else if (action === "reply" && payload?.trim()) {
      const newReply: Reply = { author: "Amara De Silva", time: "Just now", text: payload };
      setInquiries(prev => prev.map(i =>
        i.id === id ? { ...i, replies: [...i.replies, newReply], status: "in-progress" } : i
      ));
      setSelectedInq(prev => prev ? { ...prev, replies: [...prev.replies, newReply], status: "in-progress" } : null);
    }
  };

  const openCount       = inquiries.filter(i => i.status === "open").length;
  const inProgressCount = inquiries.filter(i => i.status === "in-progress").length;
  const resolvedCount   = inquiries.filter(i => i.status === "resolved").length;
  const highPriCount    = inquiries.filter(i => i.priority === "high").length;

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
          <h1 style={{ fontSize: 31, fontWeight: 750, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "sans-serif" }}>
            Inquiries
          </h1>
          <p style={{ fontSize: 12, fontWeight: 800, color: "#b18d2b", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            KANDY Client Communications
          </p>
        </div>
        <motion.button
          whileHover={{ background: "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.3)" } as any}
          whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 20px", background: "#b18d2b", color: "#fff", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 4px 12px rgba(177,141,43,0.2)", flexShrink: 0 }}
        >
          <Plus size={14} /> New Inquiry
        </motion.button>
      </motion.div>

      {/* KPI Grid */}
      <motion.div
        variants={containerVariants}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 22 }}
      >
        <KpiCard label="Total"         value={inquiries.length} sub="All inquiries"         icon={Inbox}          trend="+8 this week" />
        <KpiCard label="Open"          value={openCount}        sub="Awaiting response"     icon={MessageSquare} />
        <KpiCard label="In Progress"   value={inProgressCount}  sub="Being handled"         icon={RefreshCw} />
        <KpiCard label="Resolved"      value={resolvedCount}    sub="Closed successfully"   icon={CheckCircle2}   trend="+3 today" />
        <KpiCard label="High Priority" value={highPriCount}     sub="Need urgent attention" icon={AlertCircle} />
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
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
                  ? `All (${inquiries.length})`
                  : `${s.replace("-", " ")} (${inquiries.filter(i => i.status === s).length})`}
              </motion.button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search by client, subject or message…"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onFocus={e => { e.target.style.borderColor = "#b18d2b"; }}
              onBlur={e => { e.target.style.borderColor = "#d9d0bc"; }}
              style={{ width: "100%", boxSizing: "border-box", paddingLeft: 36, paddingRight: 12, height: 38, fontSize: 16, color: "#1a1109", background: "#fff", border: "0.5px solid #d9d0bc", borderRadius: 9, outline: "none", transition: "border-color 0.15s" }}
            />
          </div>

          <div style={{ position: "relative", flexShrink: 0 }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCatFilter(f => !f)}
              style={{
                display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 14px",
                fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
                border: "0.5px solid", borderRadius: 9, cursor: "pointer", transition: "all 0.15s",
                background:  categoryFilter !== "all" ? "#fffbeb" : "#fff",
                color:       categoryFilter !== "all" ? "#92400e" : "#7a6a4a",
                borderColor: categoryFilter !== "all" ? "#fcd34d" : "#d9d0bc",
              }}
            >
              <Tag size={12} />
              {categoryFilter === "all" ? "Category" : categoryFilter}
              <ChevronDown size={11} />
            </motion.button>

            <AnimatePresence>
              {showCatFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 50, background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", minWidth: 200, overflow: "hidden" }}
                >
                  {["all", ...Object.keys(CATEGORY_META)].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategoryFilter(cat); setShowCatFilter(false); }}
                      style={{ width: "100%", textAlign: "left", padding: "10px 14px", fontSize: 12, fontWeight: categoryFilter === cat ? 700 : 500, color: categoryFilter === cat ? "#b18d2b" : "#444", background: categoryFilter === cat ? "#faf8f3" : "#fff", border: "none", borderBottom: "0.5px solid #f5f3ee", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {cat !== "all" && <CategoryBadge category={cat} />}
                      {cat === "all" && <span style={{ fontSize: 11, fontWeight: 700, color: "#7a6a4a" }}>All Categories</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", flexShrink: 0 }}>
            {filtered.length} of {inquiries.length}
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={statusFilter + categoryFilter + searchText}
            variants={containerVariants}
            initial="hidden" animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 14 }}
          >
            {filtered.map(i => (
              <motion.div key={i.id} variants={cardVariants}>
                <InquiryCard inq={i} onSelect={setSelectedInq} />
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
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>No inquiries found</p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 4, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {selectedInq && (
          <InquiryDrawer
            inq={selectedInq}
            onClose={() => setSelectedInq(null)}
            onAction={handleAction}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
