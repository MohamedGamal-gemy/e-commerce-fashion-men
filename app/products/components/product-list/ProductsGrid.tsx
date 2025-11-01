"use client";

import React from "react";
import { ProductCard } from "../ProductCard";
import type { Product } from "@/types/productList";

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  if (!products || products.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 ">
      {products.map((product) => (
        <div key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;


