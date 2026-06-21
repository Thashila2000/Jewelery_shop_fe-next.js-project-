"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Bell, Shield, Palette, Globe, CreditCard,
  Store, Mail, Phone, MapPin, Camera, Save,
  Eye, EyeOff, Check, AlertTriangle, ChevronRight,
  Truck, Package, Lock, Key, Smartphone, Monitor,
  ToggleLeft, ToggleRight, Upload, Trash2, Plus,
  RefreshCw, X, LogOut, ChevronDown
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

const panelVariants = {
  hidden:  { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit:    { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type ToggleProps = { value: boolean; onChange: (v: boolean) => void; };

// ─── Shared Styles ────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  fontSize: 14, color: "#1a1109",
  padding: "10px 13px", borderRadius: 9,
  border: "0.5px solid #d9d0bc", background: "#faf8f3",
  outline: "none", fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
};
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#b18d2b";
  e.target.style.boxShadow = "0 0 0 3px rgba(177,141,43,0.12)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#d9d0bc";
  e.target.style.boxShadow = "none";
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700,
  textTransform: "uppercase", letterSpacing: "0.1em",
  color: "#a08c5b", marginBottom: 7,
};
const sectionTitle: React.CSSProperties = {
  fontSize: 13, fontWeight: 800, color: "#1a1109",
  marginTop: 0, marginBottom: 4, marginLeft: 0, marginRight: 0,
  letterSpacing: "-0.01em",
};
const sectionSub: React.CSSProperties = {
  fontSize: 11, color: "#a08c5b",
  marginTop: 0, marginBottom: 20, marginLeft: 0, marginRight: 0,
  fontWeight: 500,
};
const divider: React.CSSProperties = {
  height: "0.5px", background: "#ede8db", margin: "24px 0",
};
const cardStyle: React.CSSProperties = {
  background: "#fff", border: "0.5px solid #e8e3d8",
  borderRadius: 14, padding: "22px 22px 20px",
};

// ─── Toggle Switch ─────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: ToggleProps) {
  return (
    <motion.div
      onClick={() => onChange(!value)}
      whileTap={{ scale: 0.93 }}
      style={{
        width: 42, height: 24, borderRadius: 12,
        background: value ? "#b18d2b" : "#e8e3d8",
        cursor: "pointer", position: "relative",
        flexShrink: 0, transition: "background 0.25s",
      }}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          position: "absolute", top: 3,
          width: 18, height: 18, borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      />
    </motion.div>
  );
}

// ─── Save Button ───────────────────────────────────────────────────────────────
function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ background: saved ? "#166534" : "#9a7a24", boxShadow: "0 6px 20px rgba(177,141,43,0.25)" } as any}
      whileTap={{ scale: 0.96 }}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "10px 22px", borderRadius: 9, border: "none",
        background: saved ? "#166534" : "#b18d2b",
        color: "#fff", fontSize: 12, fontWeight: 800,
        letterSpacing: "0.05em", textTransform: "uppercase",
        cursor: "pointer", transition: "background 0.3s",
      }}
    >
      {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Changes</>}
    </motion.button>
  );
}

