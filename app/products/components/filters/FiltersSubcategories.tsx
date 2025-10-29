"use client";

import { motion } from "framer-motion";
import { FilterCheckbox } from "./FilterCheckbox";
import { LayersIcon } from "lucide-react";
import { Subcategory } from "@/types/filter";


interface FiltersSubcategoriesProps {
  subcategories?: Subcategory[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export function FiltersSubcategories({
  subcategories = [],
  selected = [],
  onToggle,
}: FiltersSubcategoriesProps) {
  const hasSubcategories = subcategories.length > 0;

  const handleToggle = (value: string) => {
    onToggle?.(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LayersIcon className="h-5 w-5 text-blue-400" />
        <h4 className="text-slate-300 text-sm font-semibold">Subcategories</h4>
        <span className="text-slate-500 text-sm">
          ({subcategories.length})
        </span>
      </div>

      {hasSubcategories ? (
        <div className="space-y-2 max-h-80">
          {subcategories.map((subcategory) => (
            <motion.div key={subcategory._id}>
              <FilterCheckbox
                id={`subcategory-${subcategory._id}`}
                label={subcategory.name}
                checked={selected.includes(subcategory.name)}
                onCheckedChange={(checked: boolean | "indeterminate") => {
                  if (checked === "indeterminate") return;
                  handleToggle(subcategory.name);
                }}
                icon={<LayersIcon className="h-4 w-4" />}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p className="text-slate-500 text-sm text-center py-4">
          No subcategories available
        </motion.p>
      )}
    </div>
  );
}
