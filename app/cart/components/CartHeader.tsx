"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartHeader({ itemsCount = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 mb-6 shadow-md"
    >
      {/* 🛍️ Left side */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Your Shopping Cart
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {itemsCount > 0
            ? `${itemsCount} item${itemsCount > 1 ? "s" : ""} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {/* ↩️ Right side */}
      <Link
        href="/products/men"
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      >
        <ArrowLeft size={18} />
        Continue Shopping
      </Link>
    </motion.div>
  );
}
