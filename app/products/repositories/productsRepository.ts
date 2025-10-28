

import { apiGet } from "../lib/apiClient";

export const productsRepository = {
  // نستخدم ISR لمدة 5 دقائق مثلاً
  getAll: (query?: string) =>
    apiGet(`${process.env.NEXT_PUBLIC_API_URL}/products/show`, {
      revalidate: 300, // 5 دقائق
    }),

  getColors: () =>
    apiGet(`${process.env.NEXT_PUBLIC_API_URL}/variants/colors`, {
      revalidate: 3600, // كل ساعة
    }),

  getSubcategories: () =>
    apiGet(`${process.env.NEXT_PUBLIC_API_URL}/subcategories`, {
      revalidate: 3600,
    }),
};
