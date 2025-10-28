"use client";

import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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

      {/* <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map((s) => {
          const count = reviews.filter((r) => r.rating === s).length;
          const percent = total ? (count / total) * 100 : 0;
          return (
            <div key={s} className="flex items-center gap-3">
              <span className="text-slate-400 w-3">{s}</span>
              <Progress value={percent} className="h-2 flex-1" />
              <span className="text-xs text-slate-500 w-8 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
