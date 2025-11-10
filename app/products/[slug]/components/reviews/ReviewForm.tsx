"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ReviewInput } from "../../hooks/useReviews";

export function ReviewForm({
  productId,
  onSubmit,
  isSubmitting,
}: {
  productId: string;
  onSubmit: (data: ReviewInput) => void;
  isSubmitting?: boolean;
}) {
  const [hover, setHover] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<ReviewInput>({
    defaultValues: { product: productId, rating: 0, comment: "" },
  });

  const rating = watch("rating");

  const handleRating = (s: number) => setValue("rating", s);

  const submitHandler = handleSubmit((data) => {
    onSubmit(data);
    reset({ product: productId, rating: 0, comment: "" });
  });

  return (
    <form onSubmit={submitHandler} className="mt-10 border-t border-slate-800 pt-6">
      <h4 className="text-slate-200 mb-2 font-semibold text-lg">
        Leave a Review
      </h4>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            onClick={() => handleRating(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            className={`w-6 h-6 cursor-pointer transition ${
              s <= (hover || rating)
                ? "fill-sky-400 text-sky-400"
                : "text-slate-600"
            }`}
          />
        ))}
      </div>

      <Textarea
        {...register("comment", { required: true })}
        placeholder="Write your comment..."
        className="bg-slate-950 border-slate-800 text-slate-200 mb-3"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-sky-600 hover:bg-sky-500 text-white font-medium flex items-center gap-2"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
