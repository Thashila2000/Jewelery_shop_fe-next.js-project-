"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Gem, ShoppingBag, Users, Settings, LogOut,
  Calendar, Tag, Star, BarChart2, MessageSquare, Package,
  ChevronRight, Menu, X, Bell, Search, User,
  ChevronDown,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard",     href: "/admin",             icon: LayoutDashboard },
      { name: "Analytics",     href: "/admin/analytics",     icon: BarChart2 },
    ],
  },
  {
    label: "Catalogue",
    items: [
      { name: "Products",      href: "/admin/products",      icon: Gem },
      { name: "Collections",   href: "/admin/collections",   icon: Package },
      { name: "Promotions",    href: "/admin/promotions",    icon: Tag },
    ],
  },
  {
    label: "Commerce",
    items: [
      { name: "Orders",        href: "/admin/orders",        icon: ShoppingBag },
      { name: "Customers",     href: "/admin/customers",     icon: Users },
      { name: "Reviews",       href: "/admin/reviews",       icon: Star },
    ],
  },
  {
    label: "Services",
    items: [
      { name: "Appointments",  href: "/admin/appointments",  icon: Calendar },
      { name: "Enquiries",     href: "/admin/enquiries",     icon: MessageSquare },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings",      href: "/admin/settings",      icon: Settings },
    ],
  },
];

