import { useQuery } from "@tanstack/react-query";
import { arrayToString } from "./useFilterArray";

interface Color {
  name: string;
  value: string;
  count: number;
}

interface ColorsResponse {
  success: boolean;
  count: number;
  colors: Color[];
}

interface ColorsQueryParams {
  selectedProductTypes: string[];
  firstRender?: boolean; // علشان نقدر نفلتر الألوان حسب النوع
}

export function useColorsQuery({
  selectedProductTypes,
  firstRender,
}: ColorsQueryParams) {
  return useQuery<ColorsResponse>({
    queryKey: ["colors", selectedProductTypes],
    queryFn: async () => {
      const productTypeQuery = selectedProductTypes.length
        ? `productTypeName=${arrayToString(selectedProductTypes)}`
        : "";

      const url = productTypeQuery
        ? `http://localhost:9000/api/colors?${productTypeQuery}`
        : "http://localhost:9000/api/colors";

      const res = await fetch(url);
      if (!res.ok) throw new Error("فشل تحميل الألوان");

      return res.json() as Promise<ColorsResponse>;
    },
    enabled: !!firstRender,
    staleTime: 1000 * 60 * 5, // 5 دقايق
    gcTime: 1000 * 60 * 10, // تنظيف الكاش بعد 10 دقايق
  });
}
