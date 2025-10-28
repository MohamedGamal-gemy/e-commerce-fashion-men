"use client";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { useSubcategoryFilter } from "../hooks/useSubcategoryFilter";
import { ProductCard } from "./ProductCard";
import { ProductsFilters } from "./filters/ProductsFilters";
import { ProductSkeleton } from "./ui/ProductSkeleton";
import { EmptyState } from "./EmptyState";
import { ErrorDisplay } from "./ErrorDisplay";
import { useColorFilter } from "../hooks/useColorFilter";

const ProductList = ({ initialData, subcategories, colors }) => {
  const firstRender = useRef(false);
  useEffect(() => {
    firstRender.current = true;
  }, []);
  const { selectedColors, toggleColor, clearColors } = useColorFilter();
  const { selectedSubcategories, toggleSubcategory, clearSubcategories } =
    useSubcategoryFilter();

  const { data, isLoading, error, isFetching } = useProductsQuery({
    selectedColors,
    selectedSubcategories,
    initialData,
    firstRender: firstRender.current,
  });

  const products = data?.products || initialData.products;
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
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 ">
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
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-200">
              Products
              {data?.pagination && (
                <span className="text-slate-400 text-lg ml-2">
                  ({data.pagination.total})
                </span>
              )}
            </h2>

            {hasActiveFilters && (
              <p className="text-slate-400 text-sm mt-1">Filtered results</p>
            )}
          </div>

          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 text-slate-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-sm">Updating...</span>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearAllFilters}
          />
        )}

        {!isLoading && products.length > 0 && (
          <div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
            // layout
          >
            {/* <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
            layout
          > */}
            {/* <AnimatePresence mode="popLayout"> */}
            {products.map((product) => (
              // <motion.div
              <div
                key={product._id}
                // layout
                // initial={{ opacity: 0, scale: 0.9 }}
                // animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0, scale: 0.9 }}
                // transition={{
                //   duration: 0.25,
                //   layout: { duration: 0.25 },
                // }}
                // whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </div>
              // </motion.div>
            ))}
            {/* </AnimatePresence> */}
            {/* </motion.div> */}
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default memo(ProductList);
