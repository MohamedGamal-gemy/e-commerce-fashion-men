"use client";

import { Review } from "@/types/review";
import { Star, User } from "lucide-react";
// import { Review } from "@/types/review";

export function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="border border-slate-800 rounded-xl p-4 hover:bg-slate-900/60 transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          {/* <User className="w-5 h-5 text-slate-400" /> {review.user} */}
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${
                s <= review.rating
                  ? "fill-sky-400 text-sky-400"
                  : "text-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-slate-300 text-sm mt-2">{review.comment}</p>
      <p className="text-xs text-slate-500 mt-1">{review.createdAt}</p>
    </div>
  );
}
