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

  useEffect(() => {
    setSidebarOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const notifications = [
    { text: "New order #ORD-0085 received",      time: "2 min ago",    dot: "#b18d2b" },
    { text: "Appointment request from Sarah M.",  time: "18 min ago", dot: "#6366f1" },
    { text: "Low stock: Pavé Band (3 left)",      time: "1 hr ago",    dot: "#ef4444" },
    { text: "New review on Eternal Solitaire",    time: "3 hr ago",    dot: "#22c55e" },
  ];

  return (
    <>
      <div className={`al-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

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
            <span className="al-brand-name">Kandy</span>
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

      <header className="al-topbar">
        <button className="al-hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
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
          <input className="al-search-input" placeholder="Search products, orders…"
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>

        <div style={{ position: "relative" }}>
          <button className={`al-icon-btn ${notifOpen ? "active" : ""}`}
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}>
            <Bell size={16} />
            <span className="al-notif-dot" />
          </button>
          {notifOpen && (
            <div className="al-dropdown">
              <div className="al-dropdown-header">Notifications</div>
              {notifications.map((n, i) => (
                <div key={i} className="al-notif-item">
                  <span className="al-notif-bullet" style={{ background: n.dot }} />
                  <div>
                    <div className="al-notif-text">{n.text}</div>
                    <div className="al-notif-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <button className={`al-profile-btn ${profileOpen ? "active" : ""}`}
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}>
            <div className="al-profile-avatar">A</div>
            <span className="al-profile-name">Admin</span>
            <ChevronDown size={13} className="al-profile-chevron" />
          </button>
          {profileOpen && (
            <div className="al-dropdown" style={{ minWidth: 200 }}>
              <div className="al-dropdown-header">My Account</div>
              <Link href="/admin/settings" className="al-profile-menu-item">
                <User size={13} /> Profile Settings
              </Link>
              <Link href="/admin/settings" className="al-profile-menu-item">
                <Settings size={13} /> Preferences
              </Link>
              <div className="al-profile-menu-item" style={{ color: "#c0392b" }}>
                <LogOut size={13} /> Sign Out
              </div>
            </div>
          )}
        </div>
      </header>

      <style jsx global>{`
        /* Visibility and Clarity Improvements */
        .al-link {
          color: rgba(240, 236, 224, 0.6) !important; /* Brighter default text */
          font-weight: 500 !important; /* Clearer weight */
          font-size: 13px !important;
          letter-spacing: 0.02em;
        }

        .al-link:hover {
          color: #f0ece4 !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .al-link.active {
          color: #f0ece4 !important;
          background: rgba(177, 141, 43, 0.15) !important;
          border-right: 2px solid #b18d2b;
        }

        .al-group-lbl {
          color: rgba(177, 141, 43, 0.5) !important; /* Gold-tinted labels for better hierarchy */
          font-weight: 600 !important;
          font-size: 10px !important;
          letter-spacing: 0.15em !important;
          margin-top: 10px;
        }

        .al-link-icon {
          color: inherit;
          opacity: 0.8;
        }

        .al-link.active .al-link-icon {
          color: #b18d2b;
          opacity: 1;
        }
      `}</style>
    </>
  );
}