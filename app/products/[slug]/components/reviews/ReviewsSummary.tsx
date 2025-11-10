"use client";

import { Star } from "lucide-react";
import { Review } from "@/types/review";

export function ReviewsSummary({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const avg =
    total > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
      : "0";

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center justify-center md:w-1/3">
        <h3 className="text-5xl font-semibold text-sky-400">{avg}</h3>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-5 h-5 ${
                s <= Math.round(Number(avg))
                  ? "fill-sky-400 text-sky-400"
                  : "text-slate-600"
              }`}
            />
          ))}
        </div>
        <p className="text-slate-400 text-sm mt-2">{total} Reviews</p>
      </div>

    </div>
  );
}
