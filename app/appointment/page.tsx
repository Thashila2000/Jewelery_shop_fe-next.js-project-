"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronRight, ChevronLeft, Calendar, Clock, User, Gem, MessageSquare, Phone, Mail, MapPin, Star } from "lucide-react";

/* ─── TYPES ─────────────────────────────────────────────────────── */
type FormData = {
  // Step 1 — Service
  serviceType: string;
  occasion: string;
  budget: string;
  // Step 2 — Schedule
  date: string;
  time: string;
  location: string;
  // Step 3 — Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  existingCustomer: string;
  // Step 4 — Details
  message: string;
  referral: string;
  newsletter: boolean;
};

/* ─── DATA ───────────────────────────────────────────────────────── */
const SERVICES = [
  { id: "bespoke",    icon: "✦", label: "Bespoke Commission",  desc: "Design a one-of-a-kind piece from scratch" },
  { id: "engagement", icon: "◇", label: "Engagement Ring",     desc: "Find the perfect ring for your proposal" },
  { id: "repair",     icon: "⟳", label: "Repair & Restore",   desc: "Bring a cherished piece back to life" },
  { id: "resize",     icon: "○", label: "Resizing & Alteration", desc: "Perfect fit adjustments for any piece" },
  { id: "valuation",  icon: "⊞", label: "Valuation & Certification", desc: "Professional appraisal for insurance or sale" },
  { id: "styling",    icon: "◈", label: "Personal Styling",    desc: "Curated selection session with our stylist" },
];

const OCCASIONS = ["Engagement", "Wedding", "Anniversary", "Birthday", "Self-purchase", "Gift", "Other"];

const BUDGETS = [
  { id: "under2k",  label: "Under $2,000" },
  { id: "2k-5k",   label: "$2,000 – $5,000" },
  { id: "5k-10k",  label: "$5,000 – $10,000" },
  { id: "10k-25k", label: "$10,000 – $25,000" },
  { id: "25k+",    label: "$25,000+" },
  { id: "discuss", label: "Prefer to discuss" },
];

const TIMES = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const LOCATIONS = [
 
  { id: "london",  label: "Kandy Showroom",  sub: "N0 123, Main Street, Kandy" },
  { id: "virtual", label: "Virtual Consultation", sub: "Video call — worldwide" },
];

const REFERRALS = ["Social Media", "Google Search", "Friend / Family", "Magazine / Press", "Returning Client", "Other"];

const STEPS = [
  { num: 1, label: "Service",  icon: <Gem size={14} /> },
  { num: 2, label: "Schedule", icon: <Calendar size={14} /> },
  { num: 3, label: "Details",  icon: <User size={14} /> },
  { num: 4, label: "Message",  icon: <MessageSquare size={14} /> },
];

/* ─── HELPERS ────────────────────────────────────────────────────── */
function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

