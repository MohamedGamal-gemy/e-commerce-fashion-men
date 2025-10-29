"use client";

import { ReviewsSummary } from "./ReviewsSummary";
import { ReviewItem } from "./ReviewItem";
import { ReviewForm } from "./ReviewForm";
import { useReviews } from "../../hooks/useReviews";
import { Review } from "@/types/review";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { data, isLoading, isError, addReview } = useReviews(productId);

  const reviews: Review[] = data?.reviews || [];

  if (isLoading) {
    return <p className="text-slate-400">Loading reviews...</p>;
  }

  if (isError) {
    return <p className="text-red-400">Failed to load reviews.</p>;
  }

  return (
    <div className="mt-10 border-t border-slate-800 pt-8">
      {/* Summary */}
      <ReviewsSummary reviews={reviews} />

      {/* Reviews List */}
      <div className="mt-8 space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))
        ) : (
          <p className="text-slate-500 text-sm italic">
            No reviews yet. Be the first to review this product.
          </p>
        )}
      </div>

      {/* Review Form */}
      <ReviewForm
        productId={productId}
        onSubmit={(formData) => addReview.mutate(formData)}
        isSubmitting={addReview.isPending}
      />
    </div>
  );
}
