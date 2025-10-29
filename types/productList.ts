
export interface ProductVariant {
  _id: string;
  color: string;          
  mainImage: string;      
  secondImage?: string;  
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  rating?: number;
  subcategory?: string;
  variants?: ProductVariant[]; 
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
// export interface Pagination {
//   totalPages: number;
//   currentPage: number;
//   pageSize: number;
//   totalItems: number;
// }

export interface ProductsResponse {
  products: Product[];
  pagination?: Pagination;
}
