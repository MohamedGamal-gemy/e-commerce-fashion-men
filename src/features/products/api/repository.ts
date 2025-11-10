// src/features/products/api/repository.ts
import { apiGet } from "./client";
import type { ProductsResponse, ColorOption, ProductType } from "../types";

export const productsRepository = {
  getProducts: (params?: {
    search?: string;
    productTypeName?: string | string[];
    color?: string | string[];
    page?: number;
    limit?: number;
  }): Promise<ProductsResponse> => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.productTypeName) {
      const csv = Array.isArray(params.productTypeName)
        ? params.productTypeName.join(",")
        : params.productTypeName;
      if (csv) query.set("productTypeName", csv);
    }
    if (params?.color) {
      const csv = Array.isArray(params.color)
        ? params.color.join(",")
        : params.color;
      if (csv) query.set("color", csv);
    }
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiGet<ProductsResponse>(`/products${qs ? `?${qs}` : ""}`, {
      // revalidate: 60,
      cache: "no-store",
    });
  },

  getColors: async (): Promise<ColorOption[]> => {
    const res = await apiGet<{
      success?: boolean;
      count?: number;
      colors: ColorOption[];
    }>("/colors", { revalidate: 3600 });
    return Array.isArray((res as any)?.colors) ? (res as any).colors : [];
  },
  getProductTypes: async (): Promise<ProductType[]> => {
    const res = await apiGet<{
      success?: boolean;
      count?: number;
      productTypes: ProductType[];
    }>("/product-types", { revalidate: 3600 });
    return Array.isArray((res as any)?.productTypes)
      ? (res as any).productTypes
      : [];
  },
};
