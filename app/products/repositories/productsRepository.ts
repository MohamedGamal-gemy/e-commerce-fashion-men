// app/products/repositories/productsRepository.ts
import { ProductsResponse } from "@/types/productList";
import { apiGet } from "../lib/apiClient";

const API_URL = "http://localhost:9000/api";

export const productsRepository = {
  getAll: (): Promise<ProductsResponse> =>
    apiGet(`${API_URL}/products/show`, { revalidate: 300 }),

  getColors: (): Promise<{ colorName: string; colorValue: string }[]> =>
    apiGet(`${API_URL}/variants/colors`, { revalidate: 3600 }),

  getSubcategories: (): Promise<{ _id: string; name: string }[]> =>
    apiGet(`${API_URL}/subcategories`, { revalidate: 3600 }),
};
