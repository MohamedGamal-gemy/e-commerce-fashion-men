export interface VariantImage {
  _id: string;
  url: string;
}

export interface Size {
  _id: string;
  size: string;
  stock: number;
}

export interface Variant {
  _id: string;
  productId: string;
  color: { name: string; value: string };
  images: VariantImage[];
  sizes: Size[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  subcategory?: string;
  totalStock?: number;
  variants: Variant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  product: Product;
}
