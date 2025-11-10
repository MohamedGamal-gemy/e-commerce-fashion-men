// src/components/product-details/VariantSelector.tsx
"use client";

import React from "react";
import type { Variant } from "@/types/product";

export default function VariantSelector({
  variants,
  value,
  onChange,
}: {
  variants: Variant[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <div className="text-sm text-slate-400 mb-2">Color</div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const selected = value === v._id;
          return (
            <button
              key={v._id}
              onClick={() => onChange(v._id)}
              aria-pressed={selected}
              title={v.color.name}
              className={`w-9 h-9 rounded-full flex items-center justify-center ring-offset-2 transition ${
                selected ? "ring-2 ring-sky-400" : "hover:ring-1"
              }`}
              style={{ backgroundColor: v.color.value }}
            />
          );
        })}
      </div>
    </div>
  );
}
