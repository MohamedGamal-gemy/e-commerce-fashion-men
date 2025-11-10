import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fieldsToValidate, steps } from "../constants/constants";
import { toast } from "sonner";
import { useAdminProducts } from "../store/adminProducts";
import { ProductFormData, productSchema } from "../schemas/productSchema";
import axios from "axios";

const useProductForm = ({
  page,
  product = null,
}: {
  page: "edit" | "add";
  product: any;
}) => {
  const { addProduct, editProduct } = useAdminProducts();

  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<ProductFormData>({
    defaultValues: {
      variants: [
        {
          color: { name: "", value: "" },
          sizes: [{ size: "", stock: 1 }],
          images: [],
        },
      ],
    },
    mode: "onChange",
    resolver: zodResolver(productSchema),
  });

  // useEffect(() => {
  //   if (page === "edit" && product) {
  //     methods.reset({
  //       title: product.title,
  //       price: Number(product.price),
  //       description: product.description,
  //       category: product.category,
  //       subcategory: product.subcategory,
  //       variants: product?.variants.map((variant: any) => ({
  //         _id: variant._id,
  //         color: {
  //           name: variant.color?.name,
  //           value: variant.color?.value,
  //         },
  //         sizes: variant.sizes?.map((s: any) => ({
  //           size: s.size,
  //           stock: s.stock,
  //         })) || [{ size: "", stock: 1 }],
  //         images: variant.images || [],
  //       })),
  //     });
  //   }
  // }, [page, product, methods]);

const onSubmit = async (data: ProductFormData) => {
  if (!data.variants || !data.variants.length) {
    toast.error("At least one variant is required");
    return;
  }

  const formData = new FormData();

  // Basic product info
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", String(data.price));
  formData.append("productType", data.productType || "");
  formData.append("sku", data.sku || `SKU-${Date.now()}`);
  formData.append("isFeatured", String(data.isFeatured || false));

  // Variants
  const formattedVariants = data.variants.map((v) => ({
    color: v.color,
    sizes: v.sizes,
    isDefault: v.isDefault || false,
    images: [], // backend هيضيف الصور
  }));
  formData.append("variants", JSON.stringify(formattedVariants));

  // Variant images
  data.variants.forEach((variant, index) => {
    variant.images.forEach((img) => {
      if (img.file) {
        formData.append(`variantImages_${index}`, img.file);
      }
    });
  });

  // Send request
  addProduct.mutate(formData, {
    onSuccess: (res) => {
      toast.success(res?.message || "✅ Product added successfully");
      methods.reset();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "❌ Add failed");
    },
  });
};
  const next = async () => {
    const fields = fieldsToValidate[currentStep];
    const isValid = await methods.trigger(fields as any);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return {
    next,
    prev,
    methods,
    steps,
    onSubmit,
    currentStep,
    isPending: addProduct.isPending || editProduct.isPending,
  };
};

export default useProductForm;
