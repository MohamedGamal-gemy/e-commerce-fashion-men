import { useQuery } from "@tanstack/react-query";
import { arrayToString } from "./useFilterArray";
import { ProductsResponse } from "@/types/productList";
// import type { ProductsResponse } from "@/types/product";

interface ProductsQueryParams {
  selectedColors: string[];
  selectedSubcategories: string[];
  initialData?: ProductsResponse; // ✅ Correct type
  firstRender?: boolean;
  sort: string;
  search: string       // ✅ lowercase boolean
}

export function useProductsQuery({
  selectedColors,
  selectedSubcategories,
  // initialData,
  sort,
  search,
  firstRender,
}: ProductsQueryParams) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", selectedColors, selectedSubcategories, sort, search],
    queryFn: async () => {
      const colorQuery = selectedColors.length
        ? `color=${arrayToString(selectedColors)}`
        : "";
      const subcategoryQuery = selectedSubcategories.length
        ? `subcategory=${arrayToString(selectedSubcategories)}`
        : "";
      const sortquery = sort.length ? `sort=${sort}` : "latest"
      const searchquery = search.length ? `search=${search}` : ""
      const queryParams = [colorQuery, subcategoryQuery, sortquery, searchquery]
        .filter(Boolean)
        .join("&");

      const url = queryParams
        ? `http://localhost:9000/api/products/show?${queryParams}`
        : "http://localhost:9000/api/products/show";

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


