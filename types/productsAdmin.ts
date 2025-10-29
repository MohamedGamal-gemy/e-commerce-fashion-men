export interface ProductAdmin {
  _id: string;
  title: string;
  price: number;
  rating: number;
  totalStock: number;
  createdAt: string;
  mainImage: string;
  subcategory: string;
}

export interface ProductsAdminResponse {
  products: ProductAdmin[];
  total: number;
  page: number;
  pages: number;
}
