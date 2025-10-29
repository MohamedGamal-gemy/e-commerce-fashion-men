// src/components/product-details/ProductSummary.tsx
"use client";

import React, { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product, Variant } from "@/types/product";
import VariantSelector from "./product-details/VariantSelector";
import SizeSelector from "./product-details/SizeSelector";
import { toast } from "sonner";
import { AddToCartInput, useAddToCart } from "@/app/cart/store/cart";

export default function ProductSummary({
  product,
  activeVariant,
  activeSize,
  selectedStock,
  onSelectVariant,
  onSelectSize,
  sessionId,
}: {
  product: Product;
  activeVariant: Variant;
  activeSize: string;
  selectedStock: number;
  sessionId: string | null;
  onSelectVariant: (variantId: string) => void;
  onSelectSize: (size: string) => void;
}) {
  const [qty, setQty] = useState(1);

  const increase = () => setQty((q) => Math.min(q + 1, selectedStock || 99));
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const { addToCart, isAdding } = useAddToCart();

  const handleAddToCart = async () => {
    const payload: AddToCartInput = {
      productId: product._id,
      variantId: activeVariant?._id!,
      size: activeSize!,
      quantity: qty,
      sessionId: sessionId as string,
    };

    // استدعاء الميوتاشن من React Query
    addToCart(payload, {
      onSuccess: () => {
        toast.success("Added to cart successfully!");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to add item to cart.");
      },
    });
  };

  const lowStock = selectedStock > 0 && selectedStock <= 5;

  return (
    // <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6">
    <div className="w-full ">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            {product.title}
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-sm text-slate-300 gap-1">
              <Star size={14} className="text-amber-400" />
              <span>{product.rating ?? 0}</span>
            </div>
            <div className="text-sm text-slate-400">
              • {product.subcategory}
            </div>
          </div>
        </div>

        <button className="p-2 rounded-md hover:bg-slate-800">
          <Heart size={18} />
        </button>
      </div>

      <div className="mt-6">
        <div className="text-3xl font-extrabold">
          {product.price.toLocaleString()} EGP
        </div>
        <div className="text-sm text-slate-400 mt-1">
          VAT included • Free delivery over 2000 EGP
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <VariantSelector
            variants={product.variants}
            value={activeVariant._id}
            onChange={(id) => onSelectVariant(id)}
          />
        </div>

        <div>
          <SizeSelector
            sizes={activeVariant.sizes}
            value={activeSize}
            onChange={(s) => onSelectSize(s)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-800 rounded-md overflow-hidden">
            <button onClick={decrease} className="px-3 py-2">
              -
            </button>
            <div className="px-4 py-2 min-w-[48px] text-center">{qty}</div>
            <button onClick={increase} className="px-3 py-2">
              +
            </button>
          </div>
          <div className="text-sm text-slate-400">{selectedStock} in stock</div>
          {lowStock && (
            <div className="text-sm text-amber-400 font-medium">Low stock</div>
          )}
        </div>

        {/* <Button
          onClick={addToCart}
          disabled={!activeSize || (selectedStock ?? 0) <= 0}
          className={cn(
            "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2",
            !activeSize || (selectedStock ?? 0) <= 0
              ? "bg-slate-700 pointer-events-none"
              : "bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400"
          )}
        >
          <ShoppingCart size={16} />
          Add to cart
        </Button> */}

        <Button
          onClick={handleAddToCart}
          disabled={!activeSize || (selectedStock ?? 0) <= 0 || isAdding}
          className={cn(
            "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200",
            !activeSize || (selectedStock ?? 0) <= 0
              ? "bg-slate-700 pointer-events-none"
              : "bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400"
          )}
        >
          <ShoppingCart size={16} />
          {isAdding ? "Adding..." : "Add to cart"}
        </Button>
      </div>

      <div className="mt-6 text-sm text-slate-400">
        <div className="font-medium text-slate-200 mb-1">Product details</div>
        <p className="leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
