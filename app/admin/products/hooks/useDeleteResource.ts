"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteResource(resourceKey: string, endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api"}/${endpoint}/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error(`Failed to delete ${resourceKey}`);
      return res.json();
    },

    onSuccess: () => {
      toast.success(`${resourceKey} deleted successfully ✅`);
      queryClient.invalidateQueries({ queryKey: [resourceKey] });
    },

    onError: () => {
      toast.error(`Failed to delete ${resourceKey} ❌`);
    },
  });
}
