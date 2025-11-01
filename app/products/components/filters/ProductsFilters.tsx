"use client";

import React, { memo, useMemo } from "react";
import { FiltersHeader } from "./FiltersHeader";
import { FiltersSubcategories } from "./FiltersSubcategories";
import { FiltersColors } from "./FiltersColors";
import FiltersContainer from "./FiltersContainer";
import type { Color, Subcategory } from "@/types/filter";
import { FiltersPrice } from "./FiltersPrice";

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
    () => (selectedColors.length || 0) + (selectedSubcategories.length || 0),
    [selectedColors.length, selectedSubcategories.length]
  );
  

  return (
    <FiltersContainer>
      <FiltersHeader selectedCount={totalSelected} onClearAll={onClearAll ?? (() => { })} />
      <div className="mt-4 space-y-6">
        <FiltersSubcategories
          subcategories={subcategories}
          selected={selectedSubcategories}
          onToggle={onToggleSubcategory}
        />
        <FiltersPrice
          min={0}
          max={5000}
          onChange={(range) => console.log("Selected price range:", range)}
        />

        <FiltersColors colors={colors} selected={selectedColors} onToggle={onToggleColor} />
      </div>
    </FiltersContainer>
  );
}

export const ProductsFilters = memo(ProductsFiltersComponent);
