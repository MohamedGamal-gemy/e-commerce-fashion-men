"use client";

import React, { memo, useEffect, useRef } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useSubcategoryFilter } from "../hooks/useSubcategoryFilter";
import { ProductsFilters } from "./filters/ProductsFilters";
import { ErrorDisplay } from "./ErrorDisplay";
import { useColorFilter } from "../hooks/useColorFilter";
// import type {  Product } from "@/types/product";
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

// Optional: if you have these defined elsewhere, import them instead


interface ProductListProps {
  colors: Color[];
  subcategories: Subcategory[];
  initialData: ProductsResponse;
}

export const ProductList: React.FC<ProductListProps> = ({
  initialData,
  subcategories,
  colors,
}) => {
  const firstRender = useRef(false);
  useEffect(() => {
    firstRender.current = true;
  }, []);

  const { sort, setSort, search, setSearch } = useSearchQueryHook()
  const { selectedColors, toggleColor, clearColors } = useColorFilter();
  const { selectedSubcategories, toggleSubcategory, clearSubcategories } =
    useSubcategoryFilter();

  const { data, isLoading, error, isFetching } = useProductsQuery({
    selectedColors,
    selectedSubcategories,
    sort, search,
    firstRender: firstRender.current,
  });

  // Use fallback data
  const products: Product[] = data?.products ?? initialData?.products ?? [];
  const hasActiveFilters =
    selectedColors.length > 0 || selectedSubcategories.length > 0;

  const handleClearAllFilters = () => {
    clearColors();
    clearSubcategories();
  };

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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <ProductsFilters
        subcategories={subcategories}
        colors={colors}
        selectedColors={selectedColors}
        selectedSubcategories={selectedSubcategories}
        onToggleColor={toggleColor}
        onToggleSubcategory={toggleSubcategory}
        onClearAll={handleClearAllFilters}
      />

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">


          <FiltersSearch search={search} setSearch={setSearch} />
          <FiltersSort sort={sort} setSort={setSort} />

        </div>

        <div className="flex items-center justify-between -mb-4">
          <Header total={data?.pagination?.total} hasActiveFilters={hasActiveFilters} />
          <UpdatingIndicator show={isFetching && !isLoading} />
        </div>

        {/* Loading Skeleton */}
        <LoadingState show={isLoading} />

        {/* Empty State */}
        <EmptyResults
          show={!isLoading && products.length === 0}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearAllFilters}
        />

        {/* Products Grid */}
        {!isLoading && products.length > 0 && <ProductsGrid products={products} />}
      </div>
    </div>
  );
};

export default memo(ProductList);
