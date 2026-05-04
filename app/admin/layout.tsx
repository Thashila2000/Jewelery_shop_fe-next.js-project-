"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminNav from "@/app/components/AdminNav";

const SIDEBAR_W = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .al-shell { display: flex; min-height: 100vh; background: #f7f5f2; font-family: 'DM Sans', sans-serif;   color: #1a1a1a;  }
        .al-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); z-index: 48; }
        .al-overlay.open { display: block; }

        .al-sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: ${SIDEBAR_W}px; z-index: 50; background: #0e0c0a; display: flex; flex-direction: column; border-right: 1px solid rgba(177,141,43,0.14); transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .al-sidebar::before { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(177,141,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(177,141,43,0.04) 1px, transparent 1px); background-size: 36px 36px; }

        .al-brand { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; padding: 22px 20px 18px; border-bottom: 1px solid rgba(177,141,43,0.1); text-decoration: none; }
        .al-brand-gem { width: 34px; height: 34px; flex-shrink: 0; animation: al-gem 24s linear infinite; }
        @keyframes al-gem { to { transform: rotateY(360deg); } }
        .al-brand-name { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #f0ece4; line-height: 1; display: block; }
        .al-brand-sub { font-size: 8px; letter-spacing: 0.45em; text-transform: uppercase; color: #b18d2b; display: block; margin-top: 2px; }

        .al-nav { position: relative; z-index: 1; flex: 1; overflow-y: auto; padding: 8px 0 12px; scrollbar-width: thin; scrollbar-color: rgba(177,141,43,0.2) transparent; }
        .al-nav::-webkit-scrollbar { width: 3px; }
        .al-nav::-webkit-scrollbar-thumb { background: rgba(177,141,43,0.2); }
        .al-group { padding: 2px 0 6px; }
        .al-group-lbl { font-size: 8px; letter-spacing: 0.48em; text-transform: uppercase; color: rgba(240,236,228,0.18); padding: 8px 20px 4px; display: block; }
        .al-link { display: flex; align-items: center; gap: 10px; padding: 9px 12px 9px 16px; margin: 1px 8px; border-radius: 4px; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.03em; color: rgba(240,236,228,0.38); transition: color 0.25s, background 0.25s; position: relative; }
        .al-link:hover { color: rgba(240,236,228,0.8); background: rgba(255,255,255,0.04); }
        .al-link.active { color: #f0ece4; background: rgba(177,141,43,0.12); border: 1px solid rgba(177,141,43,0.18); }
        .al-link.active::before { content: ''; position: absolute; left: -8px; top: 50%; transform: translateY(-50%); width: 3px; height: 55%; background: #b18d2b; border-radius: 0 2px 2px 0; }
        .al-link-icon { width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: background 0.25s; }
        .al-link:hover .al-link-icon { background: rgba(177,141,43,0.08); }
        .al-link.active .al-link-icon { background: rgba(177,141,43,0.15); color: #d4af37; }
        .al-link-name { flex: 1; }
        .al-link-arrow { color: #b18d2b; flex-shrink: 0; }

        .al-sb-footer { position: relative; z-index: 1; padding: 14px 16px 18px; border-top: 1px solid rgba(177,141,43,0.1); flex-shrink: 0; }
        .al-sb-user { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .al-sb-avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, #b18d2b, #d4af37); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 13px; font-style: italic; color: #1a1a1a; }
        .al-sb-uname { font-size: 11px; font-weight: 500; color: #f0ece4; display: block; }
        .al-sb-urole { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(177,141,43,0.6); display: block; margin-top: 1px; }
        .al-sb-rule { height: 1px; background: rgba(177,141,43,0.1); margin-bottom: 10px; }
        .al-sb-logout { display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: none; cursor: pointer; padding: 8px 10px; border-radius: 4px; font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(220,80,80,0.5); transition: color 0.3s, background 0.3s; }
        .al-sb-logout:hover { color: #e05555; background: rgba(220,80,80,0.06); }

        .al-topbar { position: fixed; top: 0; right: 0; z-index: 40; left: ${SIDEBAR_W}px; height: 64px; background: #ffffff; border-bottom: 1px solid #ece8e1; display: flex; align-items: center; padding: 0 clamp(16px, 3vw, 32px); gap: 16px; }
        .al-hamburger { display: none; flex-shrink: 0; background: none; border: none; cursor: pointer; color: #888; padding: 4px; transition: color 0.2s; }
        .al-hamburger:hover { color: #1a1a1a; }
        .al-topbar-title { flex: 1; min-width: 0; }
        .al-topbar-page { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; font-style: italic; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .al-topbar-crumb { font-size: 10px; color: #bbb; letter-spacing: 0.2em; text-transform: uppercase; }

        .al-search-wrap { position: relative; flex-shrink: 0; }
        .al-search-input { height: 36px; width: 200px; padding: 0 14px 0 36px; border: 1px solid #e8e4de; background: #faf9f6; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 300; color: #1a1a1a; outline: none; border-radius: 2px; transition: border-color 0.3s, width 0.4s, box-shadow 0.3s; }
        .al-search-input:focus { border-color: #b18d2b; width: 260px; box-shadow: 0 0 0 3px rgba(177,141,43,0.08); }
        .al-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #ccc; pointer-events: none; }

        .al-icon-btn { position: relative; width: 36px; height: 36px; border-radius: 2px; background: none; border: 1px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #888; transition: color 0.25s, background 0.25s, border-color 0.25s; flex-shrink: 0; }
        .al-icon-btn:hover { color: #1a1a1a; background: #f5f3ef; border-color: #e8e4de; }
        .al-icon-btn.active { color: #b18d2b; background: rgba(177,141,43,0.08); border-color: rgba(177,141,43,0.2); }
        .al-notif-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; border-radius: 50%; background: #b18d2b; border: 1.5px solid #fff; }

        .al-profile-btn { display: flex; align-items: center; gap: 8px; padding: 4px 10px 4px 4px; border-radius: 2px; background: none; border: 1px solid transparent; cursor: pointer; transition: background 0.25s, border-color 0.25s; }
        .al-profile-btn:hover { background: #f5f3ef; border-color: #e8e4de; }
        .al-profile-btn.active { background: rgba(177,141,43,0.08); border-color: rgba(177,141,43,0.2); }
        .al-profile-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, #b18d2b, #d4af37); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 13px; font-style: italic; color: #1a1a1a; }
        .al-profile-name { font-size: 11px; font-weight: 400; color: #1a1a1a; }
        .al-profile-chevron { color: #bbb; transition: transform 0.3s; }
        .al-profile-btn.active .al-profile-chevron { transform: rotate(180deg); }

        .al-dropdown { position: absolute; top: calc(100% + 8px); right: 0; background: #fff; border: 1px solid #e8e4de; box-shadow: 0 8px 32px rgba(0,0,0,0.1); z-index: 200; min-width: 280px; animation: al-fade-in 0.2s ease; }
        @keyframes al-fade-in { from { opacity:0; transform: translateY(-6px); } }
        .al-dropdown-header { padding: 14px 18px 10px; border-bottom: 1px solid #f0ece6; font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: #b18d2b; }
        .al-notif-item { display: flex; align-items: flex-start; gap: 10px; padding: 12px 18px; border-bottom: 1px solid #f8f5f2; cursor: pointer; transition: background 0.2s; }
        .al-notif-item:hover { background: #faf9f6; }
        .al-notif-bullet { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .al-notif-text { font-size: 12px; font-weight: 300; color: #444; line-height: 1.5; }
        .al-notif-time { font-size: 10px; color: #bbb; margin-top: 2px; }
        .al-profile-menu-item { display: flex; align-items: center; gap: 10px; padding: 11px 18px; border-bottom: 1px solid #f8f5f2; font-size: 12px; font-weight: 300; color: #555; cursor: pointer; transition: background 0.2s; text-decoration: none; }
        .al-profile-menu-item:hover { background: #faf9f6; color: #1a1a1a; }
        .al-profile-menu-item:last-child { border-bottom: none; color: #c0392b; }
        .al-profile-menu-item svg { color: #b18d2b; flex-shrink: 0; }

        .al-main { flex: 1; margin-left: ${SIDEBAR_W}px; padding-top: 64px; min-height: 100vh; }
        .al-content { padding: clamp(20px, 3vw, 36px); max-width: 1400px; }

        @media (max-width: 1024px) {
          .al-sidebar { transform: translateX(-100%); }
          .al-sidebar.open { transform: translateX(0); }
          .al-topbar { left: 0; }
          .al-main { margin-left: 0; }
          .al-hamburger { display: flex; }
          .al-search-input { width: 160px; }
          .al-search-input:focus { width: 200px; }
        }
        @media (max-width: 640px) {
          .al-search-wrap, .al-topbar-title, .al-profile-name { display: none; }
        }
      `}</style>

      <div className="al-shell">
        <AdminNav pathname={pathname} />
        <main className="al-main">
          <div className="al-content">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}