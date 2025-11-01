"use client";

import React, { memo, useEffect, useRef } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useSubcategoryFilter } from "../hooks/useSubcategoryFilter";
import { ProductsFilters } from "./filters/ProductsFilters";
import { ErrorDisplay } from "./ErrorDisplay";
import { useColorFilter } from "../hooks/useColorFilter";
import { Product, ProductsResponse } from "@/types/productList";
import { Color, Subcategory } from "@/types/filter";
import Header from "./product-list/Header";
import UpdatingIndicator from "./product-list/UpdatingIndicator";
import LoadingState from "./product-list/LoadingState";
import ProductsGrid from "./product-list/ProductsGrid";
import EmptyResults from "./product-list/EmptyResults";
import FiltersSort from "./filters/FiltersSort";
import FiltersSearch from "./filters/FiltersSearch";
import { useSearchQueryHook } from "../hooks/useSearchQueryHook";
import { Filter } from "lucide-react";
import { FiltersMobileSheet } from "./filters/FiltersMobileSheet";



interface ProductListProps {
  colors: Color[];
  subcategories: Subcategory[];
  initialData: ProductsResponse;
}




export const ProductList: React.FC<ProductListProps> = ({ initialData, subcategories = [], colors = [] }) => {
  const firstRender = useRef(false);
  useEffect(() => {
    firstRender.current = true;
  }, []);

  // hooks & data (adjust paths to your hooks)
  const { sort, setSort, search, setSearch } = useSearchQueryHook();
  const { selectedColors, toggleColor, clearColors } = useColorFilter();
  const { selectedSubcategories, toggleSubcategory, clearSubcategories } = useSubcategoryFilter();
  const { data, isLoading, error, isFetching } = useProductsQuery({
    selectedColors,
    selectedSubcategories,
    sort,
    search,
    firstRender: firstRender.current,
  });

  const products: Product[] = data?.products ?? initialData?.products ?? [];
  const hasActiveFilters = selectedColors.length > 0 || selectedSubcategories.length > 0;

  const handleClearAllFilters = () => {
    clearColors();
    clearSubcategories();
  };

  if (error) {
    return (
      <div className="flex-1">
        <ErrorDisplay message={error instanceof Error ? error.message : "Unknown error"} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="flex gap-6 items-start w-full">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-6">
          <ProductsFilters
            subcategories={subcategories}
            colors={colors}
            selectedColors={selectedColors}
            selectedSubcategories={selectedSubcategories}
            onToggleColor={toggleColor}
            onToggleSubcategory={toggleSubcategory}
            onClearAll={handleClearAllFilters}
          />
        </div>
      </aside>

      {/* Mobile sheet trigger */}
      <div className="lg:hidden fixed bottom-6 right-4 z-40">
        <FiltersMobileSheet
          subcategories={subcategories}
          colors={colors}
          selectedColors={selectedColors}
          selectedSubcategories={selectedSubcategories}
          onToggleColor={toggleColor}
          onToggleSubcategory={toggleSubcategory}
          onClearAll={handleClearAllFilters}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 mt-10 mx-4 sm:mx-6">
        <div className="flex items-center justify-between -mb-4">
          <Header total={data?.pagination?.total} hasActiveFilters={hasActiveFilters} />
          <UpdatingIndicator show={isFetching && !isLoading} />
        </div>

        <LoadingState show={isLoading} />

        <EmptyResults show={!isLoading && products.length === 0} hasActiveFilters={hasActiveFilters} onClearFilters={handleClearAllFilters} />

        {!isLoading && products.length > 0 && <ProductsGrid products={products} />}
      </main>
    </div>
  );
};

export default memo(ProductList);