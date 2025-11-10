// app/products/repositories/productsRepository.ts
import { ProductsResponse } from "@/types/productList";
import { apiGet } from "../lib/apiClient";
import type { Color, ProductType } from "@/types/filter";

const API_URL = "http://localhost:9000/api";

export const productsRepository = {
  getAll: (): Promise<ProductsResponse> =>
    apiGet(`${API_URL}/products`, { revalidate: 300 }),

  getColors: (): Promise<Color[]> =>
    apiGet(`${API_URL}/colors`, { revalidate: 3600 }),

  getProductTypes: (): Promise<ProductType[]> =>
    apiGet(`${API_URL}/product-types`, { revalidate: 3600 }),
};