// ─── Setting Row ──────────────────────────────────────────────────────────────
function SettingRow({ label, sub, value, onChange }: { label: string; sub?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "13px 0", borderBottom: "0.5px solid #f5f3ee" }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{label}</p>
        {sub && <p style={{ fontSize: 11, color: "#bbb", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0, lineHeight: 1.4 }}>{sub}</p>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

// ─── Panels ───────────────────────────────────────────────────────────────────
function ProfilePanel() {
  const [saved, setSaved] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <p style={sectionTitle}>Profile Information</p>
        <p style={sectionSub}>Manage your personal details and account credentials.</p>
      </div>
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#b18d2b,#d4af37)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff" }}>A</div>
            <motion.div whileHover={{ scale: 1.1 }}
              style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: "50%", background: "#b18d2b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid #fff" }}>
              <Camera size={11} color="#fff" />
            </motion.div>
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>Samantha De Silva</p>
            <p style={{ fontSize: 11, color: "#a08c5b", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Store Manager</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {[["First Name", "Samantha", "text"], ["Last Name", "De Silva", "text"], ["Email Address", "samantha@kandyjewellery.com", "email"], ["Phone Number", "+94 77 100 2233", "tel"]].map(([label, val, type]) => (
            <div key={label as string}>
              <label style={labelStyle}>{label as string}</label>
              <input defaultValue={val as string} type={type as string} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Role / Title</label>
            <input defaultValue="Store Manager" onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
          </div>
        </div>
        <div style={divider} />
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Change Password</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>Leave blank to keep your current password.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <SaveButton onClick={save} saved={saved} />
        </div>
      </div>
    </motion.div>
  );
}

function StorePanel() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <p style={sectionTitle}>Store Settings</p>
        <p style={sectionSub}>Configure your storefront details, contact info and branding.</p>
      </div>
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {[
            ["Store Name",    "KANDY Luxury Jewellery",   "text",  true],
            ["Tagline",       "Crafted for Eternity",     "text",  true],
            ["Contact Email", "hello@kandyjewellery.com", "email", false],
            ["Contact Phone", "+94 81 234 5678",          "tel",   false],
          ].map(([label, val, type, full]) => (
            <div key={label as string} style={{ gridColumn: full ? "1 / -1" : "auto" }}>
              <label style={labelStyle}>{label as string}</label>
              <input defaultValue={val as string} type={type as string} onFocus={onFocus} onBlur={onBlur} style={inputStyle} />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Address</label>
            <textarea rows={2} defaultValue="N0 123, main road, Kandy, Sri Lanka" onFocus={onFocus} onBlur={onBlur}
              style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties} />
          </div>
          <div>
            <label style={labelStyle}>Currency</label>
            <select defaultValue="USD" onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, appearance: "none" }}>
              {["USD — US Dollar", "LKR — Sri Lankan Rupee", "GBP — British Pound", "EUR — Euro", "AED — UAE Dirham"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Timezone</label>
            <select onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, appearance: "none" }}>
              {["Asia/Colombo (UTC+5:30)", "Europe/London (UTC+0)", "America/New_York (UTC-5)", "Asia/Dubai (UTC+4)"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div style={divider} />
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Logo & Branding</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>Upload your store logo and favicon.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
          {["Store Logo", "Favicon"].map(label => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <motion.div whileHover={{ borderColor: "#b18d2b", background: "#faf8f3" } as any}
                style={{ height: 80, border: "0.5px dashed #d9d0bc", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", transition: "all 0.2s", background: "#fff" }}>
                <Upload size={16} color="#b18d2b" />
                <span style={{ fontSize: 11, color: "#a08c5b", fontWeight: 600 }}>Click to upload</span>
              </motion.div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <SaveButton onClick={save} saved={saved} />
        </div>
      </div>
    </motion.div>
  );
}

function NotificationsPanel() {
  const [notifs, setNotifs] = useState({
    newOrder: true, orderShipped: true, lowStock: true,
    newInquiry: true, newReview: false, newAppointment: true,
    dailyReport: false, weeklyReport: true, smsAlerts: false, pushAlerts: true,
  });
  const [saved, setSaved] = useState(false);
  const toggle = (k: keyof typeof notifs) => setNotifs(p => ({ ...p, [k]: !p[k] }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const groups = [
    { title: "Orders", sub: "Alerts related to customer orders.", rows: [["newOrder", "New order placed", "Notify when a new order is received"], ["orderShipped", "Order dispatched", "Notify when an order is marked as shipped"]] },
    { title: "Inventory", sub: "Stock and product alerts.", rows: [["lowStock", "Low stock warning", "Alert when any product falls below 3 units"]] },
    { title: "Client Activity", sub: "Incoming communications and bookings.", rows: [["newInquiry", "New inquiry received", "Notify when a client submits an inquiry"], ["newReview", "New review submitted", "Notify on all new product reviews"], ["newAppointment", "Appointment booked", "Notify when a new appointment is scheduled"]] },
    { title: "Reports", sub: "Scheduled performance summaries.", rows: [["dailyReport", "Daily sales summary", "Receive a daily revenue and order digest"], ["weeklyReport", "Weekly analytics report", "Receive a full weekly performance report"]] },
    { title: "Delivery Channels", sub: "How you receive notifications.", rows: [["smsAlerts", "SMS notifications", "Receive critical alerts via SMS"], ["pushAlerts", "Push notifications", "Browser and mobile push notifications"]] },
  ];

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div><p style={sectionTitle}>Notification Preferences</p><p style={sectionSub}>Choose what you're notified about and how.</p></div>
      {groups.map((g, gi) => (
        <div key={gi} style={cardStyle}>
          <p style={{ ...sectionTitle, marginBottom: 2 }}>{g.title}</p>
          <p style={{ ...sectionSub, marginBottom: 0 }}>{g.sub}</p>
          {g.rows.map(([key, label, sub]) => (
            <SettingRow key={key} label={label} sub={sub} value={notifs[key as keyof typeof notifs]} onChange={() => toggle(key as keyof typeof notifs)} />
          ))}
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton onClick={save} saved={saved} />
      </div>
    </motion.div>
  );
}

function SecurityPanel() {
  const [twoFA, setTwoFA] = useState(true);
  const sessions = [
    { device: "MacBook Pro",   location: "Colombo, LK", time: "Active now",    current: true  },
    { device: "iPhone 15",     location: "Colombo, LK", time: "2 hours ago",   current: false },
    { device: "Chrome — Win",  location: "Kandy, LK",   time: "Yesterday 4pm", current: false },
  ];

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div><p style={sectionTitle}>Security</p><p style={sectionSub}>Manage two-factor authentication, active sessions and account access.</p></div>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <p style={{ ...sectionTitle, marginBottom: 4 }}>Two-Factor Authentication</p>
            <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>Add an extra layer of security. A verification code will be required at each login.</p>
          </div>
          <Toggle value={twoFA} onChange={setTwoFA} />
        </div>
        {twoFA && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 16, padding: "12px 14px", background: "#f0fdf4", border: "0.5px solid #bbf7d0", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <Check size={14} color="#166534" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#166534" }}>2FA is enabled via authenticator app</span>
          </motion.div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <motion.button whileHover={{ background: "#f5f3ee" } as any} whileTap={{ scale: 0.96 }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "0.5px solid #d9d0bc", background: "#fff", fontSize: 12, fontWeight: 700, color: "#555", cursor: "pointer" }}>
            <Key size={13} /> Setup Authenticator
          </motion.button>
          <motion.button whileHover={{ background: "#f5f3ee" } as any} whileTap={{ scale: 0.96 }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "0.5px solid #d9d0bc", background: "#fff", fontSize: 12, fontWeight: 700, color: "#555", cursor: "pointer" }}>
            <Smartphone size={13} /> View Backup Codes
          </motion.button>
        </div>
      </div>
      <div style={cardStyle}>
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Active Sessions</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>Devices currently signed in to your account.</p>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < sessions.length - 1 ? "0.5px solid #f5f3ee" : "none", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "#faf8f3", border: "0.5px solid #ede8db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Monitor size={15} color="#a08c5b" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
                  {s.device}
                  {s.current && <span style={{ marginLeft: 8, fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: "#f0fdf4", color: "#166534", border: "0.5px solid #bbf7d0" }}>CURRENT</span>}
                </p>
                <p style={{ fontSize: 11, color: "#bbb", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{s.location} · {s.time}</p>
              </div>
            </div>
            {!s.current && (
              <motion.button whileHover={{ color: "#e11d48" } as any} whileTap={{ scale: 0.94 }}
                style={{ fontSize: 11, fontWeight: 700, color: "#bbb", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <LogOut size={12} /> Revoke
              </motion.button>
            )}
          </div>
        ))}
        <motion.button whileHover={{ background: "#fff1f2" } as any} whileTap={{ scale: 0.96 }}
          style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "0.5px solid #fda4af", background: "#fff", fontSize: 12, fontWeight: 700, color: "#9f1239", cursor: "pointer" }}>
          <LogOut size={13} /> Sign Out All Other Sessions
        </motion.button>
      </div>
      <div style={{ ...cardStyle, border: "0.5px solid #fda4af", background: "#fff9f9" }}>
        <p style={{ ...sectionTitle, color: "#9f1239", marginBottom: 4 }}>Danger Zone</p>
        <p style={{ fontSize: 12, color: "#b45309", lineHeight: 1.5, marginTop: 0, marginBottom: 16, marginLeft: 0, marginRight: 0 }}>These actions are irreversible. Please proceed with caution.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <motion.button whileHover={{ background: "#fff1f2" } as any} whileTap={{ scale: 0.96 }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "0.5px solid #fda4af", background: "#fff", fontSize: 12, fontWeight: 700, color: "#9f1239", cursor: "pointer" }}>
            <RefreshCw size={13} /> Reset All Settings
          </motion.button>
          <motion.button whileHover={{ background: "#fff1f2" } as any} whileTap={{ scale: 0.96 }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "0.5px solid #fda4af", background: "#fff", fontSize: 12, fontWeight: 700, color: "#9f1239", cursor: "pointer" }}>
            <Trash2 size={13} /> Delete Account
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ShippingPanel() {
  const zones = [
    { name: "Colombo Metro",        rate: "$0",  time: "Same Day",  active: true  },
    { name: "Sri Lanka — Domestic", rate: "$8",  time: "2–3 Days", active: true  },
    { name: "South Asia",           rate: "$18", time: "5–7 Days", active: true  },
    { name: "International",        rate: "$35", time: "7–14 Days", active: false },
  ];
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div><p style={sectionTitle}>Shipping & Delivery</p><p style={sectionSub}>Configure delivery zones, rates and packaging options.</p></div>
      <div style={cardStyle}>
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Delivery Zones</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>Set rates for each region you ship to.</p>
        {zones.map((z, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < zones.length - 1 ? "0.5px solid #f5f3ee" : "none", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 120 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{z.name}</p>
              <p style={{ fontSize: 11, color: "#bbb", marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>{z.time} · {z.rate}</p>
            </div>
            <div style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 5, background: z.active ? "#f0fdf4" : "#f5f3ee", color: z.active ? "#166534" : "#bbb", border: `0.5px solid ${z.active ? "#bbf7d0" : "#e8e3d8"}`, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {z.active ? "Active" : "Inactive"}
            </div>
            <motion.button whileHover={{ background: "#faf8f3" } as any} whileTap={{ scale: 0.94 }}
              style={{ width: 30, height: 30, borderRadius: 8, background: "#f5f3ee", border: "0.5px solid #ede8db", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Check size={13} color="#a08c5b" />
            </motion.button>
          </div>
        ))}
        <motion.button whileHover={{ background: "#faf8f3", borderColor: "#b18d2b" } as any} whileTap={{ scale: 0.96 }}
          style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "0.5px dashed #d9d0bc", background: "#fff", fontSize: 12, fontWeight: 700, color: "#a08c5b", cursor: "pointer", width: "100%", justifyContent: "center" }}>
          <Plus size={14} /> Add Delivery Zone
        </motion.button>
      </div>
      <div style={cardStyle}>
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Packaging</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>Configure default packaging and gift options.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          <div>
            <label style={labelStyle}>Default Box Size</label>
            <select onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, appearance: "none" }}>
              {["Small Jewellery Box", "Medium Gift Box", "Large Presentation Box"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Courier Partner</label>
            <select onFocus={onFocus} onBlur={onBlur} style={{ ...inputStyle, appearance: "none" }}>
              {["DHL Express", "FedEx International", "Sri Lanka Post", "PickMe Flash"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Default Delivery Message</label>
            <textarea rows={2} defaultValue="Your KANDY piece has been carefully packed and is on its way to you." onFocus={onFocus} onBlur={onBlur}
              style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <SaveButton onClick={save} saved={saved} />
        </div>
      </div>
    </motion.div>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [accent, setAccent] = useState("#b18d2b");
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const accents = ["#b18d2b", "#d4af37", "#8a6d1f", "#6366f1", "#0ea5e9", "#10b981", "#f43f5e"];

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="visible" exit="exit" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div><p style={sectionTitle}>Appearance</p><p style={sectionSub}>Customise the look and feel of your admin dashboard.</p></div>
      <div style={cardStyle}>
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Theme</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>Choose a colour mode for the admin interface.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {(["light", "dark", "system"] as const).map(t => (
            <motion.div key={t} whileTap={{ scale: 0.96 }} onClick={() => setTheme(t)}
              style={{ border: `${theme === t ? "1.5px" : "0.5px"} solid ${theme === t ? "#b18d2b" : "#e8e3d8"}`, borderRadius: 10, padding: "14px 12px", cursor: "pointer", background: theme === t ? "rgba(177,141,43,0.05)" : "#faf8f3", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
              <div style={{ width: 40, height: 28, borderRadius: 6, background: t === "dark" ? "#1a1109" : t === "system" ? "linear-gradient(135deg,#fff 50%,#1a1109 50%)" : "#fff", border: "0.5px solid #e8e3d8" }} />
              <span style={{ fontSize: 11, fontWeight: theme === t ? 800 : 600, color: theme === t ? "#b18d2b" : "#666", textTransform: "capitalize" }}>{t}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={cardStyle}>
        <p style={{ ...sectionTitle, marginBottom: 4 }}>Accent Colour</p>
        <p style={{ ...sectionSub, marginBottom: 16 }}>The primary brand colour used across the interface.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {accents.map(c => (
            <motion.div key={c} whileTap={{ scale: 0.9 }} onClick={() => setAccent(c)}
              style={{ width: 36, height: 36, borderRadius: "50%", background: c, cursor: "pointer", border: accent === c ? `2.5px solid #1a1109` : "2.5px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: accent === c ? `0 0 0 3px ${c}44` : "none", transition: "all 0.15s" }}>
              {accent === c && <Check size={14} color="#fff" />}
            </motion.div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <SaveButton onClick={save} saved={saved} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "profile",       label: "Profile",       icon: User   },
  { id: "store",         label: "Store",         icon: Store  },
  { id: "notifications", label: "Notifications", icon: Bell,  badge: 3 },
  { id: "security",      label: "Security",      icon: Shield },
  { id: "shipping",      label: "Shipping",      icon: Truck  },
  { id: "appearance",    label: "Appearance",    icon: Palette },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeNav = NAV_ITEMS.find(n => n.id === active);

  const renderPanel = () => {
    switch (active) {
      case "profile":       return <ProfilePanel key="profile" />;
      case "store":         return <StorePanel key="store" />;
      case "notifications": return <NotificationsPanel key="notifications" />;
      case "security":      return <SecurityPanel key="security" />;
      case "shipping":      return <ShippingPanel key="shipping" />;
      case "appearance":    return <AppearancePanel key="appearance" />;
      default:              return null;
    }
  };

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      style={{ minHeight: "100vh", background: "#f5f3ee", padding: "24px 16px 64px", boxSizing: "border-box", width: "100%" }}
    >
      <style>{`
        .settings-layout {
          display: grid;
          grid-template-columns: clamp(180px, 22%, 240px) 1fr;
          gap: 18px;
          align-items: start;
        }
        .settings-sidebar { display: block; }
        .settings-mobile-nav { display: none; }

        @media (max-width: 700px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }
          .settings-sidebar { display: none; }
          .settings-mobile-nav { display: block; }
        }
      `}</style>

      {/* Header */}
      <motion.div variants={itemVariants} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, gap: 12, flexWrap: "wrap" }}>
        <div style={{ transform: "translateY(-10px)" }}>
          <h1 style={{ fontSize: 31, fontWeight: 750, color: "#1a1109", marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "sans-serif" }}>
            Settings
          </h1>
          <p style={{ fontSize: 12, fontWeight: 800, color: "#b18d2b", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6, marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
            KANDY Admin Configuration
          </p>
        </div>
      </motion.div>

      {/* Mobile nav — dropdown (visible only on small screens) */}
      <motion.div variants={itemVariants} className="settings-mobile-nav" style={{ marginBottom: 16 }}>
        <motion.button
          onClick={() => setMobileNavOpen(o => !o)}
          whileTap={{ scale: 0.97 }}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 12, cursor: "pointer" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {activeNav && <activeNav.icon size={16} color="#b18d2b" />}
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1109" }}>{activeNav?.label}</span>
          </div>
          <ChevronDown size={16} color="#a08c5b" style={{ transform: mobileNavOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
        </motion.button>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.18 }}
              style={{ background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 12, marginTop: 6, padding: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}
            >
              {NAV_ITEMS.map(n => (
                <motion.button
                  key={n.id}
                  onClick={() => { setActive(n.id); setMobileNavOpen(false); }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer", background: active === n.id ? "rgba(177,141,43,0.1)" : "transparent", marginBottom: 2, textAlign: "left" }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: active === n.id ? "rgba(177,141,43,0.15)" : "#f5f3ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <n.icon size={14} color={active === n.id ? "#b18d2b" : "#a08c5b"} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: active === n.id ? 700 : 500, color: active === n.id ? "#1a1109" : "#666", flex: 1 }}>{n.label}</span>
                  {(n as any).badge > 0 && (
                    <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 10, background: "#fff1f2", color: "#9f1239", border: "0.5px solid #fda4af" }}>{(n as any).badge}</span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Layout */}
      <motion.div variants={itemVariants} className="settings-layout">

        {/* Sidebar — visible only on wide screens */}
        <div className="settings-sidebar" style={{ background: "#fff", border: "0.5px solid #e8e3d8", borderRadius: 14, padding: "10px", position: "sticky", top: 24 }}>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.18em", marginTop: 6, marginBottom: 10, marginLeft: 6, marginRight: 6, display: "block" }}>
            Configuration
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {NAV_ITEMS.map(n => (
              <motion.button
                key={n.id}
                onClick={() => setActive(n.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, border: "none", cursor: "pointer", background: active === n.id ? "rgba(177,141,43,0.1)" : "transparent", textAlign: "left", transition: "background 0.15s" }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: active === n.id ? "rgba(177,141,43,0.15)" : "#f5f3ee", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>
                  <n.icon size={15} color={active === n.id ? "#b18d2b" : "#a08c5b"} />
                </div>
                <span style={{ fontSize: 13, fontWeight: active === n.id ? 700 : 500, color: active === n.id ? "#1a1109" : "#666", flex: 1 }}>{n.label}</span>
                {(n as any).badge > 0 && (
                  <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 10, background: "#fff1f2", color: "#9f1239", border: "0.5px solid #fda4af" }}>{(n as any).badge}</span>
                )}
                <ChevronRight size={13} color={active === n.id ? "#b18d2b" : "#ccc"} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div style={{ minWidth: 0 }}>
          <AnimatePresence mode="wait">
            {renderPanel()}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
