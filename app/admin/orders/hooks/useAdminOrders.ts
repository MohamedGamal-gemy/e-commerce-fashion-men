"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { toast } from "sonner";
import { OrderResponse } from "@/types/orders.types";

// ✅ Local debounce hook (typed)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Define the filter type
interface OrderFilters {
  search: string;
  status: string;
  from: string;
  to: string;
  page: number;
  // Optional extras if you re-enable:
  // minTotal?: number;
  // maxTotal?: number;
}

// ✅ Fetch all admin orders
async function getOrders(filters: OrderFilters): Promise<OrderResponse> {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== "" && v !== "all")
  ).toString();

  const res = await fetch(
    `http://localhost:9000/api/checkout/admin/orders?${params}`,
    { credentials: "include" }
  );
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}


// ✅ Update order status
async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  const res = await fetch(
    `http://localhost:9000/api/checkout/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
  if (!res.ok) throw new Error("Failed to update status");
}

// ✅ Main Hook
export function useAdminOrders() {
  const queryClient = useQueryClient();

  const [filters] = useQueryStates({
    search: parseAsString.withDefault(""),
    status: parseAsString.withDefault("all"),
    from: parseAsString.withDefault(""),
    to: parseAsString.withDefault(""),
    // minTotal: parseAsFloat.withDefault(0),
    // maxTotal: parseAsFloat.withDefault(8000),
    page: parseAsInteger.withDefault(1),
  });

  const debouncedFilters = useDebounce<OrderFilters>(filters, 1000);

  const ordersQuery = useQuery<OrderResponse>({
    queryKey: ["orders", debouncedFilters],
    queryFn: () => getOrders(debouncedFilters),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("✅ Order status updated!");
    },
    onError: () => toast.error("❌ Failed to update order status"),
  });

  return { ...ordersQuery, updateStatus };
}
