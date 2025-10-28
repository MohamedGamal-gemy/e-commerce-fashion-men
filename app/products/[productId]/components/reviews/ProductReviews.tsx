// "use client";

// import { useState } from "react";
// import { Star, User, Send } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";

// interface Review {
//   id: string;
//   user: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// export default function ProductReviews({
//   reviews = [],
// }: {
//   reviews: Review[];
// }) {
//   const [rating, setRating] = useState<number>(0);
//   const [hover, setHover] = useState<number>(0);
//   const [comment, setComment] = useState("");

//   const total = reviews.length;
//   const avg =
//     total > 0
//       ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
//       : "0";

//   const handleSubmit = () => {
//     if (!rating || !comment.trim()) return;
//     alert(`✅ Review submitted with ${rating} stars and comment: ${comment}`);
//     setComment("");
//     setRating(0);
//   };

//   return (
//     <div className="mt-10 border-t border-slate-800 pt-8">
//       {/* ===== Summary ===== */}
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="flex flex-col items-center justify-center md:w-1/3">
//           <h3 className="text-5xl font-semibold text-sky-400">{avg}</h3>
//           <div className="flex gap-1 mt-1">
//             {[1, 2, 3, 4, 5].map((s) => (
//               <Star
//                 key={s}
//                 className={`w-5 h-5 ${
//                   s <= Math.round(Number(avg))
//                     ? "fill-sky-400 text-sky-400"
//                     : "text-slate-600"
//                 }`}
//               />
//             ))}
//           </div>
//           <p className="text-slate-400 text-sm mt-2">{total} Reviews</p>
//         </div>

//         <div className="flex-1 space-y-2">
//           {[5, 4, 3, 2, 1].map((s) => {
//             const count = reviews.filter((r) => r.rating === s).length;
//             const percent = total ? (count / total) * 100 : 0;
//             return (
//               <div key={s} className="flex items-center gap-3">
//                 <span className="text-slate-400 w-3">{s}</span>
//                 <Progress value={percent} className="h-2 flex-1" />
//                 <span className="text-xs text-slate-500 w-8 text-right">
//                   {count}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ===== Reviews ===== */}
//       <div className="mt-8 space-y-6">
//         {reviews.length ? (
//           reviews.map((r) => (
//             <motion.div
//               key={r.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="border border-slate-800 rounded-xl p-4 hover:bg-slate-900/60 transition"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 text-slate-200 font-medium">
//                   <User className="w-5 h-5 text-slate-400" /> {r.user}
//                 </div>
//                 <div className="flex gap-1">
//                   {[1, 2, 3, 4, 5].map((s) => (
//                     <Star
//                       key={s}
//                       className={`w-4 h-4 ${
//                         s <= r.rating
//                           ? "fill-sky-400 text-sky-400"
//                           : "text-slate-600"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//               <p className="text-slate-300 text-sm mt-2">{r.comment}</p>
//               <p className="text-xs text-slate-500 mt-1">{r.createdAt}</p>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-slate-500 text-sm italic">
//             No reviews yet. Be the first to review this product.
//           </p>
//         )}
//       </div>

//       {/* ===== Add Review ===== */}
//       <div className="mt-10 border-t border-slate-800 pt-6">
//         <h4 className="text-slate-200 mb-2 font-semibold text-lg">
//           Leave a Review
//         </h4>
//         <div className="flex gap-1 mb-3">
//           {[1, 2, 3, 4, 5].map((s) => (
//             <Star
//               key={s}
//               onClick={() => setRating(s)}
//               onMouseEnter={() => setHover(s)}
//               onMouseLeave={() => setHover(0)}
//               className={`w-6 h-6 cursor-pointer transition ${
//                 s <= (hover || rating)
//                   ? "fill-sky-400 text-sky-400"
//                   : "text-slate-600"
//               }`}
//             />
//           ))}
//         </div>
//         <Textarea
//           placeholder="Write your comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="bg-slate-950 border-slate-800 text-slate-200 mb-3"
//         />
//         <Button
//           onClick={handleSubmit}
//           disabled={!rating || !comment.trim()}
//           className="bg-sky-600 hover:bg-sky-500 text-white font-medium flex items-center gap-2"
//         >
//           <Send className="w-4 h-4" />
//           Submit Review
//         </Button>
//       </div>
//     </div>
//   );
// }


"use client";

import { ReviewsSummary } from "./ReviewsSummary";
import { ReviewItem } from "./ReviewItem";
import { ReviewForm } from "./ReviewForm";
import { useReviews } from "../../hooks/useReviews";

export function ProductReviews({ productId }: { productId: string }) {
  const { data, isLoading, isError, addReview } = useReviews(productId);

  const reviews = data?.reviews || [];

  if (isLoading)
    return <p className="text-slate-400">Loading reviews...</p>;

  if (isError)
    return <p className="text-red-400">Failed to load reviews.</p>;

  return (
    <div className="mt-10 border-t border-slate-800 pt-8">
      <ReviewsSummary reviews={reviews} />

      <div className="mt-8 space-y-6">
        {reviews.length ? (
          reviews.map((r: any) => <ReviewItem key={r._id} review={r} />)
        ) : (
          <p className="text-slate-500 text-sm italic">
            No reviews yet. Be the first to review this product.
          </p>
        )}
      </div>

      <ReviewForm
        productId={productId}
        onSubmit={addReview.mutate}
        isSubmitting={addReview.isPending}
      />
    </div>
  );
}
