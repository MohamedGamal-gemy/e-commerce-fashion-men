// src/services/productService.ts
import type { ProductResponse } from "@/types/product";

export async function fetchProduct(productId: string) {
  const res = await fetch(`http://localhost:9000/api/products/admin/${productId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  const data: ProductResponse = await res.json();
  return data.product;
}
