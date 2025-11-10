// src/features/products/components/FiltersBar.tsx
"use client";
import React from "react";
import type { ColorOption, ProductType } from "../types";
import FilterSearch from "./filters/FilterSearch";
import FilterByProductTypes from "./filters/FilterByProductTypes";
import FilterByColors from "./filters/FilterByColors";

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

export const FiltersBar: React.FC<Props> = ({
  search,
  setSearch,
  productTypes,
  colors,
  selectedProductTypeNames,
  selectedColorValues,
  onToggleProductType,
  onToggleColor,
  onClearAll,
}) => {
  return (
    <div className="flex flex-col  gap-4">
      <FilterSearch value={search} onChange={setSearch} />
      <FilterByProductTypes
        productTypes={productTypes}
        selectedNames={selectedProductTypeNames}
        onToggle={onToggleProductType}
      />
      <FilterByColors
        colors={colors}
        selectedValues={selectedColorValues}
        onToggle={onToggleColor}
      />
    </div>
  );
};

export default FiltersBar;
