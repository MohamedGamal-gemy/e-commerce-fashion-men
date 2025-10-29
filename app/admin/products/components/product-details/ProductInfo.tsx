"use client";

import { Badge } from "@/components/ui/badge";
import { RatingStars } from "../RatingStars";
import { Product, ProductDetails } from "@/types/product";

interface ProductInfoProps {
  details: Product | ProductDetails;
}

export function ProductInfo({ details }: ProductInfoProps) {
  // تحويل أي Product إلى ProductDetails بشكل آمن
  const safeDetails: ProductDetails = {
    _id: details._id,
    title: details.title,
    description: details.description,
    price: details.price,
    rating: details.rating ?? 0,
    subcategory: details.subcategory ?? "N/A",
    createdAt: details.createdAt,
    updatedAt: details.updatedAt,
    totalStock: details.totalStock,
    variants: details.variants,
  };

  return (
    <div className="flex-1 space-y-3">
      <h2 className="text-xl font-semibold text-slate-100">{safeDetails.title}</h2>
      <p className="text-slate-400 text-sm">{safeDetails.description}</p>

      <div className="mt-3">
        <Badge
          variant="outline"
          className="border-indigo-600 text-indigo-400 text-xs px-2 py-0.5"
        >
          {safeDetails.subcategory}
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <p className="text-green-400 font-semibold text-lg">
          ${safeDetails.price?.toFixed(2)}
        </p>
        <RatingStars rating={safeDetails.rating} />
      </div>
    </div>
  );
}
