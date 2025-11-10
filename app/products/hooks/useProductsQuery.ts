import { useQuery } from "@tanstack/react-query";
import { arrayToString } from "./useFilterArray";
import { ProductsResponse } from "@/types/productList";
// import type { ProductsResponse } from "@/types/product";

interface ProductsQueryParams {
  selectedColors: string[];
  selectedProductTypes: string[];
  initialData?: ProductsResponse; // ✅ Correct type
  firstRender?: boolean;
  sort: string;
  search: string;
  minPrice?: string | null;
  maxPrice?: string | null;
}

export function useProductsQuery({
  selectedColors,
  selectedProductTypes,
  // initialData,
  sort,
  search,
  minPrice,
  maxPrice,
  firstRender,
}: ProductsQueryParams) {
  return useQuery<ProductsResponse>({
    queryKey: [
      "products",
      selectedColors,
      selectedProductTypes,
      sort,
      search,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      const colorQuery = selectedColors.length
        ? `color=${arrayToString(selectedColors)}`
        : "";
      const subcategoryQuery = selectedProductTypes.length
        ? `productTypeName=${arrayToString(selectedProductTypes)}`
        : "";
      // const sortquery = sort.length ? `sort=${sort}` : "latest";
      // const minPriceQuery = minPrice > 20 ? `minPrice=${minPrice}` : 0;
      // const maxPriceQuery = maxPrice > 20 ? `maxPrice=${maxPrice}` : 8000;
      const searchquery = search.length ? `search=${search}` : "";
      const queryParams = [
        colorQuery,
        subcategoryQuery,
        // sortquery,
        searchquery,
        // minPriceQuery,
        // maxPriceQuery,
      ]
        .filter(Boolean)
        .join("&");

      const url = queryParams
        ? `http://localhost:9000/api/products?${queryParams}`
        : "http://localhost:9000/api/products";

      const res = await fetch(url);
      if (!res.ok) throw new Error("فشل تحميل المنتجات");
      return res.json() as Promise<ProductsResponse>; // ✅ Strongly typed
    },
    // initialData,       // ✅ Matches ProductsResponse
    enabled: !!firstRender,
    staleTime: 1000 * 30, // 30 ثانية
    gcTime: 1000 * 60 * 5, // 5 دقائق
  });
}
