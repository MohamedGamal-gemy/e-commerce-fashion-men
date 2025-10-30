"use client";

// import React, { Suspense } from "react";
import React from "react";
import ProductList from "../ProductList";
import type { ProductsResponse } from "@/types/productList";
import type { Color, Subcategory } from "@/types/filter";

interface ProductsSectionProps {
  initialData: ProductsResponse;
  colors: Color[];
  subcategories: Subcategory[];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  initialData,
  colors,
  subcategories,
}) => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <ProductList initialData={initialData} colors={colors} subcategories={subcategories} />
    // </Suspense>
  );
};

export default ProductsSection;


