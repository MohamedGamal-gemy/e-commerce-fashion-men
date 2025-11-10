// src/features/products/ProductsPageClient.tsx
"use client";
import React, { useEffect, useState } from "react";
import { productsRepository } from "./api/repository";
import type { ProductType, ColorOption } from "./types";
import ProductsGrid from "./components/ProductsGrid";
import Pagination from "./components/Pagination";
import { Filter } from "lucide-react";
import { useProducts } from "./query/useProducts";
import { useFilterState } from "./hooks/useFilterState";
import SidebarFilters from "./components/SidebarFilters";
import MobileFiltersSheet from "./components/MobileFiltersSheet";
import ResultsBar from "./components/ResultsBar";

interface Props {
  initialProductTypes?: ProductType[];
  initialColors?: ColorOption[];
}

export default function ProductsPageClient({
  initialProductTypes = [],
  initialColors = [],
}: Props) {
  const {
    search,
    debouncedSearch,
    productTypeCsv,
    colorCsv,
    page,
    limit,
    onSearchChange,
    onToggleProductType,
    onToggleColor,
    onClearAll,
    setPage,
  } = useFilterState();

  const [productTypes, setProductTypes] =
    useState<ProductType[]>(initialProductTypes);
  const [colors, setColors] = useState<ColorOption[]>(initialColors);
  const {
    data,
    isLoading: loading,
    error,
  } = useProducts({
    search: debouncedSearch,
    productTypeCsv: productTypeCsv,
    colorCsv: colorCsv,
    page,
    limit,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // bootstrap lists
  useEffect(() => {
    let alive = true;
    if (initialProductTypes.length && initialColors.length)
      return () => {
        alive = false;
      };
    (async () => {
      try {
        const [pt, cs] = await Promise.all([
          initialProductTypes.length
            ? Promise.resolve(initialProductTypes)
            : productsRepository.getProductTypes(),
          initialColors.length
            ? Promise.resolve(initialColors)
            : productsRepository.getColors(),
        ]);
        if (!alive) return;
        setProductTypes(pt);
        setColors(cs);
      } catch (e) {
        // ignore lists errors for now
      }
    })();
    return () => {
      alive = false;
    };
  }, [initialProductTypes, initialColors]);
console.log(data);

  // Products fetching handled by TanStack Query (useProducts)

  const handleSetPage = (next: number) => setPage(next);

  return (
    <section className="max-w-8xl mx-auto px-4 py-10">
      {/* <header className="mb-6 flex items-center justify-between">
        <ProductsHeader />
        </header> */}
      <button
        type="button"
        className="xl:hidden inline-flex items-center gap-2 rounded-lg border
         border-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-800"
        onClick={() => setShowMobileFilters(true)}
      >
        <Filter className="h-4 w-4" /> Filters
      </button>

      <div className="flex gap-6  w-full">
        {/* Sidebar filters */}

        <SidebarFilters
          search={search}
          setSearch={onSearchChange}
          productTypes={productTypes}
          colors={colors}
          selectedProductTypeNames={
            productTypeCsv ? productTypeCsv.split(",").filter(Boolean) : []
          }
          selectedColorValues={
            colorCsv ? colorCsv.split(",").filter(Boolean) : []
          }
          onToggleProductType={onToggleProductType}
          onToggleColor={onToggleColor}
          onClearAll={onClearAll}
        />

        {/* Main content */}
        <main className="flex-1 w-full ">
          {error && (
            <div className="rounded-md border border-red-800 bg-red-900/30 text-red-200 px-3 py-2 mb-4">
              {(error as Error)?.message || "Failed to load"}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 opacity-60">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-xl border border-slate-800 bg-slate-900/40 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && data && (
            <div className="w-full">
              <ResultsBar
                total={data.total}
                page={data.page}
                totalPages={data.totalPages}
                onClearAll={onClearAll}
              />
              {/* <ProductsGrid products={data.products} /> */}
              <ProductsGrid products={data?.data} />
              <div className="mt-8">
                <Pagination
                  totalPages={data.totalPages}
                  currentPage={data.page}
                  onPageChange={handleSetPage}
                />
              </div>
              <div className="mt-3 text-center text-slate-500 text-xs">
                Page {data.page} of {data.totalPages} — {data.total} items
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile filters sheet */}
      <MobileFiltersSheet
        open={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        search={search}
        setSearch={onSearchChange}
        productTypes={productTypes}
        colors={colors}
        selectedProductTypeNames={
          productTypeCsv ? productTypeCsv.split(",").filter(Boolean) : []
        }
        selectedColorValues={
          colorCsv ? colorCsv.split(",").filter(Boolean) : []
        }
        onToggleProductType={onToggleProductType}
        onToggleColor={onToggleColor}
        onClearAll={onClearAll}
      />
    </section>
  );
}
