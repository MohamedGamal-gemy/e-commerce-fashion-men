import { useQuery } from "@tanstack/react-query";
import { arrayToString } from "./useFilterArray";

interface ProductsQueryParams {
  selectedColors: string[];
  selectedSubcategories: string[];
  initialData?: any;
  firstRender?: Boolean;
}

export function useProductsQuery({
  selectedColors,
  selectedSubcategories,
  firstRender,
}: ProductsQueryParams) {
  return useQuery({
    queryKey: ["products", selectedColors, selectedSubcategories],
    queryFn: async () => {
      const colorQuery = selectedColors.length
        ? `color=${arrayToString(selectedColors)}`
        : "";
      const subcategoryQuery = selectedSubcategories.length
        ? `subcategory=${arrayToString(selectedSubcategories)}`
        : "";

      const queryParams = [colorQuery, subcategoryQuery]
        .filter(Boolean)
        .join("&");

      const url = queryParams
        ? `http://localhost:9000/api/products/show?${queryParams}`
        : "http://localhost:9000/api/products/show";

      const res = await fetch(url);
      if (!res.ok) throw new Error("فشل تحميل المنتجات");
      return res.json();
    },
    // initialData,
    enabled: !!firstRender,
    staleTime: 1000 * 30, // 30 ثانية
    gcTime: 1000 * 60 * 5, // 5 دقايق
  });
}
