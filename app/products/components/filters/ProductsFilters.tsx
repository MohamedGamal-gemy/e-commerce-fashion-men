import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { FiltersHeader } from "./FiltersHeader";
import { FiltersSubcategories } from "./FiltersSubcategories";
import { FiltersColors } from "./FiltersColors";

interface ProductsFiltersProps {
  subcategories?: any[];
  colors?: any[];
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
    () => (selectedColors?.length || 0) + (selectedSubcategories?.length || 0),
    [selectedColors?.length, selectedSubcategories?.length]
  );

  const handleClearAll = () => {
    onClearAll?.();
  };

  return (
    <div
      className="w-60 sticky top-6
       space-y-6 p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl"
      // <motion.div
      // initial={{ opacity: 0, x: -20 }}
      // animate={{ opacity: 1, x: 0 }}
      // transition={{ duration: 0.5 }}
    >
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
      {/* </motion.div> */}
    </div>
  );
}

export const ProductsFilters = memo(ProductsFiltersComponent);
