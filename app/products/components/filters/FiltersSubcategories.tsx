"use client";

import { Layers, LucideShirt, Shirt } from "lucide-react";
import { FilterCheckbox } from "./FilterCheckbox";
import { Subcategory } from "@/types/filter";

interface FiltersSubcategoriesProps {
  subcategories?: Subcategory[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export const FiltersSubcategories: React.FC<FiltersSubcategoriesProps> = ({
  subcategories = [],
  selected = [],
  onToggle,
}) => {
  return (
    <section aria-labelledby="subcategories-heading" className="space-y-3 w-52">
      <div className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-emerald-400" />
        <h4 id="subcategories-heading" className="text-sm font-semibold text-slate-200">
          Subcategories
        </h4>
        <span className="text-sm text-slate-400">({subcategories.length})</span>
      </div>
      {subcategories.length ? (
        <div className="space-y-2  ">
          {subcategories.map((sc) => (
            <FilterCheckbox
              key={sc._id}
              id={`subcategory-${sc._id}`}
              label={sc.name}
              checked={selected.includes(sc.name)}
              onCheckedChange={() => onToggle?.(sc.name)}
              // icon={<LucideShirt className="w-4 h-4" />}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 text-center py-4">No subcategories</p>
      )}
    </section>
  );
};
