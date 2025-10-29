"use client";

import { Variant } from "@/types/product";


interface ProductVariantsProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  onSelectVariant: (variant: Variant) => void;
  mode?: "admin" | "user";
}

export function ProductVariants({
  variants,
  selectedVariant,
  selectedSize,
  onSelectSize,
  onSelectVariant,
  mode = "user",
}: ProductVariantsProps) {
  return (
    <div className="-mt-3">
      <h3 className="text-slate-100 font-medium mb-3">Variants</h3>

      {/* 🎨 Colors */}
      {variants?.length ? (
        <div className="flex flex-wrap gap-3 mb-5">
          {variants.map((variant) => (
            <button
              key={variant._id}
              onClick={() => onSelectVariant(variant)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition ${
                selectedVariant?._id === variant._id
                  ? "border-sky-500 bg-sky-500/10"
                  : "border-slate-700 hover:border-sky-700"
              }`}
            >
              <span
                className="inline-block w-4 h-4 rounded-full border border-slate-600"
                style={{ backgroundColor: variant.color?.value }}
              ></span>
              <span className="text-slate-300 text-sm">
                {variant.color?.name || "Unnamed"}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm">No variants found.</p>
      )}

      {/* 📏 Sizes */}
      {selectedVariant?.sizes?.length ? (
        <div className="flex flex-wrap gap-2">
          {selectedVariant.sizes.map((s, i) => {
            const isSelected = selectedSize === s.size;
            return (
              <button
                key={i}
                onClick={() => onSelectSize(s.size)}
                disabled={mode === "admin" ? false : s.stock <= 0}
                className={`px-3 py-1 text-sm rounded-md border transition 
                  ${
                    isSelected
                      ? "bg-sky-600/20 border-sky-500 text-sky-300"
                      : "border-slate-700 text-slate-300 hover:border-sky-700"
                  } 
                  ${s.stock <= 0 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {mode === "admin" ? `${s.size}: ${s.stock}` : s.size}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
