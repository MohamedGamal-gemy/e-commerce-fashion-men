// "use client";

// import React, { memo, useMemo } from "react";
// import { FiltersHeader } from "./FiltersHeader";
// import ProductTypeCheckboxes, {
//   FiltersSubcategories,
// } from "./FiltersSubcategories";
// import { FiltersColors } from "./FiltersColors";
// import FiltersContainer from "./FiltersContainer";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// function ProductsFiltersComponent({
//   productTypes,
//   selectedProductTypes,
//   toggleProductType,
//   clearProductTypes,

//   //
//   clearColors
//   toggleColor,
//   selectedColors,
//   colors,
// }) {
//   return (
//     <FiltersContainer>
//       {/* <FiltersHeader
//         selectedCount={totalSelected}
//         onClearAll={onClearAll ?? (() => {})}
//       /> */}
//       <ScrollArea className="h-screen max-h-screen pr-2 pb-20">
//         <div className="my-4 space-y-6">
//           {/* Subcategories Filter */}
//           <ProductTypeCheckboxes
//             productTypes={productTypes?.productTypes}
//             selectedProductTypes={selectedProductTypes}
//             toggleProductType={toggleProductType}
//             clearProductTypes={clearProductTypes}
//           />

//           {/* Price Filter */}
//           {/* <FiltersPrice
//             min={0}
//             max={5000}
//             onChange={(range) => console.log("Selected price range:", range)}
//           /> */}

//           {/* Colors Filter */}
//           <FiltersColors
//             colors={colors}
//             clearColors={clearColors}
//             selectedColors={selectedColors}
//             toggleColor={toggleColor}

//                                />
//         </div>
//         {/* Custom ScrollBar */}
//         <ScrollBar className="bg-slate-600 w-1 hover:bg-slate-500 rounded-full" />
//       </ScrollArea>
//     </FiltersContainer>
//   );
// }

// export const ProductsFilters = memo(ProductsFiltersComponent);

"use client";

import React, { memo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import FiltersContainer from "./FiltersContainer";
import ProductTypeCheckboxes from "./FiltersSubcategories";
import ColorFilter from "./FiltersColors";

function ProductsFiltersComponent({
  productTypes,
  selectedProductTypes,
  toggleProductType,
  clearProductTypes,

  // 🟢 ألوان
  colors,
  selectedColors,
  toggleColor,
  clearColors,
}) {
  return (
    <FiltersContainer>
      {/* <FiltersHeader
        selectedCount={totalSelected}
        onClearAll={onClearAll ?? (() => {})}
      /> */}

      <ScrollArea className="h-screen max-h-screen pr-2 pb-20">
        <div className="my-4 space-y-6">
          {/* 🟡 Product Type Filter */}
          <ProductTypeCheckboxes
            productTypes={productTypes?.productTypes}
            selectedProductTypes={selectedProductTypes}
            toggleProductType={toggleProductType}
            clearProductTypes={clearProductTypes}
          />

          {/* 🟢 Colors Filter */}
          <ColorFilter
            colors={colors?.colors}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            clearColors={clearColors}
          />
        </div>

        {/* 🧭 Scroll Bar */}
        <ScrollBar className="bg-slate-600 w-1 hover:bg-slate-500 rounded-full" />
      </ScrollArea>
    </FiltersContainer>
  );
}

export const ProductsFilters = memo(ProductsFiltersComponent);
