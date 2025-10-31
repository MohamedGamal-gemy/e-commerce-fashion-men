import z from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  price: z.number().min(2, { message: "Price must be at least 2" }),

  description: z.string().min(10, "Description must be at least 10 characters"),

  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  variants: z
    .array(
      z.object({
        color: z.object({
          name: z.string().min(1, "Color name is required"),
          value: z.string().min(1, "Color value is required"),
        }),
        sizes: z
          .array(
            z.object({
              size: z.string().min(1, "Size is required"),
              stock: z.preprocess(
                (val) => Number(val),
                z.number().min(1, "Stock must be at least 1")
              ),
            })
          )
          .min(1, "At least one size is required"),
        images: z.array(z.any()),
        // .array(z.instanceof(File))
        // .min(1, "At least one image is required"),
      })
    )
    .min(1, "At least one variant is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;