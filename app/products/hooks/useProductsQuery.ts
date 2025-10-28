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
  initialData,
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

// hooks/useProductsQuery.ts
// import { useQuery } from "@tanstack/react-query";
// import { productsRepository } from "../repositories/productsRepository";
// // import { ProductsQueryParams } from "../types";

// export function useProductsQuery({
//   selectedColors,
//   selectedSubcategories,
//   initialData,
// }) {
//   return useQuery({
//     queryKey: ["products", selectedColors, selectedSubcategories],
//     queryFn: async () => {
//       const queryParams = new URLSearchParams();

//       if (selectedColors.length > 0) {
//         queryParams.append("color", selectedColors.join(","));
//       }

//       if (selectedSubcategories.length > 0) {
//         queryParams.append("subcategory", selectedSubcategories.join(","));
//       }

//       return fetch(`http://localhost:9000/api/products/show?${queryParams}`);
//       // return productsRepository(queryParams.toString());
//     },
//     // initialData,
//     staleTime: 1000 * 30, // 30 seconds
//     gcTime: 1000 * 60 * 5, // 5 minutes
//     retry: 2,
//     refetchOnWindowFocus: false,
//     placeholderData: (previousData) => previousData,
//     // ?? initialData,
//   });
// }

// import { useQuery } from "@tanstack/react-query";
// import { productsRepository } from "../repositories/productsRepository";

// export function useProductsQuery({
//   selectedColors = [],
//   selectedSubcategories = [],
//   initialData,
// }: {
//   selectedColors?: string[];
//   selectedSubcategories?: string[];
//   initialData?: any;
// }) {
//   return useQuery({
//     queryKey: ["products", selectedColors, selectedSubcategories],
//     queryFn: async () => {
//       const queryParams = new URLSearchParams();

//       if (selectedColors && selectedColors.length > 0) {
//         queryParams.append("color", selectedColors.join(","));
//       }

//       if (selectedSubcategories && selectedSubcategories.length > 0) {
//         queryParams.append("subcategory", selectedSubcategories.join(","));
//       }

//       return productsRepository.getAll(queryParams.toString());
//     },
//     initialData,
//     staleTime: 1000 * 30,
//     gcTime: 1000 * 60 * 5,
//     retry: 2,
//     refetchOnWindowFocus: false,
//     placeholderData: (previousData) => previousData ?? initialData,
//   });
// }
