"use client";

import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
}

export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <div
      className="absolute top-3 left-3 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
      bg-slate-950/60 backdrop-blur-sm border border-slate-800 shadow-sm
      text-yellow-400 text-sm font-medium animate-in fade-in slide-in-from-top-1"
    >
      <Star size={14} className="fill-yellow-400 text-yellow-400 drop-shadow" />
      <span className="text-slate-100 text-xs">{rating.toFixed(1)}</span>
    </div>
  );
}


