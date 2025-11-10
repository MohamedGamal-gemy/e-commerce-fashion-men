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
  minTotal?: number | null;
  maxTotal?: number | null;
}

// ✅ Fetch all admin orders
async function getOrders(filters: OrderFilters): Promise<OrderResponse> {
  const entries = Object.entries(filters).filter(([, v]) => {
    if (v === undefined || v === null) return false;
    if (typeof v === "string" && (v === "" || v === "all")) return false;
    return true;
  });
  const params = new URLSearchParams(entries as [string, string][]).toString();

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
      credentials: "include",
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
    // Note: we keep undefined by default to avoid sending when not set
    minTotal: { parse: (v: string | null) => (v == null || v === "" ? null : Number(v)) },
    maxTotal: { parse: (v: string | null) => (v == null || v === "" ? null : Number(v)) },
    page: parseAsInteger.withDefault(1),
  });

  const debouncedFilters = useDebounce<OrderFilters>(filters, 1000);

  const ordersQuery = useQuery<OrderResponse>({
    queryKey: ["orders", debouncedFilters],
    queryFn: () => getOrders(debouncedFilters),
    placeholderData: (prev) => prev, // keep previous data during refetches
    staleTime: 5_000,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previous = queryClient.getQueriesData<OrderResponse>({ queryKey: ["orders"] });

      // Optimistically update all cached pages that match the orders key
      previous.forEach(([key, data]) => {
        if (!data) return;
        queryClient.setQueryData<OrderResponse>(key as any, {
          ...data,
          orders: data.orders.map((o) => (o._id === id ? { ...o, status } : o)),
        });
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      // Rollback
      context?.previous?.forEach(([key, data]) => {
        if (data) queryClient.setQueryData(key as any, data);
      });
      toast.error("❌ Failed to update order status");
    },
    onSuccess: () => {
      toast.success("✅ Order status updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { ...ordersQuery, updateStatus };
}
