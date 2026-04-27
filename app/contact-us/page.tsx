"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check, Mail, Phone, MapPin, Clock, Send,
  MessageSquare, User, ChevronDown, Instagram,
  Facebook, Youtube
} from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  enquiryType: string;
  message: string;
  newsletter: boolean;
};

const ENQUIRY_TYPES = [
  { id: "general",    icon: "◇", label: "General Enquiry",     desc: "Questions about our brand or collections" },
  { id: "bespoke",    icon: "✦", label: "Bespoke Commission",  desc: "Discuss a custom piece" },
  { id: "order",      icon: "⊞", label: "Order & Delivery",    desc: "Track or manage an existing order" },
  { id: "repair",     icon: "⟳", label: "Repair & Care",       desc: "Service for an existing piece" },
  { id: "press",      icon: "◈", label: "Press & Partnerships",desc: "Media, editorial or collaboration" },
  { id: "other",      icon: "○", label: "Something Else",      desc: "We're happy to help with anything" },
];

const SUBJECTS = [
  "New Collection", "Ring Design", "Necklaces", "Bracelets",
  "Earrings", "Gifting", "Corporate Orders", "Other",
];

const CONTACT_INFO = [
  {
    icon: <MapPin size={18} />,
    title: "Visit Us",
    lines: ["No. 123, Main Street", "Kandy, Sri Lanka"],
  },
  {
    icon: <Phone size={18} />,
    title: "Call Us",
    lines: ["+94 81 234 5678", "Mon – Sat, 10am – 6pm"],
  },
  {
    icon: <Mail size={18} />,
    title: "Email Us",
    lines: ["hello@kandyjewelry.com", "We reply within 24 hours"],
  },
  {
    icon: <Clock size={18} />,
    title: "Opening Hours",
    lines: ["Mon – Fri: 10:00 – 18:00", "Sat: 10:00 – 16:00"],
  },
];

