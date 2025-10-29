import { ProductsResponse } from "@/types/productList";
import { apiGet } from "../lib/apiClient";

export const productsRepository = {
  getAll: (): Promise<ProductsResponse> =>
    apiGet(`${process.env.NEXT_PUBLIC_API_URL}/products/show`, {
      revalidate: 300,
    }),

  getColors: (): Promise<string[]> =>
    apiGet(`${process.env.NEXT_PUBLIC_API_URL}/variants/colors`, {
      revalidate: 3600,
    }),

  getSubcategories: (): Promise<string[]> =>
    apiGet(`${process.env.NEXT_PUBLIC_API_URL}/subcategories`, {
      revalidate: 3600,
    }),
};
