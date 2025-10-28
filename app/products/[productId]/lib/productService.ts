import { Product } from "@/types/product";
import axios from "axios";

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await axios.get<{ product: Product }>(
    `http://localhost:9000/api/products/admin/${id}`
  );
  return res.data.product;
};
