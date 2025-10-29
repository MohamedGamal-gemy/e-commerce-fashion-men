// import { Product } from "@/types/product";

// export const fetchProduct = async (id: string): Promise<Product> => {
//   const res = await axios.get<{ product: Product }>(
//     `http://localhost:9000/api/products/admin/${id}`
//   );
//   return res.data.product;
// };

import { Product } from "@/types/product";

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(
    `http://localhost:9000/api/products/admin/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = (errorData as any)?.message || res.statusText;
    throw new Error(message || "Failed to fetch product");
  }

  const data = (await res.json()) as { product: Product };

  return data.product;
};
