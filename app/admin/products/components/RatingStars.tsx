"use client";

import { Star, StarHalf, StarOff } from "lucide-react";

export function RatingStars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return <Star key={i} className="text-yellow-400 w-4 h-4" />;
    if (rating > i && rating < i + 1)
      return <StarHalf key={i} className="text-yellow-400 w-4 h-4" />;
    return <StarOff key={i} className="text-slate-600 w-4 h-4" />;
  });

  return <div className="flex items-center gap-1 justify-center">{stars}</div>;
}
