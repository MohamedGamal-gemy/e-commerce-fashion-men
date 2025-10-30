// import { useQuery } from "@tanstack/react-query";
// import { arrayToString } from "./useFilterArray";
import { ProductsResponse } from "@/types/productList";
import { useQuery } from "@tanstack/react-query";
// // import type { ProductsResponse } from "@/types/product";

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
  firstRender,
  sort,
  search,
}: ProductsQueryParams) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", selectedColors, selectedSubcategories, search, sort],
    queryFn: async () => {
      const params = new URLSearchParams();

      selectedColors.forEach(c => params.append("color", c));
      selectedSubcategories.forEach(s => params.append("subcategory", s));
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);

      const url = `http://localhost:9000/api/products/show?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("فشل تحميل المنتجات");
      return res.json() as Promise<ProductsResponse>;
    },
    enabled: !!firstRender,
    staleTime: 30_000,
    gcTime: 300_000,
  });
}
