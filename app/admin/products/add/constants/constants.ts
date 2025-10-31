import { ProductFormData } from "../schemas/productSchema";

export const steps = [
  { id: 0, title: "Basic" },
  { id: 1, title: "Variants" },
  { id: 2, title: "Review" },
];

export const fieldsToValidate: { [key: number]: (keyof ProductFormData)[] } = {
  0: ["title", "description", "price", "category", "subcategory"],
  1: ["variants"],
};

export const dataFields = [
  {
    name: "title",
    placeholder: "Product Title",
    label: "Title",
    type: "text",
  },
  {
    name: "price",
    placeholder: "Product Price",
    label: "Price",
    type: "number",
  },
  {
    name: "description",
    placeholder: "Product Description",
    label: "Description",
    type: "textarea",
  },
];