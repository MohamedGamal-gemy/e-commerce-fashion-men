// نوع المستخدم المرتبط بالمراجعة
export interface ReviewUser {
  _id: string;
  name?: string; // optional if you want to show username
}

// نوع المراجعة
export interface Review {
  _id: string;
  product: string;
  user: ReviewUser;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// النوع اللي بيرجعه hook أو fetch
export interface ReviewsResponse {
  reviews: Review[];
  numReviews: number;
  averageRating: number;
}
