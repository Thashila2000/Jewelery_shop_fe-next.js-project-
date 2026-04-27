"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.25em",
    fontWeight: 500,
    color: "#b18d2b",
    display: "block",
    marginBottom: "10px",
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "12px 0",
    color: "#1a1a1a",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.4s ease",
  };

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        input:focus, textarea:focus { border-bottom-color: #b18d2b !important; }
        .contact-card { box-shadow: 0 40px 80px rgba(0,0,0,0.06); }
      `}</style>

      {/* ── HERO COVER IMAGE ── */}
      <section style={{ position: "relative", height: "45vh", width: "100%", overflow: "hidden" }}>
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075" 
          alt="Atelier"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "white" }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ letterSpacing: "0.5em", textTransform: "uppercase", fontSize: "10px", marginBottom: "15px" }}>Get In Touch</motion.p>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300 }}>
              Contact <em style={{ fontStyle: "italic", color: "#b18d2b" }}>Our Atelier</em>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <section style={{ maxWidth: "1200px", margin: "-80px auto 100px", position: "relative", zIndex: 10, padding: "0 24px" }}>
        <div className="contact-card" style={{ background: "#fff", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", border: "1px solid #f0f0f0" }}>
          
          {/* LEFT: INFORMATION PANEL */}
          <div style={{ padding: "60px", background: "#faf9f6" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, marginBottom: "40px" }}>
              Visit <span style={{ fontStyle: "italic", color: "#b18d2b" }}>the Showroom</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <MapPin size={20} color="#b18d2b" strokeWidth={1.5} />
                <div>
                  <p style={labelStyle}>Flagship Location</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>N0 123, Main Street, Kandy, Sri Lanka</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <Clock size={20} color="#b18d2b" strokeWidth={1.5} />
                <div>
                  <p style={labelStyle}>Opening Hours</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>Monday — Saturday: 10 AM - 6 PM</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <Mail size={20} color="#b18d2b" strokeWidth={1.5} />
                <div>
                  <p style={labelStyle}>Correspondence</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>concierge@atelier.com</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid #eee", display: "flex", gap: "20px" }}>
              <Instagram size={18} style={{ cursor: "pointer", color: "#888" }} />
              <Facebook size={18} style={{ cursor: "pointer", color: "#888" }} />
            </div>
          </div>

          {/* RIGHT: SINGLE FORM PANEL */}
          <div style={{ padding: "60px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, marginBottom: "40px" }}>
              Send a <span style={{ fontStyle: "italic", color: "#b18d2b" }}>Message</span>
            </h2>

            <form>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" placeholder="Isabelle" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" placeholder="Laurent" style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: "30px" }}> 
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="you@example.com" style={inputStyle} />
              </div>

              <div style={{ marginTop: "30px" }}>
                <label style={labelStyle}>Subject of Interest</label>
                <select style={{ ...inputStyle, appearance: "none" }}>
                  <option>Bespoke Commission</option>
                  <option>Engagement Rings</option>
                  <option>Repair & Restoration</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div style={{ marginTop: "30px" }}>
                <label style={labelStyle}>Your Vision</label>
                <textarea rows={4} placeholder="How can our artisans assist you?" style={{ ...inputStyle, resize: "none" }} />
              </div>

              <motion.button
                whileHover={{ backgroundColor: "#000" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  marginTop: "50px",
                  padding: "20px",
                  background: "#b18d2b",
                  color: "#fff",
                  border: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "background 0.3s"
                }}
              >
                Send Message <Send size={14} />
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}   