// Represents a single variant of a product (e.g. color option)
export interface ProductVariant {
  _id: string;
  color: string;          // e.g. "Red", "Blue"
  mainImage: string;      // primary image URL
  secondImage?: string;   // optional secondary image URL
}

// Represents a full product entity
export interface Product {
  _id: string;
  title: string;
  price: number;
  rating?: number;        // optional if not yet rated
  subcategory?: string;   // optional for flexibility
  variants?: ProductVariant[]; // optional in case some products have none
}

// Pagination metadata for paginated product results
export interface Pagination {
  total: number;       // total number of products overall
  page: number;        // current page number
  limit: number;       // items per page
  totalPages: number;  // total number of pages
}

// Response shape from the products API endpoint
export interface ProductsResponse {
  products: Product[];
  pagination?: Pagination; // optional in case API sometimes omits it
}
