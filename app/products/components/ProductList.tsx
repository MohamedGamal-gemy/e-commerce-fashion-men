"use client";

import React, { memo, useEffect, useRef } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useProductTypeFilter } from "../hooks/useSubcategoryFilter";
import { ProductsFilters } from "./filters/ProductsFilters";
import { ErrorDisplay } from "./ErrorDisplay";
import { useColorFilter } from "../hooks/useColorFilter";
import { Product, ProductsResponse } from "@/types/productList";
import { Color, ProductType } from "@/types/filter";
import LoadingState from "./product-list/LoadingState";
import ProductsGrid from "./product-list/ProductsGrid";
import { useSearchQueryHook } from "../hooks/useSearchQueryHook";
import { useQueryState } from "nuqs";
import { useColorsQuery } from "../hooks/useColorsQuery";

interface ProductListProps {
  colors: Color[];
  initialData: ProductsResponse;
  productTypes: ProductType[];
}

export const ProductList: React.FC<ProductListProps> = ({
  initialData,
  productTypes,
  colors,
  // subcategories = [],
}) => {
  const firstRender = useRef(false);
  useEffect(() => {
    firstRender.current = true;
  }, []);

  // hooks & data (adjust paths to your hooks)
  const { sort, search } = useSearchQueryHook();
  const { selectedColors, toggleColor, clearColors } = useColorFilter();
  // const { selectedProductTypes, toggleProductTypes } = productTypes ?? {}; // Replace with your actual hook, toggleSubcategory, clearSubcategories } =
  // useSubcategoryFilter();
  const { selectedProductTypes, toggleProductType, clearProductTypes } =
    useProductTypeFilter();

  const [minPrice] = useQueryState("minPrice");
  const [maxPrice] = useQueryState("maxPrice");

  const { data, isLoading, error } = useProductsQuery({
    selectedColors,
    selectedProductTypes,
    sort,
    search,
    minPrice,
    maxPrice,
    firstRender: firstRender.current,
  });

  //
  const { data: dataColor } = useColorsQuery({
    selectedProductTypes,
    firstRender: firstRender.current,
  });

  const products: Product[] = data?.products ?? initialData?.products ?? [];
  const allColors = dataColor ?? colors ?? [];

  if (error) {
    return (
      <div className="flex-1">
        <ErrorDisplay
          message={error instanceof Error ? error.message : "Unknown error"}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-6 items-start w-full">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-6">
          <ProductsFilters
            productTypes={productTypes}
            selectedProductTypes={selectedProductTypes}
            toggleProductType={toggleProductType}
            clearProductTypes={clearProductTypes}
            //
            colors={allColors}
            // colors={colors}
            clearColors={clearColors}
            selectedColors={selectedColors}
            // selectedSubcategories={selectedSubcategories}
            toggleColor={toggleColor}
            // onToggleSubcategory={toggleSubcategory}
            // onClearAll={handleClearAllFilters}
          />
        </div>
      </aside>

      {/* Mobile sheet trigger */}
      {/* <div className="lg:hidden fixed bottom-6 right-4 z-40">
        <FiltersMobileSheet
          subcategories={subcategories}
          colors={colors}
          selectedColors={selectedColors}
          selectedSubcategories={selectedSubcategories}
          onToggleColor={toggleColor}
          onToggleSubcategory={toggleSubcategory}
          onClearAll={handleClearAllFilters}
        />
      </div> */}

      {/* Main content */}
      <main className="flex-1 mt-10 mx-4 sm:mx-6">
        {/* <div className="flex items-center justify-between -mb-4">
          <Header
            total={data?.pagination?.total}
            hasActiveFilters={hasActiveFilters}
          />
          <UpdatingIndicator show={isFetching && !isLoading} />
        </div> */}

        <LoadingState show={isLoading} />

        {/* <EmptyResults
          show={!isLoading && products.length === 0}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearAllFilters}
        /> */}

        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </main>
    </div>
  );
};

export default memo(ProductList);
