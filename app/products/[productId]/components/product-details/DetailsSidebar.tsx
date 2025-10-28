"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product, VariantImage } from "@/types/product";

export function DetailsSidebar({
  product,
  activeVariant,
  activeSize,
  onAddToCart,
  activeImage,
}: {
  product: Product;
  activeVariant: (typeof product.variants)[0];
  activeSize: string | null;
  onAddToCart: (qty: number) => void;
  activeImage?: VariantImage | null;
}) {
  const [qty, setQty] = React.useState(1);
  const selectedStock = activeVariant.sizes.find((s) => s.size === activeSize)?.stock ?? 0;
  React.useEffect(() => {
    if (qty > selectedStock && selectedStock > 0) setQty(selectedStock);
    if (selectedStock === 0) setQty(1);
  }, [selectedStock]);

  return (
    <Card className="bg-slate-900 border-slate-800 sticky top-8 rounded-2xl overflow-hidden">
      <CardContent className="p-5 space-y-4">
        {/* small variant preview image */}
        <div className="w-full h-40 relative rounded-md overflow-hidden bg-slate-800">
          {activeImage ? (
            <Image src={activeImage.url} alt="variant" fill className="object-contain p-4" />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">No preview</div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <div className="text-sm text-slate-400">{product.subcategory}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">EGP {product.price.toLocaleString()}</div>
          <div className="flex items-center gap-2 text-slate-300">
            <Star size={14} /> <span className="font-medium">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => console.log("wishlist")}
            className="p-2 rounded-md bg-slate-800 hover:bg-slate-700"
            aria-label="add to wishlist"
          >
            <Heart size={16} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1 rounded-md bg-slate-800"
              aria-label="decrease quantity"
            >
              -
            </button>
            <div className="w-10 text-center">{qty}</div>
            <button
              onClick={() => setQty((q) => Math.min(selectedStock || 99, q + 1))}
              className="px-3 py-1 rounded-md bg-slate-800"
              aria-label="increase quantity"
            >
              +
            </button>
          </div>

          <div className="text-sm text-slate-400 ml-auto">{selectedStock} in stock</div>
        </div>

        <Button
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500"
          onClick={() => onAddToCart(qty)}
          disabled={!activeSize || selectedStock <= 0}
        >
          <ShoppingCart size={16} /> Add to cart
        </Button>

        <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
          <Truck size={16} />
          <span>Free delivery for orders over 2000 EGP · 30-day returns</span>
        </div>

        <div className="text-sm text-slate-400 mt-2">
          <div className="font-medium text-slate-200 mb-1">Selected</div>
          <div>
            <span className="text-slate-300">{activeVariant.color.name}</span>
            {activeSize && <span className="text-slate-400">  / {activeSize}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
