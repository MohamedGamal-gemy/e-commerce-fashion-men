export interface Subcategory {
  _id: string;
  name: string;
  __v?: string
}

export interface Color {
  colorName: string;
  colorValue: string;
}

// Represents a selectable product type/category used in filtering
export interface ProductType {
  _id: string;
  name: string;
}
