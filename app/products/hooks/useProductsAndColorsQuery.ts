import { useQueries } from "@tanstack/react-query";
import { arrayToString } from "./useFilterArray";
import { ProductsResponse } from "@/types/productList";

// 🧩 جلب البيانات المتزامنة (Products + Colors)
export function useProductsAndColorsQuery({
  selectedColors,
  selectedProductTypes,
  sort,
  search,
  minPrice,
  maxPrice,
  firstRender,
}: {
  selectedColors: string[];
  selectedProductTypes: string[];
  sort: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  firstRender: boolean;
}) {
  const results = useQueries({
    queries: [
      // 🟢 Query 1: Get Products
      {
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
          const typeQuery = selectedProductTypes.length
            ? `productTypeName=${arrayToString(selectedProductTypes)}`
            : "";
          //   const sortQuery = sort ? `sort=${sort}` : "";
          const searchQuery = search ? `search=${search}` : "";
          const minQ = minPrice ? `minPrice=${minPrice}` : "";
          const maxQ = maxPrice ? `maxPrice=${maxPrice}` : "";

          const queryParams = [
            colorQuery,
            typeQuery,
            // sortQuery,
            searchQuery,
            minQ,
            maxQ,
          ]
            .filter(Boolean)
            .join("&");

          const res = await fetch(
            `http://localhost:9000/api/products?${queryParams}`
          );
          if (!res.ok) throw new Error("فشل تحميل المنتجات");
          return (await res.json()) as ProductsResponse;
        },
        enabled: !!firstRender,
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
      },

      // 🟣 Query 2: Get Colors
      {
        queryKey: ["colors", selectedProductTypes],
        queryFn: async () => {
          const typeQuery = selectedProductTypes.length
            ? `?productTypeName=${arrayToString(selectedProductTypes)}`
            : "";
          const res = await fetch(
            `http://localhost:9000/api/colors${typeQuery}`
          );
          if (!res.ok) throw new Error("فشل تحميل الألوان");
          const data = await res.json();
          return data || [];
        },
        // enabled: !!firstRender,
        staleTime: 1000 * 60,
      },
    ],
  });

  const [productsResult, colorsResult] = results;

  return {
    productsData: productsResult.data,
    colorsData: colorsResult.data,
    isLoading:
      productsResult.isLoading || colorsResult.isLoading || !firstRender,
    isFetching:
      productsResult.isFetching || colorsResult.isFetching || !firstRender,
    error: productsResult.error || colorsResult.error,
  };
}
