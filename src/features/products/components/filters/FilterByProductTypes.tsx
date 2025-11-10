"use client";
import React from "react";
import { Tags, Check } from "lucide-react";
import type { ProductType } from "../../types";

interface Props {
  productTypes: ProductType[];
  selectedNames: string[];
  onToggle: (name: string) => void;
}

export default function FilterByProductTypes({ productTypes, selectedNames, onToggle }: Props) {
  const list = Array.isArray(productTypes) ? productTypes : [];
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
      <div className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-medium">
        <Tags className="h-4 w-4 text-slate-400" />
        Product Types
      </div>
      <div className="flex flex-col gap-2">
        {list.filter(t => t.name).map((t) => {
          const checked = selectedNames.includes(t.name!);
          return (
            <label key={t._id || t.name} className={`inline-flex items-center gap-2 px-3 py-1.5 
              rounded-md border text-xs cursor-pointer select-none ${checked ? "border-slate-700 bg-slate-700/60 text-blue-200" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
              onClick={() => onToggle(t.name!)}
            >
              <span className={`h-4 w-4 rounded-sm border ${checked ? "bg-slate-500 border-slate-500" : "border-slate-600"}`}>
                {checked && <Check className="h-4 w-4 text-white" />}
              </span>
              {t.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
