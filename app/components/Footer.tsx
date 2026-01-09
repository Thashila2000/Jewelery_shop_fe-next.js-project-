// components/Footer.tsx
"use client"; // required since we use useState and axios

import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use environment variable for backend API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`,
        { email }
      );
      console.log("Subscribed:", response.data);
      setEmail("");
    } catch (error: any) {
      console.error(
        "Subscription error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <footer className="px-6 pt-12 pb-8 text-white bg-gray-900">
      <div className="grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto sm:grid-cols-2 md:grid-cols-4 md:px-6">
        {/* 🏛️ Branding */}
        <div className="space-y-2 text-left">
          <h3 className="text-lg font-bold">Kandy Jewellery</h3>
          <p className="text-sm text-gray-400">
            Celebrating timeless elegance through handcrafted gold and gemstone
            treasures
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/collections/bridal" className="hover:underline">
                Bridal
              </Link>
            </li>
            <li>
              <Link href="/collections/signature" className="hover:underline">
                Signature
              </Link>
            </li>
            <li>
              <Link href="/collections/gemstones" className="hover:underline">
                Gemstones
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            No. 123, Main Street,
            <br />
            Kandy, Sri Lanka
            <br />
            +94 77 123 4567
            <br />
            info@kandyjewels.lk
          </p>
        </div>

        {/* Follow Us */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Row */}
      <div className="max-w-6xl px-4 mx-auto mt-12 md:px-6">
        <div className="w-full max-w-md">
          <h3 className="mb-2 text-lg font-bold text-white">Newsletter</h3>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-[300px] lg:w-[360px] px-4 py-2 rounded bg-gray-800 text-sm text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              required
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-black px-5 py-2 rounded text-sm font-semibold tracking-wide hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-6 mt-10 text-sm text-center text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} Kandy Jewellery. All rights reserved.
      </div>
    </footer>
  );
}
