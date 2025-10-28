export interface Review {
  _id: string;
  user: { name: string } | string;
  rating: number;
  comment: string;
  createdAt: string;
}
