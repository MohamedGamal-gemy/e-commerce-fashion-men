// import z from "zod";

// export const productSchema = z.object({
//   title: z.string().trim().min(3, "Title must be at least 3 characters"),

//   price: z.number().min(2, { message: "Price must be at least 2" }),

//   description: z.string().min(10, "Description must be at least 10 characters"),

//   // category: z.string().min(1, "Category is required"),
//   subcategory: z.string().min(1, "Subcategory is required"),
//   variants: z
//     .array(
//       z.object({
//         color: z.object({
//           name: z.string().min(1, "Color name is required"),
//           value: z.string().min(1, "Color value is required"),
//         }),
//         sizes: z
//           .array(
//             z.object({
//               size: z.string().min(1, "Size is required"),
//               stock: z.preprocess(
//                 (val) => Number(val),
//                 z.number().min(1, "Stock must be at least 1")
//               ),
//             })
//           )
//           .min(1, "At least one size is required"),
//         images: z.array(z.any()),
//         // .array(z.instanceof(File))
//         // .min(1, "At least one image is required"),
//       })
//     )
//     .min(1, "At least one variant is required"),
// });

// export type ProductFormData = z.infer<typeof productSchema>;


import z from "zod";

/**
 * Frontend Zod schema aligned with backend expectations:
 * - variants[].sku (string)
 * - variants[].color { name, value } (value = hex or color string)
 * - variants[].sizes = [{ size, stock }]
 * - variants[].images = [{ file?: File, url?: string }]
 * - mainImage can be File (for new) or string URL (for edit)
 * - tags/colorOptions/sizeOptions as arrays of strings
 * - sku, originalPrice, isFeatured optional
 */

const sizeItem = z.object({
  size: z.string().trim().min(1, "Size is required"),
  stock: z.preprocess((v) => {
    // allow string numbers from inputs
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  }, z.number().min(0, "Stock must be >= 0")),
});

const variantImage = z.object({
  // either a File (when user selected a new image) or an existing URL string (when editing)
  file: z.instanceof(File).optional(),
  url: z.string().url().optional(),
});

const variantItem = z.object({
  sku: z.string().trim().optional(), // optional if you don't force sku client-side
  color: z.object({
    name: z.string().trim().min(1, "Color name is required"),
    value: z.string().trim().min(1, "Color value is required"), // e.g. "#000000"
  }),
  sizes: z.array(sizeItem).min(1, "At least one size is required"),
  images: z.array(variantImage).optional().default([]),
  isDefault: z.boolean().optional().default(false),
});

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional().nullable(),

  price: z.preprocess((v) => Number(v), z.number().min(0, "Price must be >= 0")),
  originalPrice: z.preprocess((v) => {
    if (v === undefined || v === null || v === "") return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? v : n;
  }, z.number().min(0).optional()),

  // Category/Subcategory: backend expects category id and subcategory id
  category: z.string().optional().nullable(),
  subcategory: z.string().min(1, "Subcategory is required"),

  sku: z.string().optional().nullable(),

  tags: z.array(z.string()).optional().default([]),
  colorOptions: z.array(z.string()).optional().default([]),
  sizeOptions: z.array(z.string()).optional().default([]),

  isFeatured: z.boolean().optional().default(false),

  // Accept File (new upload) or url (existing image) — optional because form may be edit without changing mainImage
  // mainImage: z.union([z.instanceof(File), z.string().url()]).optional(),

  // Variants array (must exist and at least 1)
  variants: z.array(variantItem).min(1, "At least one variant is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type VariantFormData = z.infer<typeof variantItem>;
