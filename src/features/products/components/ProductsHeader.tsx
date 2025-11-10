"use client";
import React from "react";

export default function ProductsHeader() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="text-center w-full lg:w-auto">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Products</h1>
        <p className="text-slate-400 mt-1 hidden lg:block">Explore our latest collection</p>
      </div>
    </header>
  );
}
