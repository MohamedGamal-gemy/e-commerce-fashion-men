"use client";

import { FilterCheckbox } from "./FilterCheckbox";
import { LayersIcon } from "lucide-react";
import { Subcategory } from "@/types/filter";

interface FiltersSubcategoriesProps {
  subcategories?: Subcategory[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export function FiltersSubcategories({ subcategories = [], selected = [], onToggle }: FiltersSubcategoriesProps) {
  return (
    <div className="space-y-4 bg-slate-500/10 p-4 rounded-md border border-slate-500/40">
      <div className="flex items-center gap-2">
        <LayersIcon className="h-5 w-5 text-blue-400" />
        <h4 className="text-slate-300 text-sm font-semibold">Subcategories</h4>
        <span className="text-slate-500 text-sm">({subcategories.length})</span>
      </div>

      {subcategories.length ? (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {subcategories.map((subcategory) => (
            <FilterCheckbox
              key={subcategory._id}
              id={`subcategory-${subcategory._id}`}
              label={subcategory.name}
              checked={selected.includes(subcategory.name)}
              onCheckedChange={() => onToggle?.(subcategory.name)}
              icon={<LayersIcon className="h-4 w-4" />}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm text-center py-4">No subcategories available</p>
      )}
    </div>
  );
}
