// app/(store)/layout.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "./context/CartContext";

/**
 * StoreLayout wraps all customer-facing pages (Home, Collections, Product Details).
 * It provides the CartContext specifically to the store side of the application,
 * ensuring the Admin dashboard remains lightweight and isolated.
 */
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {/* The Navbar will now correctly find the CartContext */}
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Footer is also wrapped in case it displays cart summaries or links */}
        <Footer />
      </div>
    </CartProvider>
  );
}