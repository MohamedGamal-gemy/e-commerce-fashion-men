"use client";

import Image from "next/image";
import { ProductVariant } from "@/types/productList";

interface VariantStripProps {
  variants: ProductVariant[];
  activeIndex: number;
  onSelect: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  onHoverStart?: () => void;
}

export function VariantStrip({ variants, activeIndex, onSelect, onHoverStart }: VariantStripProps) {
  return (
    <div
      onMouseEnter={onHoverStart}
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 
      bg-slate-950/60 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-800 shadow-sm"
    >
      {variants.map((v, i) => (
        <button
          key={v._id}
          onClick={(e) => onSelect(i, e)}
          className={`relative w-9 h-9 rounded-full overflow-hidden transition-all duration-300 ${
            activeIndex === i
              ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-slate-900 shadow-sm"
              : "opacity-80 hover:opacity-100 hover:ring-1 hover:ring-slate-700"
          }`}
        >
          <Image
            src={v.mainImage || "/placeholder.png"}
            alt={v.color}
            fill
            className="object-cover object-top"
          />
        </button>
      ))}
    </div>
  );
}


