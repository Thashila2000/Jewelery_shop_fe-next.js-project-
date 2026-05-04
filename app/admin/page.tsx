"use client";

import React from "react";
import dynamic from "next/dynamic";
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, Globe, MapPin 
} from "lucide-react";
import { LatLngExpression } from "leaflet";

// Dynamically import Leaflet components with proper type casting
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function DashboardPage() {
  const stats = [
    { label: "Total Revenue", value: "$42,850", change: "+12.5%", trendingUp: true, icon: DollarSign },
    { label: "Active Orders", value: "156", change: "+4.2%", trendingUp: true, icon: ShoppingBag },
    { label: "Total Customers", value: "2,420", change: "+18.1%", trendingUp: true, icon: Users },
    { label: "Avg. Order Value", value: "$275", change: "-2.4%", trendingUp: false, icon: TrendingUp },
  ];

  // Mock data for the map with explicit LatLngExpression types
  const locations = [
    { id: 1, name: "London Hub", coords: [51.505, -0.09] as LatLngExpression, orders: 45 },
    { id: 2, name: "NYC Showroom", coords: [40.7128, -74.006] as LatLngExpression, orders: 82 },
    { id: 3, name: "Paris Boutique", coords: [48.8566, 2.3522] as LatLngExpression, orders: 31 },
  ];

  // Map center point
  const mapCenter: LatLngExpression = [30, 0];

  return (
    <div className="al-dashboard-fade">
      {/* Import Leaflet CSS directly */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <style>{`
        .al-dashboard-fade { animation: al-page-fade 0.4s ease-out; }
        @keyframes al-page-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .al-card { 
          background: #ffffff; 
          border: 1px solid #d1ccc0; 
          padding: 24px; 
          border-radius: 4px; 
          transition: border-color 0.3s, box-shadow 0.3s; 
        }
        .al-card:hover { border-color: #b18d2b; box-shadow: 0 10px 30px -15px rgba(177,141,43,0.2); }
        
        .al-stat-icon { width: 42px; height: 42px; border-radius: 8px; background: #faf9f6; display: flex; align-items: center; justify-content: center; color: #b18d2b; margin-bottom: 16px; border: 1px solid #f0ece6; }
        .al-grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px; }
        
        .al-map-wrapper { height: 300px; width: 100%; border-radius: 4px; overflow: hidden; margin-top: 15px; border: 1px solid #ece8e1; position: relative; z-index: 1; }
        
        .al-table-card { overflow-x: auto; }
        .al-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .al-table th { text-align: left; padding: 12px 16px; border-bottom: 2px solid #b18d2b; color: #1a1a1a; font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; }
        .al-table td { padding: 16px; border-bottom: 1px solid #f0ece6; color: #1a1a1a; font-weight: 500; }
        
        .al-title { color: #111111; font-weight: 700; }
        .al-label-bold { color: #555555; font-weight: 700; letter-spacing: 0.05em; }

        /* Ensure Leaflet doesn't clash with KANDY styles */
        .leaflet-container { font-family: 'DM Sans', sans-serif !important; }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif italic al-title mb-1">Portfolio Insights</h2>
        <p className="text-sm al-label-bold uppercase tracking-widest">Real-time store performance & logistics</p>
      </div>

      {/* Stats Grid */}
      <div className="al-grid-stats">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="al-card">
              <div className="al-stat-icon"><Icon size={20} strokeWidth={2} /></div>
              <p className="text-xs al-label-bold uppercase mb-2">{stat.label}</p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span
                  className="text-sm font-bold flex items-center mb-1"
                  style={{ color: stat.trendingUp ? "#15803d" : "#b91c1c" }}
                >
                  {stat.trendingUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 al-card">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl italic al-title flex items-center gap-2">
              <Globe size={20} className="text-[#b18d2b]" /> Customer Geography
            </h3>
            <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-1 rounded">LIVE TRACKING</span>
          </div>
          <div className="al-map-wrapper">
            <MapContainer 
              center={mapCenter} 
              zoom={2} 
              scrollWheelZoom={false} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              {locations.map(loc => (
                <Marker key={loc.id} position={loc.coords}>
                  <Popup>
                    <div className="font-sans">
                      <strong className="text-gray-900">{loc.name}</strong><br/>
                      <span className="text-[#b18d2b] font-bold">{loc.orders} active orders</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="al-card flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl italic al-title mb-6">Market Share</h3>
            <div className="space-y-4">
              {locations.map(loc => (
                <div key={loc.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#b18d2b]" />
                    <span className="font-bold text-gray-700 text-sm">{loc.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{loc.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-4">International shipping is performing 15% above target.</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 al-card al-table-card">
          <h3 className="font-serif text-xl italic al-title mb-6">Latest Transactions</h3>
          <table className="al-table">
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
                <td className="font-bold">#ORD-0085</td>
                <td className="font-bold">Sarah Jenkins</td>
                <td className="italic">Eternal Solitaire</td>
                <td className="font-bold">$1,200</td>
                <td><span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full uppercase">Processing</span></td>
              </tr>
              <tr>
                <td className="font-bold">#ORD-0084</td>
                <td className="font-bold">Michael Ross</td>
                <td className="italic">Pavé Gold Band</td>
                <td className="font-bold">$850</td>
                <td><span className="text-[10px] font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase">Shipped</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="al-card">
          <h3 className="font-serif text-xl italic al-title mb-6">Traffic Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase mb-1">
              <span>Goal Progress</span>
              <span>75%</span>
            </div>
            <div className="h-2 bg-gray-100 w-full rounded-full overflow-hidden mb-4">
              <div className="h-full bg-[#b18d2b] transition-all duration-1000" style={{ width: "75%" }}></div>
            </div>
          </div>
          <p className="text-sm text-gray-700 font-medium">Store traffic is up <span className="text-green-700 font-bold">12%</span> compared to last week.</p>
        </div>
      </div>
    </div>
  );
}
