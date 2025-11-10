import { z } from "zod";

// Size item
const sizeItem = z.object({
  size: z.string().trim().min(1, "Size is required"),
  stock: z.preprocess((v) => {
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  }, z.number().min(0, "Stock must be >= 0")),
});

// Variant image
const variantImage = z.object({
  file: z.instanceof(File).optional(),
  url: z.string().url().optional(),
});

// Variant item
const variantItem = z.object({
  sku: z.string().trim().optional(),
  color: z.object({
    name: z.string().trim().min(1, "Color name is required"),
    value: z.string().trim().min(1, "Color value is required"),
  }),
  sizes: z
    .array(sizeItem)
    .min(1, "At least one size is required")
    .refine(
      (sizes) => {
        const sizeNames = sizes.map((s) => s.size.toLowerCase());
        return new Set(sizeNames).size === sizeNames.length;
      },
      { message: "Sizes within a variant must be unique" }
    ),
  images: z.array(variantImage).optional().default([]),
  isDefault: z.boolean().optional().default(false),
});

// Variants array
const variantsSchema = z
  .array(variantItem)
  .min(1, "At least one variant is required")
  .refine(
    (variants) => {
      const colors = variants.map((v) => v.color.name.toLowerCase());
      return new Set(colors).size === colors.length;
    },
    { message: "Each variant must have a unique color" }
  );

// Product schema
export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  price: z.preprocess(
    (v) => Number(v),
    z.number().min(0, "Price must be >= 0")
  ),
  originalPrice: z.preprocess((v) => {
    if (!v) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  }, z.number().min(0).optional()),

  productType: z.string().min(1, "Product Type is required"),
  tags: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),

  variants: variantsSchema,
});

export type ProductFormData = z.infer<typeof productSchema>;
export type VariantFormData = z.infer<typeof variantItem>;
