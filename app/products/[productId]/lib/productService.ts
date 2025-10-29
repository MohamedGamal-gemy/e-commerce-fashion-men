import { Product } from "@/types/product";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

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
    const errorData = (await res.json().catch(() => ({}))) as ErrorResponse;
    const message = errorData.message || res.statusText;
    throw new Error(message || "Failed to fetch product");
  }

  const data = (await res.json()) as { product: Product };

  return data.product;
};
