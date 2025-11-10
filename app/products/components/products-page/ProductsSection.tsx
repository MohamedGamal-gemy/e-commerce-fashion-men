"use client";

import React from "react";
import ProductList from "../ProductList";
import type { ProductsResponse } from "@/types/productList";
import type { Color, ProductType } from "@/types/filter";

interface ProductsSectionProps {
  initialData: ProductsResponse;
  colors: Color[];
  productTypes: ProductType[];
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  initialData,
  colors,
  productTypes,
}) => {
  return (
    <ProductList
      initialData={initialData}
      colors={colors}
      productTypes={productTypes}
    />
  );
};

export default ProductsSection;
