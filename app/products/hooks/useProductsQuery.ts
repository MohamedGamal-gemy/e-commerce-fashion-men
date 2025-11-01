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




// import { useQuery } from "@tanstack/react-query";
// import { arrayToString } from "./useFilterArray";
// import { ProductsResponse } from "@/types/productList";

// export interface ProductsQueryParams {
//   selectedColors?: string[];
//   selectedSubcategories?: string[];
//   minPrice?: number;
//   maxPrice?: number;
//   sort?: string;
//   search?: string;
//   initialData?: ProductsResponse;
//   firstRender?: boolean;
// }

// /**
//  * Builds the query string for fetching products based on filters.
//  */
// function buildProductsQuery(params: ProductsQueryParams) {
//   const queryParts: string[] = [];

//   if (params.selectedColors?.length)
//     queryParts.push(`color=${arrayToString(params.selectedColors)}`);

//   if (params.selectedSubcategories?.length)
//     queryParts.push(`subcategory=${arrayToString(params.selectedSubcategories)}`);

//   if (params.minPrice != null) queryParts.push(`minPrice=${params.minPrice}`);
//   if (params.maxPrice != null) queryParts.push(`maxPrice=${params.maxPrice}`);

//   if (params.sort?.length) queryParts.push(`sort=${params.sort}`);
//   if (params.search?.length) queryParts.push(`search=${params.search}`);

//   return queryParts.length
//     ? `http://localhost:9000/api/products/show?${queryParts.join("&")}`
//     : "http://localhost:9000/api/products/show";
// }

// /**
//  * Custom hook to fetch products based on filters, price range, search, and sort.
//  */
// export function useProductsQuery({
//   selectedColors = [],
//   selectedSubcategories = [],
//   minPrice,
//   maxPrice,
//   sort = "latest",
//   search = "",
//   initialData,
//   firstRender = true,
// }: ProductsQueryParams) {
//   return useQuery<ProductsResponse>({
//     queryKey: [
//       "products",
//       selectedColors,
//       selectedSubcategories,
//       minPrice,
//       maxPrice,
//       sort,
//       search,
//     ],
//     queryFn: async () => {
//       const url = buildProductsQuery({
//         selectedColors,
//         selectedSubcategories,
//         minPrice,
//         maxPrice,
//         sort,
//         search,
//       });

//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch products");
//       return res.json() as Promise<ProductsResponse>;
//     },
//     // initialData,
//     enabled: !!firstRender,
//     staleTime: 30_000, // 30 seconds
//     gcTime: 300_000,   // 5 minutes
//   });
// }
