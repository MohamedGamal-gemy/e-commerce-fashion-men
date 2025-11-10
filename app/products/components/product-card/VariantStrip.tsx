"use client";

import Image from "next/image";
import { ProductVariant } from "@/types/productList";

interface VariantStripProps {
  variants: ProductVariant[];
  activeIndex: number;
  onSelect: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  onHoverStart?: () => void;
}

export function VariantStrip({
  variants,
  activeIndex,
  onSelect,
  onHoverStart,
}: VariantStripProps) {
  return (
    <div
      onMouseEnter={onHoverStart}
      //   className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2
      //   bg-slate-950/60 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-800 shadow-sm"
      // >
      className="flex items-center gap-3 
        rounded-full  shadow-sm"
    >
      {variants.map((v, i) => (
        <button
          key={v._id}
          onClick={(e) => onSelect(i, e)}
          className={`relative w-9 h-9 rounded overflow-hidden transition-all duration-300 ${
            activeIndex === i ? "ring-1 ring-sky-500  shadow-sm" : "  "
          }`}
        >
          <Image
            src={v.previewImage || "/placeholder.png"}
            alt={v.color.name}
            fill
            className="object-cover object-top"
          />
        </button>
      ))}
    </div>
  );
}
