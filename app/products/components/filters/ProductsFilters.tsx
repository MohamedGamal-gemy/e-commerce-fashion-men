"use client";

import React, { memo, useMemo } from "react";
import { FiltersHeader } from "./FiltersHeader";
import { FiltersSubcategories } from "./FiltersSubcategories";
import { FiltersColors } from "./FiltersColors";
import { FiltersPrice } from "./FiltersPrice";
import FiltersContainer from "./FiltersContainer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Color, Subcategory } from "@/types/filter";

interface ProductsFiltersProps {
  subcategories?: Subcategory[];
  colors?: Color[];
  selectedColors?: string[];
  selectedSubcategories?: string[];
  onToggleColor?: (value: string) => void;
  onToggleSubcategory?: (value: string) => void;
  onClearAll?: () => void;
}

function ProductsFiltersComponent({
  subcategories = [],
  colors = [],
  selectedColors = [],
  selectedSubcategories = [],
  onToggleColor,
  onToggleSubcategory,
  onClearAll,
}: ProductsFiltersProps) {
  const totalSelected = useMemo(
    () => selectedColors.length + selectedSubcategories.length,
    [selectedColors.length, selectedSubcategories.length]
  );

  return (
    <FiltersContainer>
      <FiltersHeader
        selectedCount={totalSelected}
        onClearAll={onClearAll ?? (() => { })}
      />
      <ScrollArea className="h-screen max-h-screen pr-2 pb-20">

        <div className="my-4 space-y-6">
          {/* Subcategories Filter */}
          <FiltersSubcategories
            subcategories={subcategories}
            selected={selectedSubcategories}
            onToggle={onToggleSubcategory}
          />

          {/* Price Filter */}
          <FiltersPrice
            min={0}
            max={5000}
            onChange={(range) => console.log("Selected price range:", range)}
          />

          {/* Colors Filter */}
          <FiltersColors
            colors={colors}
            selected={selectedColors}
            onToggle={onToggleColor}
          />
        </div>
        {/* Custom ScrollBar */}
        <ScrollBar className="bg-slate-600 w-1 hover:bg-slate-500 rounded-full" />
      </ScrollArea>
    </FiltersContainer>

  );
}

export const ProductsFilters = memo(ProductsFiltersComponent);