/* ─── STEP COMPONENTS ────────────────────────────────────────────── */
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="ap-step-body">
      <div className="ap-field-group">
        <label className="ap-label">Select Service *</label>
        <div className="ap-service-grid">
          {SERVICES.map(s => (
            <button
              key={s.id}
              type="button"
              className={`ap-service-card ${data.serviceType === s.id ? "ap-service-card-on" : ""}`}
              onClick={() => set("serviceType", s.id)}
            >
              <span className="ap-service-icon">{s.icon}</span>
              <span className="ap-service-label">{s.label}</span>
              <span className="ap-service-desc">{s.desc}</span>
              {data.serviceType === s.id && <span className="ap-service-check"><Check size={12} /></span>}
            </button>
          ))}
        </div>
      </div>

      <div className="ap-row-2">
        <div className="ap-field-group">
          <label className="ap-label">Occasion</label>
          <div className="ap-pill-group">
            {OCCASIONS.map(o => (
              <button
                key={o} type="button"
                className={`ap-pill ${data.occasion === o ? "ap-pill-on" : ""}`}
                onClick={() => set("occasion", o)}
              >{o}</button>
            ))}
          </div>
        </div>

        <div className="ap-field-group">
          <label className="ap-label">Approximate Budget</label>
          <div className="ap-budget-grid">
            {BUDGETS.map(b => (
              <button
                key={b.id} type="button"
                className={`ap-budget-btn ${data.budget === b.id ? "ap-budget-btn-on" : ""}`}
                onClick={() => set("budget", b.id)}
              >{b.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="ap-step-body">
      <div className="ap-field-group">
        <label className="ap-label">Preferred Location *</label>
        <div className="ap-location-grid">
          {LOCATIONS.map(l => (
            <button
              key={l.id} type="button"
              className={`ap-location-card ${data.location === l.id ? "ap-location-card-on" : ""}`}
              onClick={() => set("location", l.id)}
            >
              <div className="ap-location-icon"><MapPin size={16} /></div>
              <div>
                <div className="ap-location-name">{l.label}</div>
                <div className="ap-location-sub">{l.sub}</div>
              </div>
              {data.location === l.id && <Check size={13} className="ap-location-check" />}
            </button>
          ))}
        </div>
      </div>

      <div className="ap-row-2">
        <div className="ap-field-group">
          <label className="ap-label" htmlFor="ap-date">Preferred Date *</label>
          <div className="ap-input-wrap">
            <Calendar size={15} className="ap-input-icon" />
            <input
              id="ap-date" type="date"
              className="ap-input ap-input-icon-pad"
              value={data.date}
              min={getMinDate()}
              onChange={e => set("date", e.target.value)}
            />
          </div>
          <p className="ap-hint">Bookings require at least 48 hours notice</p>
        </div>

        <div className="ap-field-group">
          <label className="ap-label">Preferred Time *</label>
          <div className="ap-time-grid">
            {TIMES.map(t => (
              <button
                key={t} type="button"
                className={`ap-time-btn ${data.time === t ? "ap-time-btn-on" : ""}`}
                onClick={() => set("time", t)}
              >
                <Clock size={11} />{t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  return (
    <div className="ap-step-body">
      <div className="ap-row-2">
        <div className="ap-field-group">
          <label className="ap-label" htmlFor="ap-fname">First Name *</label>
          <div className="ap-input-wrap">
            <User size={15} className="ap-input-icon" />
            <input id="ap-fname" type="text" className="ap-input ap-input-icon-pad" placeholder="e.g. Isabelle"
              value={data.firstName} onChange={e => set("firstName", e.target.value)} />
          </div>
        </div>
        <div className="ap-field-group">
          <label className="ap-label" htmlFor="ap-lname">Last Name *</label>
          <input id="ap-lname" type="text" className="ap-input" placeholder="e.g. Laurent"
            value={data.lastName} onChange={e => set("lastName", e.target.value)} />
        </div>
      </div>

      <div className="ap-row-2">
        <div className="ap-field-group">
          <label className="ap-label" htmlFor="ap-email">Email Address *</label>
          <div className="ap-input-wrap">
            <Mail size={15} className="ap-input-icon" />
            <input id="ap-email" type="email" className="ap-input ap-input-icon-pad" placeholder="you@example.com"
              value={data.email} onChange={e => set("email", e.target.value)} />
          </div>
        </div>
        <div className="ap-field-group">
          <label className="ap-label" htmlFor="ap-phone">Phone Number</label>
          <div className="ap-input-wrap">
            <Phone size={15} className="ap-input-icon" />
            <input id="ap-phone" type="tel" className="ap-input ap-input-icon-pad" placeholder="+1 (555) 000-0000"
              value={data.phone} onChange={e => set("phone", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="ap-field-group">
        <label className="ap-label">Are you an existing client?</label>
        <div className="ap-radio-group">
          {["Yes, returning client", "No, first visit", "Prefer not to say"].map(opt => (
            <label key={opt} className={`ap-radio ${data.existingCustomer === opt ? "ap-radio-on" : ""}`}>
              <input type="radio" name="existing" value={opt}
                checked={data.existingCustomer === opt}
                onChange={() => set("existingCustomer", opt)} />
              <span className="ap-radio-dot" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="ap-field-group">
        <label className="ap-label">How did you hear about us?</label>
        <div className="ap-pill-group">
          {REFERRALS.map(r => (
            <button key={r} type="button"
              className={`ap-pill ${data.referral === r ? "ap-pill-on" : ""}`}
              onClick={() => set("referral", r)}>{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data, set }: { data: FormData; set: (k: keyof FormData, v: any) => void }) {
  const service = SERVICES.find(s => s.id === data.serviceType);
  const location = LOCATIONS.find(l => l.id === data.location);
  const budget = BUDGETS.find(b => b.id === data.budget);

  return (
    <div className="ap-step-body">
      {/* Summary card */}
      <div className="ap-summary">
        <p className="ap-summary-title">Appointment Summary</p>
        <div className="ap-summary-grid">
          {service   && <div className="ap-summary-item"><span className="ap-summary-key">Service</span><span className="ap-summary-val">{service.label}</span></div>}
          {data.occasion && <div className="ap-summary-item"><span className="ap-summary-key">Occasion</span><span className="ap-summary-val">{data.occasion}</span></div>}
          {budget    && <div className="ap-summary-item"><span className="ap-summary-key">Budget</span><span className="ap-summary-val">{budget.label}</span></div>}
          {location  && <div className="ap-summary-item"><span className="ap-summary-key">Location</span><span className="ap-summary-val">{location.label}</span></div>}
          {data.date && <div className="ap-summary-item"><span className="ap-summary-key">Date</span><span className="ap-summary-val">{new Date(data.date).toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</span></div>}
          {data.time && <div className="ap-summary-item"><span className="ap-summary-key">Time</span><span className="ap-summary-val">{data.time}</span></div>}
          {(data.firstName || data.lastName) && <div className="ap-summary-item"><span className="ap-summary-key">Name</span><span className="ap-summary-val">{data.firstName} {data.lastName}</span></div>}
          {data.email && <div className="ap-summary-item"><span className="ap-summary-key">Email</span><span className="ap-summary-val">{data.email}</span></div>}
        </div>
      </div>

      <div className="ap-field-group">
        <label className="ap-label" htmlFor="ap-msg">Tell us more about what you have in mind</label>
        <textarea id="ap-msg" className="ap-textarea" rows={5}
          placeholder="Describe your vision, any specific stones or metals you love, inspiration images you have in mind, or any questions you'd like us to prepare for…"
          value={data.message} onChange={e => set("message", e.target.value)}
        />
        <p className="ap-hint">The more detail you share, the better prepared our team will be for your visit.</p>
      </div>

      <label className={`ap-checkbox ${data.newsletter ? "ap-checkbox-on" : ""}`}>
        <input type="checkbox" checked={data.newsletter} onChange={e => set("newsletter", e.target.checked)} />
        <span className="ap-checkbox-box"><Check size={10} /></span>
        Subscribe to our newsletter for new collections, private events, and exclusive previews
      </label>
    </div>
  );
}

/* ─── CONFIRMATION ───────────────────────────────────────────────── */
function Confirmation({ data }: { data: FormData }) {
  const location = LOCATIONS.find(l => l.id === data.location);
  return (
    <motion.div
      className="ap-confirm"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="ap-confirm-icon">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}>
          <Check size={32} />
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
        <p className="ap-confirm-eyebrow">Appointment Requested</p>
        <h2 className="ap-confirm-title">We'll be in touch,<br /><em>{data.firstName || "valued client"}</em></h2>
        <p className="ap-confirm-body">
          Your appointment request has been received. A member of our team will confirm your booking
          within 24 hours via email to <strong>{data.email}</strong>.
        </p>
        <div className="ap-confirm-details">
          {data.date && <div className="ap-confirm-row"><Calendar size={14} />{new Date(data.date).toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long" })} at {data.time}</div>}
          {location  && <div className="ap-confirm-row"><MapPin size={14} />{location.label} — {location.sub}</div>}
        </div>
        <div className="ap-confirm-stars">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#b18d2b" color="#b18d2b" />)}
          <span>Trusted by over 12,000 clients worldwide</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── VALIDATION ─────────────────────────────────────────────────── */
function validate(step: number, data: FormData): string | null {
  if (step === 1 && !data.serviceType) return "Please select a service to continue.";
  if (step === 2) {
    if (!data.location) return "Please choose a location.";
    if (!data.date)     return "Please select a preferred date.";
    if (!data.time)     return "Please select a preferred time.";
  }
  if (step === 3) {
    if (!data.firstName) return "Please enter your first name.";
    if (!data.lastName)  return "Please enter your last name.";
    if (!data.email || !data.email.includes("@")) return "Please enter a valid email address.";
  }
  return null;
}

/* ─── MAIN PAGE ──────────────────────────────────────────────────── */
const EMPTY: FormData = {
  serviceType: "", occasion: "", budget: "",
  date: "", time: "", location: "",
  firstName: "", lastName: "", email: "", phone: "", existingCustomer: "",
  message: "", referral: "", newsletter: false,
};

export default function AppointmentPage() {
  const [step,      setStep]      = useState(1);
  const [data,      setData]      = useState<FormData>(EMPTY);
  const [error,     setError]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting,setSubmitting]= useState(false);
  const [dir,       setDir]       = useState(1); // animation direction

  const set = (k: keyof FormData, v: any) => {
    setData(prev => ({ ...prev, [k]: v }));
    setError(null);
  };

  const next = () => {
    const err = validate(step, data);
    if (err) { setError(err); return; }
    setDir(1);
    setStep(s => s + 1);
    setError(null);
  };

  const prev = () => {
    setDir(-1);
    setStep(s => s - 1);
    setError(null);
  };

  const submit = async () => {
    const err = validate(step, data);
    if (err) { setError(err); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@200;300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── PAGE ── */
        .ap-page {
          min-height: 100vh;
          background: #faf9f6;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          padding-top: 80px;
        }

        /* ── HERO BANNER ── */
        .ap-banner {
          background: #1a1714;
          padding: clamp(48px, 8vw, 80px) clamp(24px, 8vw, 100px);
          position: relative; overflow: hidden;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          min-height: clamp(220px, 30vw, 360px);
        }
        .ap-banner-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(0.38);
        }
        .ap-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.3) 60%, transparent 100%);
          z-index: 1;
        }
        .ap-banner::before {
          content: '';
          position: absolute; inset: 0; z-index: 1;
          background-image:
            linear-gradient(rgba(177,141,43,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(177,141,43,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ap-banner-ghost {
          position: absolute; right: -20px; bottom: -20px; z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 14vw, 180px); font-weight: 700; font-style: italic;
          color: rgba(177,141,43,0.07); pointer-events: none; user-select: none;
          line-height: 1; letter-spacing: -0.04em;
        }
        .ap-banner-left { position: relative; z-index: 2; }
        .ap-banner-eyebrow {
          font-size: 9px; letter-spacing: 0.6em; text-transform: uppercase;
          color: #b18d2b; margin-bottom: 14px; display: block;
        }
        .ap-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 300; font-style: italic;
          color: #f0ece4; line-height: 1.0; margin: 0;
        }
        .ap-banner-right {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; gap: 10px; align-items: flex-end;
        }
        .ap-banner-info {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 300; color: rgba(240,236,228,0.45);
        }
        .ap-banner-info svg { color: #b18d2b; }

        /* ── LAYOUT ── */
        .ap-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: clamp(2rem, 4vw, 4rem);
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) 100px;
          align-items: start;
        }

        /* ── FORM CARD ── */
        .ap-card {
          background: #ffffff;
          border: 1px solid #e8e4de;
          padding: clamp(28px, 5vw, 52px);
        }

        /* ── PROGRESS BAR ── */
        .ap-progress-wrap { margin-bottom: 40px; }
        .ap-steps-row {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 16px; position: relative;
        }
        .ap-step-connector {
          flex: 1; height: 1px;
          background: #e8e4de;
          position: relative; overflow: hidden;
        }
        .ap-step-connector-fill {
          position: absolute; inset-y: 0; left: 0;
          background: #b18d2b;
          transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ap-step-dot {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 500;
          border: 1px solid #e8e4de;
          background: #fff; color: #bbb;
          transition: all 0.4s ease;
          position: relative; z-index: 1;
        }
        .ap-step-dot.done { background: #b18d2b; border-color: #b18d2b; color: #fff; }
        .ap-step-dot.active { background: #1a1a1a; border-color: #1a1a1a; color: #fff; box-shadow: 0 0 0 4px rgba(177,141,43,0.15); }
        .ap-steps-labels {
          display: flex; justify-content: space-between;
          padding: 0 17px;
        }
        .ap-step-label {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #bbb; text-align: center; flex: 1;
          transition: color 0.3s;
        }
        .ap-step-label.active { color: #1a1a1a; }
        .ap-step-label.done   { color: #b18d2b; }

        /* ── STEP HEADER ── */
        .ap-step-header { margin-bottom: 32px; }
        .ap-step-tag {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; display: block; margin-bottom: 8px;
        }
        .ap-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 34px); font-weight: 400; font-style: italic;
          color: #1a1a1a; margin: 0;
        }
        .ap-step-sub {
          font-size: 12px; font-weight: 300; color: #999; margin-top: 6px; line-height: 1.6;
        }

        /* ── FORM ELEMENTS ── */
        .ap-step-body { display: flex; flex-direction: column; gap: 28px; }
        .ap-field-group { display: flex; flex-direction: column; gap: 8px; }
        .ap-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .ap-label {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #888; font-weight: 400;
        }

        .ap-input-wrap { position: relative; }
        .ap-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #bbb; pointer-events: none;
        }
        .ap-input {
          width: 100%; height: 44px; padding: 0 14px;
          border: 1px solid #e0dbd4; background: #faf9f6;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
          color: #1a1a1a; outline: none; border-radius: 0;
          transition: border-color 0.3s, background 0.3s;
        }
        .ap-input-icon-pad { padding-left: 40px; }
        .ap-input:focus { border-color: #b18d2b; background: #fff; }
        .ap-input[type="date"] { cursor: pointer; }
        .ap-textarea {
          width: 100%; padding: 14px;
          border: 1px solid #e0dbd4; background: #faf9f6;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
          color: #1a1a1a; outline: none; border-radius: 0; resize: vertical;
          transition: border-color 0.3s, background 0.3s; line-height: 1.7;
        }
        .ap-textarea:focus { border-color: #b18d2b; background: #fff; }
        .ap-hint { font-size: 10px; color: #bbb; font-weight: 300; margin-top: 2px; }

        /* Service grid */
        .ap-service-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .ap-service-card {
          position: relative; padding: 18px 16px;
          border: 1px solid #e8e4de; background: #fff;
          text-align: left; cursor: pointer;
          transition: border-color 0.3s, background 0.3s, transform 0.2s;
          display: flex; flex-direction: column; gap: 6px;
        }
        .ap-service-card:hover { border-color: #b18d2b; transform: translateY(-2px); }
        .ap-service-card-on { border-color: #b18d2b; background: #fffbf2; }
        .ap-service-icon { font-size: 18px; color: #b18d2b; line-height: 1; }
        .ap-service-label { font-size: 12px; font-weight: 500; color: #1a1a1a; line-height: 1.2; }
        .ap-service-desc  { font-size: 10px; font-weight: 300; color: #999; line-height: 1.5; }
        .ap-service-check {
          position: absolute; top: 10px; right: 10px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #b18d2b; color: #fff;
          display: flex; align-items: center; justify-content: center;
        }

        /* Pills */
        .ap-pill-group { display: flex; flex-wrap: wrap; gap: 8px; }
        .ap-pill {
          padding: 6px 14px; border: 1px solid #e0dbd4; background: #fff;
          font-size: 11px; font-weight: 300; color: #555;
          cursor: pointer; transition: all 0.25s; border-radius: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .ap-pill:hover { border-color: #b18d2b; color: #1a1a1a; }
        .ap-pill-on { border-color: #b18d2b; background: #b18d2b; color: #fff; }

        /* Budget grid */
        .ap-budget-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .ap-budget-btn {
          padding: 10px 8px; border: 1px solid #e0dbd4; background: #fff;
          font-size: 10px; font-weight: 300; color: #555; text-align: center;
          cursor: pointer; transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
        }
        .ap-budget-btn:hover { border-color: #b18d2b; }
        .ap-budget-btn-on { border-color: #b18d2b; background: #b18d2b; color: #fff; }

        /* Location */
        .ap-location-grid { display: flex; flex-direction: column; gap: 8px; }
        .ap-location-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border: 1px solid #e8e4de; background: #fff;
          cursor: pointer; transition: all 0.3s; position: relative;
          text-align: left;
        }
        .ap-location-card:hover { border-color: #b18d2b; }
        .ap-location-card-on { border-color: #b18d2b; background: #fffbf2; }
        .ap-location-icon { color: #b18d2b; flex-shrink: 0; }
        .ap-location-name { font-size: 13px; font-weight: 500; color: #1a1a1a; }
        .ap-location-sub  { font-size: 10px; font-weight: 300; color: #999; margin-top: 2px; }
        .ap-location-check { color: #b18d2b; margin-left: auto; flex-shrink: 0; }

        /* Time grid */
        .ap-time-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .ap-time-btn {
          padding: 9px 6px; border: 1px solid #e0dbd4; background: #fff;
          font-size: 10px; font-weight: 300; color: #555; text-align: center;
          cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-family: 'DM Sans', sans-serif;
        }
        .ap-time-btn:hover { border-color: #b18d2b; }
        .ap-time-btn-on { border-color: #b18d2b; background: #1a1a1a; color: #fff; }

        /* Radio */
        .ap-radio-group { display: flex; flex-wrap: wrap; gap: 10px; }
        .ap-radio {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; border: 1px solid #e0dbd4; background: #fff;
          cursor: pointer; font-size: 12px; font-weight: 300; color: #555;
          transition: all 0.25s; user-select: none;
        }
        .ap-radio input { display: none; }
        .ap-radio-dot {
          width: 14px; height: 14px; border-radius: 50%;
          border: 1px solid #ddd; flex-shrink: 0;
          transition: all 0.25s; position: relative;
        }
        .ap-radio-on { border-color: #b18d2b; background: #fffbf2; color: #1a1a1a; }
        .ap-radio-on .ap-radio-dot {
          border-color: #b18d2b; background: #b18d2b;
        }

        /* Summary */
        .ap-summary {
          background: #faf9f6; border: 1px solid #e8e4de;
          border-left: 3px solid #b18d2b;
          padding: 20px 22px;
        }
        .ap-summary-title {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #b18d2b; margin: 0 0 14px;
        }
        .ap-summary-grid { display: flex; flex-direction: column; gap: 8px; }
        .ap-summary-item { display: flex; gap: 12px; font-size: 12px; }
        .ap-summary-key { color: #aaa; font-weight: 300; min-width: 70px; flex-shrink: 0; }
        .ap-summary-val { color: #1a1a1a; font-weight: 400; }

        /* Checkbox */
        .ap-checkbox {
          display: flex; align-items: flex-start; gap: 12px;
          cursor: pointer; font-size: 12px; font-weight: 300;
          color: #666; line-height: 1.6; user-select: none;
        }
        .ap-checkbox input { display: none; }
        .ap-checkbox-box {
          width: 18px; height: 18px; border: 1px solid #ddd; flex-shrink: 0;
          margin-top: 2px; display: flex; align-items: center; justify-content: center;
          transition: all 0.25s; color: transparent;
        }
        .ap-checkbox-on .ap-checkbox-box { background: #b18d2b; border-color: #b18d2b; color: #fff; }

        /* Error */
        .ap-error {
          padding: 12px 16px; background: #fff5f5;
          border: 1px solid rgba(192,57,43,0.2); border-left: 3px solid #c0392b;
          font-size: 12px; color: #c0392b; font-weight: 300;
        }

        /* Nav buttons */
        .ap-nav {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 36px; padding-top: 28px;
          border-top: 1px solid #f0ece6;
        }
        .ap-btn-back {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 20px; background: none; border: 1px solid #ddd;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400;
          letter-spacing: 0.25em; text-transform: uppercase; color: #888;
          cursor: pointer; transition: all 0.3s;
        }
        .ap-btn-back:hover { border-color: #1a1a1a; color: #1a1a1a; }
        .ap-btn-next {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: #1a1a1a; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase; color: #fff;
          cursor: pointer; transition: background 0.35s, letter-spacing 0.3s;
        }
        .ap-btn-next:hover { background: #b18d2b; letter-spacing: 0.38em; }
        .ap-btn-next:disabled { opacity: 0.5; cursor: default; }
        .ap-btn-submit {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: #b18d2b; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase; color: #fff;
          cursor: pointer; transition: background 0.35s;
        }
        .ap-btn-submit:hover { background: #d4af37; }
        .ap-btn-submit:disabled { opacity: 0.6; cursor: default; }

        .ap-spin { animation: apspin 0.8s linear infinite; display: inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; }
        @keyframes apspin { to { transform: rotate(360deg); } }

        /* ── SIDEBAR ── */
        .ap-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 100px; }

        .ap-info-card {
          background: #fff; border: 1px solid #e8e4de;
          padding: 24px;
        }
        .ap-info-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 400; font-style: italic;
          color: #1a1a1a; margin: 0 0 16px;
        }
        .ap-info-list { display: flex; flex-direction: column; gap: 12px; }
        .ap-info-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 12px; font-weight: 300; color: #666; line-height: 1.6;
        }
        .ap-info-item svg { color: #b18d2b; flex-shrink: 0; margin-top: 2px; }

        .ap-guarantee {
          background: #1a1714; padding: 24px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .ap-guarantee-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-style: italic; color: #f0ece4; margin: 0;
        }
        .ap-guarantee-body { font-size: 11px; font-weight: 300; color: rgba(240,236,228,0.5); line-height: 1.7; }
        .ap-guarantee-rule { height: 1px; background: rgba(177,141,43,0.3); }

        .ap-testimonial {
          background: #f5f0e8; padding: 24px;
          border-left: 3px solid #b18d2b;
        }
        .ap-testimonial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-style: italic; font-weight: 400;
          color: #1a1a1a; line-height: 1.6; margin: 0 0 12px;
        }
        .ap-testimonial-author { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #b18d2b; }

        /* ── CONFIRMATION ── */
        .ap-confirm {
          text-align: center; padding: clamp(40px, 8vw, 80px) clamp(24px, 6vw, 60px);
          display: flex; flex-direction: column; align-items: center; gap: 24px;
        }
        .ap-confirm-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #b18d2b, #d4af37);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .ap-confirm-eyebrow {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; margin: 0;
        }
        .ap-confirm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 48px); font-weight: 300; font-style: italic;
          color: #1a1a1a; margin: 0; line-height: 1.1;
        }
        .ap-confirm-body {
          font-size: 13px; font-weight: 300; color: #666;
          line-height: 1.8; max-width: 440px; margin: 0;
        }
        .ap-confirm-details {
          display: flex; flex-direction: column; gap: 8px;
          padding: 18px 24px; background: #faf9f6; border: 1px solid #e8e4de;
          border-left: 3px solid #b18d2b; text-align: left; width: 100%;
        }
        .ap-confirm-row {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 300; color: #444;
        }
        .ap-confirm-row svg { color: #b18d2b; flex-shrink: 0; }
        .ap-confirm-stars {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 300; color: #999;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) { .ap-layout { grid-template-columns: 1fr; } .ap-sidebar { position: static; } }
        @media (max-width: 768px)  { .ap-service-grid { grid-template-columns: repeat(2, 1fr); } .ap-time-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px)  {
          .ap-page { padding-top: 64px; }
          .ap-row-2 { grid-template-columns: 1fr; }
          .ap-service-grid { grid-template-columns: 1fr; }
          .ap-budget-grid { grid-template-columns: repeat(2, 1fr); }
          .ap-time-grid { grid-template-columns: repeat(2, 1fr); }
          .ap-card { padding: 20px 16px; }
          .ap-banner { padding: 40px 20px; }
        }
      `}</style>

      <div className="ap-page">

        {/* BANNER */}
        <div className="ap-banner">
          <Image
            src="/book_appointment_banner.png"
            alt="Book an appointment"
            fill
            priority
            className="ap-banner-img"
          />
          <div className="ap-banner-overlay" />
          <div className="ap-banner-ghost">Atelier</div>
          <div className="ap-banner-left">
            <span className="ap-banner-eyebrow">Book Your Visit</span>
            <h1 className="ap-banner-title">Private<br />Consultation</h1>
          </div>
          <div className="ap-banner-right">
            <div className="ap-banner-info"><Clock size={13} /> Appointments from 60–120 minutes</div>
            <div className="ap-banner-info"><MapPin size={13} /> Kandy · Virtual</div>
            <div className="ap-banner-info"><Star size={13} /> Complimentary consultation</div>
          </div>
        </div>

        <div className="ap-layout">

          {/* FORM */}
          <div className="ap-card">
            {submitted ? (
              <Confirmation data={data} />
            ) : (
              <>
                {/* Progress */}
                <div className="ap-progress-wrap">
                  <div className="ap-steps-row">
                    {STEPS.map((s, i) => (
                      <div key={s.num} style={{ display: "contents" }}>
                        <div className={`ap-step-dot ${step > s.num ? "done" : step === s.num ? "active" : ""}`}>
                          {step > s.num ? <Check size={14} /> : s.icon}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="ap-step-connector">
                            <div className="ap-step-connector-fill" style={{ width: step > s.num ? "100%" : "0%" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="ap-steps-labels">
                    {STEPS.map(s => (
                      <span key={s.num} className={`ap-step-label ${step === s.num ? "active" : step > s.num ? "done" : ""}`}>
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step header */}
                <div className="ap-step-header">
                  <span className="ap-step-tag">Step {step} of {STEPS.length}</span>
                  <h2 className="ap-step-title">
                    {step === 1 && "What brings you to us?"}
                    {step === 2 && "When shall we meet?"}
                    {step === 3 && "Tell us about yourself"}
                    {step === 4 && "Anything else to share?"}
                  </h2>
                  <p className="ap-step-sub">
                    {step === 1 && "Choose the service that best describes your visit. We'll prepare accordingly."}
                    {step === 2 && "Select your preferred atelier, date, and a time that suits you."}
                    {step === 3 && "So we can confirm your booking and prepare a personalised experience."}
                    {step === 4 && "Review your details and share any additional thoughts before we confirm."}
                  </p>
                </div>

                {/* Animated step content */}
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {step === 1 && <Step1 data={data} set={set} />}
                    {step === 2 && <Step2 data={data} set={set} />}
                    {step === 3 && <Step3 data={data} set={set} />}
                    {step === 4 && <Step4 data={data} set={set} />}
                  </motion.div>
                </AnimatePresence>

                {/* Error */}
                {error && (
                  <motion.div className="ap-error" style={{ marginTop: 20 }}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                    {error}
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="ap-nav">
                  {step > 1 ? (
                    <button className="ap-btn-back" onClick={prev}>
                      <ChevronLeft size={14} /> Back
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button className="ap-btn-next" onClick={next}>
                      Continue <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button className="ap-btn-submit" onClick={submit} disabled={submitting}>
                      {submitting
                        ? <><span className="ap-spin" /> Confirming…</>
                        : <>Request Appointment <Check size={14} /></>
                      }
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="ap-sidebar">
            <div className="ap-info-card">
              <h3 className="ap-info-title">What to expect</h3>
              <div className="ap-info-list">
                {[
                  { icon: <Star size={13} />, text: "A complimentary one-to-one consultation with a dedicated specialist" },
                  { icon: <Gem size={13} />, text: "Access to our private collection, including pieces not shown online" },
                  { icon: <Clock size={13} />, text: "60–120 minutes reserved entirely for you — no rush, no pressure" },
                  { icon: <Check size={13} />, text: "Confirmation within 24 hours with your personal stylist's details" },
                  { icon: <MapPin size={13} />, text: "Complimentary refreshments and a welcome gift on arrival" },
                ].map((item, i) => (
                  <div key={i} className="ap-info-item">{item.icon}{item.text}</div>
                ))}
              </div>
            </div>

            <div className="ap-guarantee">
              <h3 className="ap-guarantee-title">Our Commitment</h3>
              <div className="ap-guarantee-rule" />
              <p className="ap-guarantee-body">
                Every consultation is entirely without obligation. We are here to guide, 
                not to sell. If you leave without finding the perfect piece, we consider 
                that a conversation — not a lost appointment.
              </p>
            </div>

            <div className="ap-testimonial">
              <p className="ap-testimonial-quote">
                "The consultation was the most thoughtful experience I've had in any boutique. 
                They listened to everything and found exactly what I didn't know I was looking for."
              </p>
              <span className="ap-testimonial-author">— S. Whitmore, London</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
