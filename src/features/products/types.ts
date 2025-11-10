// src/features/products/types.ts
export interface ColorOption {
  name: string;
  value: string;
  count?: number;
}

export interface ProductType {
  _id: string;
  name: string;
  isActive?: boolean;
  order?: number;
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  __v?: number;
  dynamicProductCount?: number;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  totalStock?: number;
  isAvailable?: boolean;
  rating?: number;
  numReviews?: number;
  status?: string;
  createdAt?: string;
  slug?: string;
  colorPreviews?: Array<{ color: { name: string; value: string }; previewImage: string }>;
  productTypeName?: string;
}

export interface ProductsResponse {
  products: Product[];
  count: number;
  total: number;
  limit: number;
  page: number;
  totalPages: number;
}