/* ── REVEAL ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ── FAQ ── */
const FAQS = [
 
  { q: "Do you offer international shipping?", a: "Yes — we ship worldwide with full insurance and discreet packaging. Delivery times vary by destination, typically 5–10 business days." },
  { q: "Can I resize a ring after purchase?", a: "Most rings can be resized. We offer one complimentary resize within 30 days of purchase. Contact us to arrange." },
  { q: "What metals do you work with?", a: "We work with 18k yellow, white and rose gold, platinum, and palladium. All metals are ethically sourced and hallmarked." },
  { q: "Do you offer valuations for insurance?", a: "Yes. We provide certified valuations for all pieces we create, and can arrange independent appraisals for pieces purchased elsewhere." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="cu-faq-list">
      {FAQS.map((faq, i) => (
        <div key={i} className={`cu-faq-item ${open === i ? "cu-faq-open" : ""}`}>
          <button className="cu-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.q}</span>
            <ChevronDown size={15} className="cu-faq-chevron" />
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <p className="cu-faq-a">{faq.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ── PAGE ── */
export default function ContactUsPage() {
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    subject: "", enquiryType: "", message: "", newsletter: false,
  });
  const [error,     setError]     = useState<string | null>(null);
  const [sending,   setSending]   = useState(false);
  const [sent,      setSent]      = useState(false);

  const set = (k: keyof FormData, v: any) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!form.enquiryType) { setError("Please select an enquiry type."); return; }
    if (!form.firstName)   { setError("Please enter your first name."); return; }
    if (!form.email || !form.email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!form.message)     { setError("Please write a message before sending."); return; }

    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cu-page {
          min-height: 100vh;
          background: #faf9f6;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          padding-top: 80px;
        }

        /* ── BANNER ── */
        .cu-banner {
          background: #1a1714;
          padding: clamp(48px, 8vw, 80px) clamp(24px, 8vw, 100px);
          position: relative; overflow: hidden;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          min-height: clamp(220px, 30vw, 360px);
        }


        
        .cu-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.35) 60%, transparent 100%);
          z-index: 1;
        }
        .cu-banner::before {
          content: '';
          position: absolute; inset: 0; z-index: 1;
          background-image:
            linear-gradient(rgba(177,141,43,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(177,141,43,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .cu-banner-ghost {
          position: absolute; right: -20px; bottom: -20px; z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 14vw, 180px); font-weight: 700; font-style: italic;
          color: rgba(177,141,43,0.07); pointer-events: none; user-select: none;
          line-height: 1; letter-spacing: -0.04em;
        }
        .cu-banner-left { position: relative; z-index: 2; }
        .cu-banner-eyebrow {
          font-size: 9px; letter-spacing: 0.6em; text-transform: uppercase;
          color: #b18d2b; margin-bottom: 14px; display: block;
        }
        .cu-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 300; font-style: italic;
          color: #f0ece4; line-height: 1.0; margin: 0;
        }
        .cu-banner-right {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; gap: 10px; align-items: flex-start;
        }
        .cu-banner-info {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 300; color: rgba(240,236,228,0.45);
          white-space: nowrap;
        }
        .cu-banner-info svg { color: #b18d2b; flex-shrink: 0; }

        /* ── LAYOUT ── */
        .cu-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: clamp(2rem, 4vw, 4rem);
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) 80px;
          align-items: start;
        }

        /* ── FORM CARD ── */
        .cu-card {
          background: #ffffff;
          border: 1px solid #e8e4de;
          padding: clamp(28px, 5vw, 52px);
        }

        .cu-card-eyebrow {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; display: block; margin-bottom: 8px;
        }
        .cu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 34px); font-weight: 400; font-style: italic;
          color: #1a1a1a; margin: 0 0 6px;
        }
        .cu-card-sub {
          font-size: 12px; font-weight: 300; color: #999;
          line-height: 1.6; margin: 0 0 36px;
        }
        .cu-rule {
          height: 1px;
          background: linear-gradient(to right, #b18d2b, #ece8e1 50%, transparent);
          border: none; margin: 0 0 32px;
        }

        /* ── FORM ELEMENTS ── */
        .cu-body { display: flex; flex-direction: column; gap: 28px; }
        .cu-field-group { display: flex; flex-direction: column; gap: 8px; }
        .cu-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .cu-label {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #888; font-weight: 400;
        }
        .cu-input-wrap { position: relative; }
        .cu-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #bbb; pointer-events: none;
        }
        .cu-input {
          width: 100%; height: 44px; padding: 0 14px;
          border: 1px solid #e0dbd4; background: #faf9f6;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
          color: #1a1a1a; outline: none; border-radius: 0;
          transition: border-color 0.3s, background 0.3s;
        }
        .cu-input-pad { padding-left: 40px; }
        .cu-input:focus { border-color: #b18d2b; background: #fff; }
        .cu-select {
          width: 100%; height: 44px; padding: 0 36px 0 14px;
          border: 1px solid #e0dbd4; background: #faf9f6;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
          color: #1a1a1a; outline: none; border-radius: 0; cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23b18d2b' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          transition: border-color 0.3s;
        }
        .cu-select:focus { border-color: #b18d2b; background-color: #fff; }
        .cu-textarea {
          width: 100%; padding: 14px;
          border: 1px solid #e0dbd4; background: #faf9f6;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
          color: #1a1a1a; outline: none; border-radius: 0; resize: vertical;
          transition: border-color 0.3s, background 0.3s; line-height: 1.7;
        }
        .cu-textarea:focus { border-color: #b18d2b; background: #fff; }

        /* Enquiry type grid */
        .cu-enquiry-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .cu-enquiry-card {
          position: relative; padding: 16px 14px;
          border: 1px solid #e8e4de; background: #fff;
          text-align: left; cursor: pointer;
          transition: border-color 0.3s, background 0.3s, transform 0.2s;
          display: flex; flex-direction: column; gap: 5px;
        }
        .cu-enquiry-card:hover { border-color: #b18d2b; transform: translateY(-2px); }
        .cu-enquiry-card-on { border-color: #b18d2b; background: #fffbf2; }
        .cu-enquiry-icon { font-size: 16px; color: #b18d2b; line-height: 1; }
        .cu-enquiry-label { font-size: 11px; font-weight: 500; color: #1a1a1a; line-height: 1.2; }
        .cu-enquiry-desc  { font-size: 9px; font-weight: 300; color: #999; line-height: 1.5; }
        .cu-enquiry-check {
          position: absolute; top: 8px; right: 8px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #b18d2b; color: #fff;
          display: flex; align-items: center; justify-content: center;
        }

        /* Checkbox */
        .cu-checkbox {
          display: flex; align-items: flex-start; gap: 12px;
          cursor: pointer; font-size: 12px; font-weight: 300;
          color: #666; line-height: 1.6; user-select: none;
        }
        .cu-checkbox input { display: none; }
        .cu-checkbox-box {
          width: 18px; height: 18px; border: 1px solid #ddd; flex-shrink: 0;
          margin-top: 2px; display: flex; align-items: center; justify-content: center;
          transition: all 0.25s; color: transparent;
        }
        .cu-checkbox-on .cu-checkbox-box { background: #b18d2b; border-color: #b18d2b; color: #fff; }

        /* Error */
        .cu-error {
          padding: 12px 16px; background: #fff5f5;
          border: 1px solid rgba(192,57,43,0.2); border-left: 3px solid #c0392b;
          font-size: 12px; color: #c0392b; font-weight: 300;
        }

        /* Submit button */
        .cu-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; height: 50px;
          background: #1a1a1a; color: #fff; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 0.3em; text-transform: uppercase;
          cursor: pointer; transition: background 0.35s, letter-spacing 0.3s;
          margin-top: 8px;
        }
        .cu-submit:hover:not(:disabled) { background: #b18d2b; letter-spacing: 0.38em; }
        .cu-submit:disabled { opacity: 0.6; cursor: default; }
        .cu-spin {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: cuspin 0.8s linear infinite;
        }
        @keyframes cuspin { to { transform: rotate(360deg); } }

        /* ── CONFIRMATION ── */
        .cu-confirm {
          text-align: center;
          padding: clamp(40px, 8vw, 80px) clamp(24px, 6vw, 60px);
          display: flex; flex-direction: column; align-items: center; gap: 24px;
        }
        .cu-confirm-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #b18d2b, #d4af37);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .cu-confirm-eyebrow {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; margin: 0;
        }
        .cu-confirm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 4vw, 44px); font-weight: 300; font-style: italic;
          color: #1a1a1a; margin: 0; line-height: 1.1;
        }
        .cu-confirm-body {
          font-size: 13px; font-weight: 300; color: #666;
          line-height: 1.8; max-width: 420px; margin: 0;
        }
        .cu-confirm-detail {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; background: #faf9f6;
          border: 1px solid #e8e4de; border-left: 3px solid #b18d2b;
          font-size: 12px; font-weight: 300; color: #444; width: 100%;
        }
        .cu-confirm-detail svg { color: #b18d2b; flex-shrink: 0; }

        /* ── SIDEBAR ── */
        .cu-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 100px; }

        /* Contact info card */
        .cu-info-card {
          background: #fff; border: 1px solid #e8e4de; padding: 24px;
        }
        .cu-info-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 400; font-style: italic;
          color: #1a1a1a; margin: 0 0 20px;
        }
        .cu-info-grid { display: flex; flex-direction: column; gap: 18px; }
        .cu-info-item { display: flex; gap: 12px; align-items: flex-start; }
        .cu-info-item-icon {
          width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
          background: #fffbf2; border: 1px solid rgba(177,141,43,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #b18d2b;
        }
        .cu-info-item-title { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #b18d2b; margin: 0 0 3px; }
        .cu-info-item-line  { font-size: 12px; font-weight: 300; color: #555; line-height: 1.6; }

        /* Dark commitment card */
        .cu-dark-card {
          background: #1a1714; padding: 24px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .cu-dark-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-style: italic; color: #f0ece4; margin: 0;
        }
        .cu-dark-rule { height: 1px; background: rgba(177,141,43,0.3); }
        .cu-dark-body { font-size: 11px; font-weight: 300; color: rgba(240,236,228,0.5); line-height: 1.7; }

        /* Social card */
        .cu-social-card {
          background: #fff; border: 1px solid #e8e4de; padding: 20px 24px;
          display: flex; flex-direction: column; gap: 14px;
          overflow: hidden;
        }
        .cu-social-title {
          font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
          color: #aaa; margin: 0;
        }
        .cu-social-links { display: flex; gap: 10px; flex-wrap: wrap; }
        .cu-social-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px; border: 1px solid #e8e4de; background: #fff;
          font-size: 10px; font-weight: 400; color: #555; text-decoration: none;
          transition: border-color 0.3s, color 0.3s; letter-spacing: 0.1em;
          font-family: 'DM Sans', sans-serif; flex: 1; justify-content: center;
          white-space: nowrap;
        }
        .cu-social-btn:hover { border-color: #b18d2b; color: #b18d2b; }
        .cu-social-btn svg { flex-shrink: 0; }

        /* ── FAQ SECTION ── */
        .cu-faq-section {
          background: #fff;
          border-top: 1px solid #e8e4de;
          padding: clamp(60px, 10vw, 100px) clamp(1.5rem, 6vw, 5rem);
        }
        .cu-faq-inner { max-width: 1200px; margin: 0 auto; }
        .cu-faq-header { margin-bottom: clamp(36px, 5vw, 56px); }
        .cu-faq-eyebrow {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; display: block; margin-bottom: 10px;
        }
        .cu-faq-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 52px); font-weight: 300; font-style: italic;
          color: #1a1a1a; margin: 0;
        }
        .cu-faq-list { display: flex; flex-direction: column; gap: 0; max-width: 780px; }
        .cu-faq-item { border-bottom: 1px solid #e8e4de; }
        .cu-faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 0; background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
          color: #1a1a1a; text-align: left; transition: color 0.3s;
        }
        .cu-faq-q:hover { color: #b18d2b; }
        .cu-faq-chevron { flex-shrink: 0; color: #b18d2b; transition: transform 0.35s; }
        .cu-faq-open .cu-faq-chevron { transform: rotate(180deg); }
        .cu-faq-a {
          font-size: 13px; font-weight: 300; color: #666;
          line-height: 1.8; padding: 0 0 20px;
        }

        /* ── MAP STRIP ── */
        .cu-map-strip {
          background: #1a1714;
          padding: clamp(40px, 6vw, 60px) clamp(1.5rem, 6vw, 5rem);
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
        }
        .cu-map-left {}
        .cu-map-eyebrow {
          font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #b18d2b; display: block; margin-bottom: 8px;
        }
        .cu-map-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 36px); font-style: italic;
          color: #f0ece4; margin: 0 0 6px;
        }
        .cu-map-address { font-size: 12px; font-weight: 300; color: rgba(240,236,228,0.5); }
        .cu-map-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: #b18d2b; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase; text-decoration: none;
          transition: background 0.3s; flex-shrink: 0;
        }
        .cu-map-btn:hover { background: #d4af37; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) { .cu-layout { grid-template-columns: 1fr; } .cu-sidebar { position: static; } }
        @media (max-width: 768px)  { .cu-enquiry-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  {
          .cu-page { padding-top: 64px; }
          .cu-banner { padding: 40px 20px; }
          .cu-layout { padding: clamp(1.5rem, 4vw, 2rem) 1rem 80px; }
          .cu-card { padding: 20px 16px; }
          .cu-row-2 { grid-template-columns: 1fr; }
          .cu-enquiry-grid { grid-template-columns: 1fr; }
          .cu-social-links { flex-wrap: wrap; }
          .cu-map-strip { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="cu-page">

        {/* ── BANNER ── */}

        
       <div className="cu-banner">
  {/* The Image Component */}
  <Image
    src="/contact-us.webp" 
    alt="Kandy Jewelry Atelier"
    fill
    priority
    className="cu-banner-img"
    style={{ objectFit: 'cover' }}
  />
  
  {/* The Overlay - Keeps text readable against the image */}
  <div className="cu-banner-overlay" />
  
  <div className="cu-banner-ghost">Contact</div>
  
  <div className="cu-banner-left">
    <span className="cu-banner-eyebrow">Get in Touch</span>
    <h1 className="cu-banner-title">We'd Love<br />to Hear from You</h1>
  </div>
  
  <div className="cu-banner-right">
    <div className="cu-banner-info"><Mail size={13} /> hello@kandyjewelry.com</div>
    <div className="cu-banner-info"><Phone size={13} /> +94 81 234 5678</div>
    <div className="cu-banner-info"><Clock size={13} /> Mon – Sat, 10am – 6pm</div>
  </div>
</div>
        {/* ── MAIN LAYOUT ── */}
        <div className="cu-layout">

          {/* FORM */}
          <div className="cu-card">
            {sent ? (
              <motion.div
                className="cu-confirm"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="cu-confirm-icon">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}>
                    <Check size={32} />
                  </motion.div>
                </div>
                <p className="cu-confirm-eyebrow">Message Received</p>
                <h2 className="cu-confirm-title">Thank you,<br /><em>{form.firstName || "valued client"}</em></h2>
                <p className="cu-confirm-body">
                  We've received your message and will get back to you within 24 hours at{" "}
                  <strong>{form.email}</strong>. We look forward to speaking with you.
                </p>
                <div className="cu-confirm-detail">
                  <Mail size={14} />
                  A copy of your enquiry has been sent to your email address.
                </div>
                <div className="cu-confirm-detail">
                  <Clock size={14} />
                  Expected response: within 1 business day.
                </div>
              </motion.div>
            ) : (
              <>
                <span className="cu-card-eyebrow">Send a Message</span>
                <h2 className="cu-card-title">How can we help you?</h2>
                <p className="cu-card-sub">
                  Fill in the form below and a member of our team will respond personally within 24 hours.
                </p>
                <hr className="cu-rule" />

                <div className="cu-body">

                  {/* Enquiry type */}
                  <div className="cu-field-group">
                    <label className="cu-label">What is your enquiry about? *</label>
                    <div className="cu-enquiry-grid">
                      {ENQUIRY_TYPES.map(e => (
                        <button
                          key={e.id} type="button"
                          className={`cu-enquiry-card ${form.enquiryType === e.id ? "cu-enquiry-card-on" : ""}`}
                          onClick={() => set("enquiryType", e.id)}
                        >
                          <span className="cu-enquiry-icon">{e.icon}</span>
                          <span className="cu-enquiry-label">{e.label}</span>
                          <span className="cu-enquiry-desc">{e.desc}</span>
                          {form.enquiryType === e.id && (
                            <span className="cu-enquiry-check"><Check size={11} /></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name row */}
                  <div className="cu-row-2">
                    <div className="cu-field-group">
                      <label className="cu-label" htmlFor="cu-fname">First Name *</label>
                      <div className="cu-input-wrap">
                        <User size={14} className="cu-input-icon" />
                        <input id="cu-fname" type="text" className="cu-input cu-input-pad"
                          placeholder="e.g. Isabelle"
                          value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                      </div>
                    </div>
                    <div className="cu-field-group">
                      <label className="cu-label" htmlFor="cu-lname">Last Name</label>
                      <input id="cu-lname" type="text" className="cu-input"
                        placeholder="e.g. Laurent"
                        value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="cu-row-2">
                    <div className="cu-field-group">
                      <label className="cu-label" htmlFor="cu-email">Email Address *</label>
                      <div className="cu-input-wrap">
                        <Mail size={14} className="cu-input-icon" />
                        <input id="cu-email" type="email" className="cu-input cu-input-pad"
                          placeholder="you@example.com"
                          value={form.email} onChange={e => set("email", e.target.value)} />
                      </div>
                    </div>
                    <div className="cu-field-group">
                      <label className="cu-label" htmlFor="cu-phone">Phone Number</label>
                      <div className="cu-input-wrap">
                        <Phone size={14} className="cu-input-icon" />
                        <input id="cu-phone" type="tel" className="cu-input cu-input-pad"
                          placeholder="+94 77 000 0000"
                          value={form.phone} onChange={e => set("phone", e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="cu-field-group">
                    <label className="cu-label" htmlFor="cu-subject">Subject</label>
                    <select id="cu-subject" className="cu-select"
                      value={form.subject} onChange={e => set("subject", e.target.value)}>
                      <option value="">Select a subject…</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="cu-field-group">
                    <label className="cu-label" htmlFor="cu-msg">Your Message *</label>
                    <textarea id="cu-msg" className="cu-textarea" rows={6}
                      placeholder="Tell us what's on your mind. The more detail you share, the better we can help…"
                      value={form.message} onChange={e => set("message", e.target.value)}
                    />
                  </div>

                  {/* Newsletter */}
                  <label className={`cu-checkbox ${form.newsletter ? "cu-checkbox-on" : ""}`}>
                    <input type="checkbox" checked={form.newsletter}
                      onChange={e => set("newsletter", e.target.checked)} />
                    <span className="cu-checkbox-box"><Check size={10} /></span>
                    Subscribe to our newsletter for new collections, private events, and exclusive previews
                  </label>

                  {/* Error */}
                  {error && (
                    <motion.div className="cu-error"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      {error}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button className="cu-submit" onClick={handleSubmit} disabled={sending}>
                    {sending
                      ? <><span className="cu-spin" /> Sending…</>
                      : <><Send size={14} /> Send Message</>
                    }
                  </button>
                </div>
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="cu-sidebar">

            <Reveal>
              <div className="cu-info-card">
                <h3 className="cu-info-title">Find us here</h3>
                <div className="cu-info-grid">
                  {CONTACT_INFO.map((item, i) => (
                    <div key={i} className="cu-info-item">
                      <div className="cu-info-item-icon">{item.icon}</div>
                      <div>
                        <p className="cu-info-item-title">{item.title}</p>
                        {item.lines.map((line, j) => (
                          <p key={j} className="cu-info-item-line">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="cu-dark-card">
                <h3 className="cu-dark-title">Our Promise</h3>
                <div className="cu-dark-rule" />
                <p className="cu-dark-body">
                  Every message is read by a real person. We never use automated responses
                  for enquiries about jewellery — your question deserves a thoughtful answer
                  from someone who truly knows our craft.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="cu-social-card">
                <p className="cu-social-title">Follow Our Journey</p>
                <div className="cu-social-links">
                  <a href="#" className="cu-social-btn"><Instagram size={13} /> Instagram</a>
                  <a href="#" className="cu-social-btn"><Facebook size={13} /> Facebook</a>
                  <a href="#" className="cu-social-btn"><Youtube size={13} /> YouTube</a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>

        {/* ── FAQ ── */}
        <section className="cu-faq-section">
          <div className="cu-faq-inner">
            <Reveal className="cu-faq-header">
              <span className="cu-faq-eyebrow">Common Questions</span>
              <h2 className="cu-faq-title">Frequently asked</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQ />
            </Reveal>
          </div>
        </section>

        {/* ── MAP STRIP ── */}
        <div className="cu-map-strip">
          <div className="cu-map-left">
            <span className="cu-map-eyebrow">Our Showroom</span>
            <h3 className="cu-map-title">Visit Us in Kandy</h3>
            <p className="cu-map-address">No. 123, Main Street, Kandy, Sri Lanka · Mon–Sat 10am–6pm</p>
          </div>
          <a
            href="https://maps.google.com/?q=Kandy,Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="cu-map-btn"
          >
            <MapPin size={14} /> Get Directions
          </a>
        </div>

      </div>
    </>
  );
}
