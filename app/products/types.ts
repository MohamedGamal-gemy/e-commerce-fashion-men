export interface Product {
  _id: string;
  name: string;
  // Add other product fields as needed
}

export interface Subcategory {
  _id: string;
  name: string;
}

export interface Color {
  colorName: string;
  colorValue: string;
}

export interface ProductsData {
  products: Product[];
  pagination: {
    totalPages: number;
  };
}
