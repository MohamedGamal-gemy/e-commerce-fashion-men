import { useMemo } from "react";

export const useCartTotal = (items: any[] = []) => {
  return useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.stock, 0);
  }, [items]);
};
