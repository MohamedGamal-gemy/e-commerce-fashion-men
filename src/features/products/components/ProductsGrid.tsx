// src/features/products/components/ProductsGrid.tsx
"use client";
import React from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface Props { products: Product[] }

export const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-3 w-full">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default ProductsGrid;
