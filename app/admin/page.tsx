"use client";

import React from "react";
import dynamic from "next/dynamic";
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, Globe, MapPin
} from "lucide-react";
import { LatLngExpression } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import("react-leaflet").then((mod) => mod.Marker),       { ssr: false });
const Popup        = dynamic(() => import("react-leaflet").then((mod) => mod.Popup),        { ssr: false });

export default function DashboardPage() {
  const stats = [
    { label: "Total Revenue",    value: "$42,850", change: "+12.5%", trendingUp: true,  icon: DollarSign },
    { label: "Active Orders",    value: "156",     change: "+4.2%",  trendingUp: true,  icon: ShoppingBag },
    { label: "Total Customers",  value: "2,420",   change: "+18.1%", trendingUp: true,  icon: Users },
    { label: "Avg. Order Value", value: "$275",    change: "-2.4%",  trendingUp: false, icon: TrendingUp },
  ];

  const locations = [
    { id: 1, name: "London Hub",     coords: [51.505,  -0.09 ] as LatLngExpression, orders: 45 },
    { id: 2, name: "NYC Showroom",   coords: [40.7128, -74.006] as LatLngExpression, orders: 82 },
    { id: 3, name: "Paris Boutique", coords: [48.8566,  2.3522] as LatLngExpression, orders: 31 },
  ];

  const mapCenter: LatLngExpression = [30, 0];

  return (
    <div className="al-dashboard-fade" style={{ padding: "24px 16px" }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      <style>{`
        .al-dashboard-fade { animation: al-page-fade 0.4s ease-out; }
        @keyframes al-page-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Card — matches products page style ── */
        .db-card {
          background: #ffffff;
          border: 0.5px solid #e8e3d8;
          border-radius: 12px;
          padding: 16px 18px;
          transition: border-color 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 140px; /* Ensures uniform height */
        }
        .db-card:hover {
          border-color: #b18d2b;
          box-shadow: 0 6px 28px rgba(177,141,43,0.12);
        }

        /* ── Stat card icon box ── */
        .db-stat-icon {
          width: 34px; height: 34px; border-radius: 8px;
          background: #faf8f3; border: 0.5px solid #ede8db;
          display: flex; align-items: center; justify-content: center;
          color: #b18d2b; margin-bottom: 8px;
          flex-shrink: 0;
        }

        /* ── Grid adjustment for 2x2 on Mobile ── */
        .db-grid-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr); 
          gap: 10px;
          margin-bottom: 28px;
          align-items: stretch; /* Forces children to match height */
        }

        @media (min-width: 768px) {
          .db-grid-stats {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }
        }

        .db-map-wrapper {
          height: 300px; width: 100%; border-radius: 8px;
          overflow: hidden; margin-top: 14px;
          border: 0.5px solid #ede8db; position: relative; z-index: 1;
        }

        .db-table-wrap { overflow-x: auto; }
        .db-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .db-table th {
          text-align: left; padding: 10px 14px;
          border-bottom: 0.5px solid #b18d2b;
          color: #a08c5b; font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
        }
        .db-table td {
          padding: 14px; border-bottom: 0.5px solid #ede8db;
          color: #1a1109; font-weight: 500; font-size: 13px;
        }

        .db-section-title {
          font-size: 13px; font-weight: 700; color: #1a1109;
          margin: 0 0 16px; letter-spacing: -0.01em;
        }

        .leaflet-container { font-family: 'DM Sans', sans-serif !important; }

        @media (max-width: 480px) {
          .db-stat-value { font-size: 18px !important; }
          .db-stat-label { font-size: 9px !important; line-height: 1.2; }
          .db-card { padding: 12px; min-height: 130px; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ transform: "translateY(-10px)" }}>
          <h1 style={{
            fontSize: 31, fontWeight: 750, color: "#1a1109",
            margin: 0, letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "sans-serif",
          }}>
            Portfolio Insights
          </h1>
          <p style={{
            fontSize: 12, fontWeight: 800, color: "#b18d2b",
            letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6,
          }}>
            Real-time store performance & logistics
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="db-grid-stats">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="db-card">
              <div>
                <div className="db-stat-icon"><Icon size={16} strokeWidth={2} /></div>
                <p className="db-stat-label" style={{ 
                  fontSize: 10, fontWeight: 700, color: "#a08c5b", 
                  textTransform: "uppercase", letterSpacing: "0.12em", 
                  margin: "0 0 4px", display: "-webkit-box", WebkitLineClamp: 1, 
                  WebkitBoxOrient: "vertical", overflow: "hidden" 
                }}>
                  {stat.label}
                </p>
              </div>
              
              <div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, flexWrap: "wrap" }}>
                  <span className="db-stat-value" style={{ fontSize: 22, fontWeight: 700, color: "#b18d2b", lineHeight: 1 }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, marginBottom: 1,
                    color: stat.trendingUp ? "#166534" : "#be123c",
                    display: "flex", alignItems: "center", gap: 1,
                  }}>
                    {stat.trendingUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {stat.change}
                  </span>
                </div>
                <p style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
                  vs last month
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Map + Market Share ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 12 }}>
        <div className="db-card" style={{ gridColumn: "span 2", minHeight: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="db-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Globe size={16} color="#b18d2b" /> Customer Geography
            </p>
            <span style={{
              fontSize: 9, fontWeight: 800, background: "#f0fdf4", color: "#166534",
              border: "0.5px solid #bbf7d0", padding: "3px 8px", letterSpacing: "0.1em",
              textTransform: "uppercase", borderRadius: 4,
            }}>
              Live Tracking
            </span>
          </div>
          <div className="db-map-wrapper">
            <MapContainer center={mapCenter} zoom={2} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {locations.map(loc => (
                <Marker key={loc.id} position={loc.coords}>
                  <Popup>
                    <div>
                      <strong style={{ color: "#1a1109" }}>{loc.name}</strong><br />
                      <span style={{ color: "#b18d2b", fontWeight: 700 }}>{loc.orders} active orders</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="db-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "auto" }}>
          <div>
            <p className="db-section-title">Market Share</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {locations.map(loc => (
                <div key={loc.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "0.5px solid #ede8db" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={13} color="#b18d2b" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1109" }}>{loc.name}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#a08c5b" }}>{loc.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 11, color: "#999", fontStyle: "italic", marginTop: 14 }}>
            International shipping is performing 15% above target.
          </p>
        </div>
      </div>

      {/* ── Transactions + Traffic ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <div className="db-card db-table-wrap" style={{ gridColumn: "span 2", minHeight: "auto" }}>
          <p className="db-section-title">Latest Transactions</p>
          <table className="db-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: "#b18d2b" }}>#ORD-0085</td>
                <td style={{ fontWeight: 600 }}>Sarah Jenkins</td>
                <td style={{ color: "#a08c5b" }}>Eternal Solitaire</td>
                <td style={{ fontWeight: 700 }}>$1,200</td>
                <td>
                  <span style={{ fontSize: 9, fontWeight: 800, background: "#fffbeb", color: "#92400e", border: "0.5px solid #fde68a", padding: "3px 8px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>
                    Processing
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: "#b18d2b" }}>#ORD-0084</td>
                <td style={{ fontWeight: 600 }}>Michael Ross</td>
                <td style={{ color: "#a08c5b" }}>Pavé Gold Band</td>
                <td style={{ fontWeight: 700 }}>$850</td>
                <td>
                  <span style={{ fontSize: 9, fontWeight: 800, background: "#f0fdf4", color: "#166534", border: "0.5px solid #bbf7d0", padding: "3px 8px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>
                    Shipped
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="db-card" style={{ minHeight: "auto" }}>
          <p className="db-section-title">Traffic Analysis</p>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#a08c5b", textTransform: "uppercase", letterSpacing: "0.12em" }}>Goal Progress</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#b18d2b" }}>75%</span>
            </div>
            <div style={{ height: 6, background: "#faf8f3", borderRadius: 99, overflow: "hidden", border: "0.5px solid #ede8db" }}>
              <div style={{ height: "100%", width: "75%", background: "#b18d2b", borderRadius: 99, transition: "width 1s ease" }} />
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#1a1109", fontWeight: 500 }}>
            Store traffic is up{" "}
            <span style={{ color: "#166534", fontWeight: 700 }}>12%</span>{" "}
            compared to last week.
          </p>
        </div>
      </div>
    </div>
  );
}