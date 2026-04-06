"use client"; 

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity?: number;
}

export default function SideCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, [isOpen]);

  const removeItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const subtotal = cart.reduce((acc, item) => {
    const cleanPrice = Number(item.price.replace(/[^\d]/g, ""));
    return acc + cleanPrice * (item.quantity || 1);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 z-50 flex flex-col h-full bg-white border-l border-gray-200 shadow-lg w-80"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button onClick={onClose}>
              <FiX className="w-5 h-5 text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-400">
            {cart.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="relative flex items-center p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded"
                  />
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-900">
                      {item.quantity || 1} × ₹{Number(item.price.replace(/[^\d]/g, ""))}
                    </p>
                  </div>
                  <button onClick={() => removeItem(idx)}>
                    <FiX className="w-4 h-4 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Subtotal + Actions */}
          <div className="p-4 space-y-4 border-t border-gray-600">
            <div className="flex justify-between text-base font-bold text-gray-700 text-[20px]">
              <span>Subtotal:</span>
              <span className="text-[#E99246]">₹{subtotal.toLocaleString()}</span>
            </div>

            <hr className="border-t border-gray-600" />

            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push("/cart")}
                className="w-[150px] h-[36px] text-sm bg-[#D4AF37] text-white rounded hover:brightness-110 mx-auto block"
              >
                View Cart
              </button>
              <button
                onClick={() => router.push("/checkout")}
                className="w-[150px] h-[36px] text-sm bg-[#D4AF37] text-white rounded hover:brightness-110 mx-auto block"
              >
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
