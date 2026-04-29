"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start; /* Align to top instead of center */
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
          /* Adjusted padding-top to account for fixed Navbar height (80px + extra breathing room) */
          padding: 120px 24px 60px 24px; 
          color: #1a1a1a;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 60px 40px;
          background: #fff;
          border: 1px solid #f0ece6;
          position: relative;
        }

        /* ── HEADER ── */
        .auth-header { text-align: center; margin-bottom: 40px; }
        .auth-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .auth-title em { font-style: italic; color: #b18d2b; }
        .auth-subtitle {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
        }

        /* ── FORM ── */
        .auth-form { display: flex; flex-direction: column; gap: 24px; }
        
        .input-group { position: relative; }
        .input-label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 8px;
        }
        
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-field {
          width: 100%;
          height: 48px;
          background: transparent;
          border: none;
          border-bottom: 1px solid #e8e4de;
          font-size: 14px;
          color: #1a1a1a;
          padding: 0 0 0 32px;
          transition: border-color 0.3s;
          outline: none;
        }
        .input-field:focus { border-color: #b18d2b; }

        .input-icon {
          position: absolute;
          left: 0;
          color: #ccc;
        }

        .password-toggle {
          position: absolute;
          right: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: #ccc;
          padding: 8px;
        }

        /* ── BUTTONS ── */
        .auth-submit {
          width: 100%;
          height: 54px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.35s;
          margin-top: 10px;
        }
        .auth-submit:hover { background: #b18d2b; letter-spacing: 0.35em; }

        .auth-switch {
          text-align: center;
          margin-top: 32px;
          font-size: 13px;
          color: #888;
          font-weight: 300;
        }
        .auth-switch-btn {
          background: none;
          border: none;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 4px;
          cursor: pointer;
          font-weight: 500;
          margin-left: 5px;
        }

        .forgot-pass {
          display: block;
          text-align: right;
          font-size: 11px;
          color: #aaa;
          text-decoration: none;
          margin-top: -12px;
        }

        /* ── OR DIVIDER ── */
        .auth-or {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 30px 0;
        }
        .auth-or-line { flex: 1; height: 1px; background: #f0ece6; }
        .auth-or-text { font-size: 10px; color: #ccc; letter-spacing: 0.1em; }

        @media (max-width: 480px) {
          .auth-container { padding-top: 100px; } /* Slightly less on mobile */
          .auth-card { padding: 40px 24px; border: none; }
          .auth-title { font-size: 34px; }
        }
      `}</style>

      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-header">
            <h1 className="auth-title">
              {isLogin ? <>Welcome <em>Back</em></> : <>Join the <em>Club</em></>}
            </h1>
            <p className="auth-subtitle">
              {isLogin ? "Enter your credentials" : "Create your luxury account"}
            </p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  className="input-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="input-label">Full Name</label>
                  <div className="input-wrapper">
                    <User size={16} className="input-icon" />
                    <input type="text" className="input-field" placeholder="John Doe" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input type="email" className="input-field" placeholder="name@example.com" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <Link href="#" className="forgot-pass">Forgot Password?</Link>
            )}

            <button className="auth-submit">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="auth-or">
            <div className="auth-or-line" />
            <span className="auth-or-text">OR</span>
            <div className="auth-or-line" />
          </div>

          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="auth-switch-btn" onClick={toggleMode}>
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.5 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <ShieldCheck size={12} /> Secure Login
             </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}