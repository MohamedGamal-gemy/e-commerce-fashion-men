"use client";

import { memo, useMemo } from "react";
import { FiltersHeader } from "./FiltersHeader";
import { FiltersSubcategories } from "./FiltersSubcategories";
import { FiltersColors } from "./FiltersColors";
import FiltersContainer from "./FiltersContainer";
import { Color, Subcategory } from "@/types/filter";


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

  const handleClearAll = () => {
    onClearAll?.();
  };

  return (

      <FiltersContainer >
        <FiltersHeader
          selectedCount={totalSelected}
          onClearAll={handleClearAll}
        />

        <div className="space-y-6">
          <FiltersSubcategories
            subcategories={subcategories}
            selected={selectedSubcategories}
            onToggle={onToggleSubcategory}
          />

          <FiltersColors
            colors={colors}
            selected={selectedColors}
            onToggle={onToggleColor}
          />
        </div>
      </FiltersContainer>
  );
}

export const ProductsFilters = memo(ProductsFiltersComponent);
