"use client";
import { useQuery } from "@tanstack/react-query";
import { productsRepository } from "../api/repository";
import type { ProductsResponse } from "../types";

export interface UseProductsParams {
  search: string;
  productTypeCsv: string; // CSV of names
  colorCsv: string;       // CSV of values
  page: number;
  limit: number;
}

export function useProducts({ search, productTypeCsv, colorCsv, page, limit }: UseProductsParams) {
  const productTypeArr = productTypeCsv ? productTypeCsv.split(",").filter(Boolean) : [];
  const colorArr = colorCsv ? colorCsv.split(",").filter(Boolean) : [];

  return useQuery<ProductsResponse>({
    queryKey: [
      "products",
      { search, productTypeArr, colorArr, page, limit },
    ],
    queryFn: () =>
      productsRepository.getProducts({
        search,
        productTypeName: productTypeArr,
        color: colorArr,
        page,
        limit,
      }),
    staleTime: 1000 * 30,
  });
}