export default function AdminNav({ pathname }: { pathname: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Close everything when navigating
  useEffect(() => {
    setSidebarOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const notifications = [
    { text: "New order #ORD-0085 received",      time: "2 min ago",     dot: "#b18d2b" },
    { text: "Appointment request from Sarah M.",  time: "18 min ago", dot: "#6366f1" },
    { text: "Low stock: Pavé Band (3 left)",      time: "1 hr ago",     dot: "#ef4444" },
    { text: "New review on Eternal Solitaire",    time: "3 hr ago",     dot: "#22c55e" },
  ];

  return (
    <>
      {/* 1. Mobile Sidebar Overlay */}
      <div className={`al-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* 2. Global Dropdown Backdrop (Mobile Only) */}
      {(notifOpen || profileOpen) && (
        <div className="al-dropdown-backdrop" onClick={() => { setNotifOpen(false); setProfileOpen(false); }} />
      )}

      {/* 3. Sidebar */}
      <aside className={`al-sidebar ${sidebarOpen ? "open" : ""}`}>
        <Link href="/admin" className="al-brand">
          <div className="al-brand-gem">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16,2 30,11 30,21 16,30 2,21 2,11" stroke="#b18d2b" strokeWidth="1.2" fill="rgba(177,141,43,0.08)" />
              <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" stroke="#b18d2b" strokeWidth="0.7" fill="none" />
              <line x1="16" y1="2"  x2="16" y2="30" stroke="#b18d2b" strokeWidth="0.4" />
              <line x1="2"  y1="11" x2="30" y2="21" stroke="#b18d2b" strokeWidth="0.4" />
              <line x1="2"  y1="21" x2="30" y2="11" stroke="#b18d2b" strokeWidth="0.4" />
            </svg>
          </div>
          <div className="al-brand-label">
            <span className="al-brand-name">Kandy Jewelry</span>
            <span className="al-brand-sub">Admin Console</span>
          </div>
        </Link>

        <nav className="al-nav">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="al-group">
              <span className="al-group-lbl">{group.label}</span>
              {group.items.map(item => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link key={item.name} href={item.href}
                    className={`al-link ${active ? "active" : ""}`}
                    onClick={() => setSidebarOpen(false)}>
                    <span className="al-link-icon"><Icon size={15} strokeWidth={active ? 2.5 : 2} /></span>
                    <span className="al-link-name">{item.name}</span>
                    {active && <ChevronRight size={11} className="al-link-arrow" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* 4. Top Header */}
      <header className="al-topbar">
        <button className="al-hamburger" onClick={() => setSidebarOpen(o => !o)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="al-topbar-title">
          <div className="al-topbar-crumb">Admin / {pathname.split("/").filter(Boolean).slice(-1)[0] || "dashboard"}</div>
          <div className="al-topbar-page">
            {NAV_GROUPS.flatMap(g => g.items).find(i => i.href === pathname)?.name ?? "Dashboard"}
          </div>
        </div>

        <div className="al-search-wrap">
          <Search size={13} className="al-search-icon" />
          <input className="al-search-input" placeholder="Search..."
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>

        <div className="al-actions">
          {/* Notifications */}
          <div className="al-action-btn-wrapper">
            <button className={`al-icon-btn ${notifOpen ? "active" : ""}`}
              onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}>
              <Bell size={16} />
              <span className="al-notif-dot" />
            </button>
            {notifOpen && (
              <div className="al-dropdown al-dropdown-notif">
                <div className="al-dropdown-header">Notifications</div>
                <div className="al-dropdown-body">
                  {notifications.map((n, i) => (
                    <div key={i} className="al-notif-item">
                      <span className="al-notif-bullet" style={{ background: n.dot }} />
                      <div style={{ flex: 1 }}>
                        <div className="al-notif-text">{n.text}</div>
                        <div className="al-notif-time">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="al-action-btn-wrapper">
            <button className={`al-profile-btn ${profileOpen ? "active" : ""}`}
              onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}>
              <div className="al-profile-avatar">A</div>
              <span className="al-profile-name">Admin</span>
              <ChevronDown size={13} className="al-profile-chevron" />
            </button>
            {profileOpen && (
              <div className="al-dropdown al-dropdown-profile">
                <div className="al-dropdown-header">My Account</div>
                <div className="al-dropdown-body">
                  
               
                  <div className="al-menu-item logout" style={{ borderTop: "1px solid #f3f4f6", marginTop: "4px" }}>
                    <LogOut size={14} /> Sign Out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <style jsx global>{`
        /* Fix the header container if it has overflow: hidden */
        .al-topbar {
          display: flex;
          align-items: center;
          height: 64px;
          background: white;
          padding: 0 20px;
          border-bottom: 1px solid #f3f4f6;
          position: sticky;
          top: 0;
          z-index: 50; /* Ensure this is high enough */
          overflow: visible !important; /* CRITICAL */
        }

        .al-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }

        .al-action-btn-wrapper {
          position: relative;
        }

        /* Standard Dropdown Appearance */
        .al-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15);
          z-index: 99999; /* Higher than everything else */
          overflow: hidden;
          animation: al-drop-in 0.2s ease-out;
        }

        .al-dropdown-notif { width: 320px; }
        .al-dropdown-profile { width: 220px; }

        @keyframes al-drop-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 📱 MOBILE VIEW: Viewport-Aware Positioning */
        @media (max-width: 768px) {
          .al-dropdown-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.1);
            z-index: 99998;
          }

          .al-dropdown {
            position: fixed !important; /* Move to fixed space */
            top: 70px !important;
            right: 12px !important;
            left: 12px !important;
            width: auto !important;
            max-width: calc(100vw - 24px) !important;
            margin: 0 auto;
          }

          /* Profile menu doesn't need to be full width even on mobile */
          .al-dropdown-profile {
            left: auto !important;
            width: 220px !important;
          }
        }

        .al-dropdown-header {
          padding: 14px 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          background: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }

        .al-dropdown-body { max-height: 420px; overflow-y: auto; }

        .al-notif-item {
          display: flex; gap: 12px; padding: 14px 16px;
          border-bottom: 1px solid #f9fafb; transition: background 0.2s;
        }
        .al-notif-item:hover { background: #fcfbf8; }
        .al-notif-bullet { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
        .al-notif-text { font-size: 13px; color: #1f2937; font-weight: 500; line-height: 1.4; }
        .al-notif-time { font-size: 11px; color: #9ca3af; margin-top: 4px; }

        .al-menu-item {
          display: flex; align-items: center; gap: 10px; padding: 12px 16px;
          font-size: 13px; font-weight: 500; color: #4b5563; text-decoration: none;
          transition: all 0.2s;
        }
        .al-menu-item:hover { background: #fcfbf8; color: #b18d2b; }
        .al-menu-item.logout { color: #dc2626; cursor: pointer; }

        /* Sidebar Visibility and Aesthetics */
        .al-link {
          color: rgba(240, 236, 224, 0.6) !important;
          font-weight: 500 !important;
          font-size: 13px !important;
        }
        .al-link.active {
          color: #f0ece4 !important;
          background: rgba(177, 141, 43, 0.15) !important;
          border-right: 3px solid #b18d2b;
        }
        .al-group-lbl {
          color: rgba(177, 141, 43, 0.5) !important;
          font-weight: 600 !important;
          font-size: 10px !important;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 18px 20px 6px;
          display: block;
        }
      `}</style>
    </>
  );
}