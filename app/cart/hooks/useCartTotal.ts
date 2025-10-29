import { useMemo } from "react";
import { CartItem } from "@/types/cart"; // ✅ use your real type

export const useCartTotal = (items: CartItem[] = []) => {
  return useMemo(() => {
    return items.reduce((sum, item) => {
      const price = item.productId?.price ?? 0;
      const quantity = item.quantity ?? 0;
      return sum + price * quantity;
    }, 0);
  }, [items]);
};
