"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ReviewInput {
  product: string;
  rating: number;
  comment: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export function useReviews(productId: string) {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/reviews/${productId}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const addReview = useMutation({
    mutationFn: async (data: ReviewInput) => {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add review");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });

  return { ...reviewsQuery, addReview };
}
