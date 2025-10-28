"use client";

import { Badge } from "@/components/ui/badge";
import { RatingStars } from "../RatingStars";

export function ProductInfo({ details }: { details: any }) {
  return (
    <div className="flex-1 space-y-3">
      <h2 className="text-xl font-semibold text-slate-100">{details.title}</h2>
      <p className="text-slate-400 text-sm">{details.description}</p>

      <div className="mt-3">
        <Badge
          variant="outline"
          className="border-indigo-600 text-indigo-400 text-xs px-2 py-0.5"
        >
          {details.subcategory}
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <p className="text-green-400 font-semibold text-lg">
          ${details.price?.toFixed(2)}
        </p>
        <RatingStars rating={details.rating || 0} />
      </div>
    </div>
  );
}
