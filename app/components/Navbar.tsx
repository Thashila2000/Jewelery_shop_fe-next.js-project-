"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FiShoppingBag, FiSearch, FiUser } from "react-icons/fi";
import SideCart from "./SideCart";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart count from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(stored.length);
  }, [openCart]);

  useEffect(() => {
    const updateCartCount = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(stored.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About Us", path: "/about-us" },
    { name: "Appointment", path: "/appointment" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const NAV_HEIGHT = 80;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-[#f9f7f4]/95 shadow-sm ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
        style={{ height: NAV_HEIGHT }}
      >
        <div className="flex items-center justify-between h-full px-6 sm:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="font-sans text-xl tracking-widest text-gray-800 md:text-2xl"
          >
            Kandy Jewellery
          </Link>

          {/* Desktop Nav */}
          <div className="hidden space-x-8 md:flex">
            {navItems.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className="relative font-sans font-semibold text-black text-medium hover:text-[#EFBA3B] after:block after:h-px after:bg-[#EFBA3B] after:w-0 hover:after:w-full after:transition-all"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="items-center hidden space-x-6 text-gray-800 md:flex">
            <FiSearch className="w-5 h-5 cursor-pointer" />
            <FiUser className="w-5 h-5 cursor-pointer" />

            <button onClick={() => setOpenCart(true)} className="relative">
              <FiShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-2 bg-[#D4AF37] text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Icons + Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <FiUser className="w-5 h-5 text-gray-800" />

            <button onClick={() => setOpenCart(true)} className="relative">
              <FiShoppingBag className="w-5 h-5 text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="p-0 bg-transparent shadow-none outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-white shadow-md md:hidden text-gray-1000">
            <ul className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map(({ name, path }) => (
                <li key={name}>
                  <Link
                    href={path}
                    className="px-2 py-1 text-base font-medium transition-colors rounded hover:bg-[#EFBA3B]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Side Cart */}
      <SideCart isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};

export default Navbar;
