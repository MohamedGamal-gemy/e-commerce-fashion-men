"use client";
import React from "react";
import FiltersBar from "./FiltersBar";
import type { ColorOption, ProductType } from "../types";
import { Filter } from "lucide-react";

interface Props {
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

export default function SidebarFilters(props: Props) {
  return (
    // <aside className="hidden lg:block w-full lg:w-auto shrink-0">
    <aside className="hidden xl:block w-[16rem] lg:w-aut shrink- bg-gradient-to-tr to-slate-800
     border-r border-r-slate-600/80 from-slate-950 hover:bg-gradient-to-tl p-4">
      <h2 className="flex items-center gap-2 mb-3 text-2xl">
        Filter{" "}
        <span>
          <Filter className="h-5 w-5" />
        </span>
      </h2>
      <div className="sticky top-6">
        <FiltersBar {...props} />
      </div>
    </aside>
  );
}
