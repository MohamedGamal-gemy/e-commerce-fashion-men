"use client";
import React from "react";
import FiltersBar from "./FiltersBar";
import type { ColorOption, ProductType } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  search: string;
  setSearch: (v: string) => void;
  productTypes: ProductType[];
  colors: ColorOption[];
  selectedProductTypeNames: string[];
  selectedColorValues: string[];
  onToggleProductType: (name: string) => void;
  onToggleColor: (value: string) => void;
  onClearAll?: () => void;
}

export default function MobileFiltersSheet({ open, onClose, ...props }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm " onClick={onClose} />
      <div className="w-xs absolute top-0  bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800  p-4 max-h-[100vh]
       overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-200 font-medium">Filters</h3>
          <button className="text-slate-400 hover:text-slate-200" onClick={onClose}>Close</button>
        </div>
        <FiltersBar {...props} />
      </div>
    </div>
  );
}
