"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import SideCart from "../components/SideCart";


interface NavItem {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About Us", path: "/about-us" },
    { name: "Appointment", path: "/appointment" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  // Define heights for consistent offsets
  const desktopHeight = "80px";
  const scrolledHeight = "64px";
  const currentHeight = scrolled ? scrolledHeight : desktopHeight;

  return (
    <>
      {/* 1. BLUR OVERLAY - Starts below the Navbar */}
      <div
        className={`fixed inset-0 z-[55] bg-black/20 backdrop-blur-md transition-opacity duration-500 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: currentHeight }} 
        onClick={() => setMenuOpen(false)}
      />

      {/* 2. MAIN NAVBAR */}
      <nav
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-md h-16" : "bg-[#f9f7f4] h-20"
        }`}
      >
        <div className="flex items-center justify-between h-full px-6 mx-auto max-w-7xl sm:px-10">
          
          {/* Toggle Button */}
          <button
            className="p-2 -ml-2 md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-900 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800 transition-transform duration-300" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase text-gray-900 md:text-2xl">
            Kandy <span className="font-light">Jewelry</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden space-x-10 md:flex">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className={`text-xs font-semibold tracking-widest uppercase hover:text-[#D4AF37] ${
                  pathname === path ? "text-[#D4AF37]" : "text-gray-600"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <User className="w-5 h-5 text-gray-700 cursor-pointer hover:text-[#D4AF37]" />
            <button onClick={() => setOpenCart(true)} className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. LEFT SIDEBAR DRAWER - Slides from left, sits under navbar */}
      <aside
        className={`fixed left-0 z-[60] w-[280px] h-screen bg-white shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden border-r border-gray-100 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: currentHeight }}
      >
        <div className="flex flex-col h-full py-10 px-8">
          <nav className="flex-1">
            <ul className="space-y-8">
              {navItems.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    href={path}
                    className={`block text-sm font-medium tracking-[0.2em] uppercase transition-colors ${
                      pathname === path ? "text-[#D4AF37]" : "text-gray-800"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pb-24">
            <Link 
              href="/appointment" 
              className="block w-full py-4 bg-[#1a1a1a] text-white text-center text-[10px] tracking-[0.2em] uppercase font-bold rounded-sm shadow-lg hover:bg-[#D4AF37] transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </aside>

      {/* Side Cart */}
      <SideCart isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};

export default Navbar;