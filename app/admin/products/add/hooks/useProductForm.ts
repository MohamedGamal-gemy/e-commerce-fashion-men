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

  // const onSubmit = (data: ProductFormData) => {
  //   const formData = new FormData();

  //   const variantIndexes: number[] = [];

  //   const payload = {
  //     title: data.title,
  //     description: data.description,
  //     price: data.price,
  //     category: data.category,
  //     subcategory: data.subcategory,
  //     variants: data.variants.map((v: any) => {
  //       return {
  //         color: v.color,
  //         sizes: v.sizes,
  //         images: v.images.filter((img: any) => img.url),
  //       };
  //     }),
  //   };

  //   // Files Add FormData
  //   data.variants.forEach((variant: any, variantIdx: number) => {
  //     variant.images.forEach((img: any) => {
  //       if (img.file) {
  //         formData.append("variantImages", img.file);
  //         variantIndexes.push(variantIdx);
  //       }
  //     });
  //   });

  //   formData.append("variantIndexes", JSON.stringify(variantIndexes));

  //   formData.append("payload", JSON.stringify(payload));

  //   if (page === "edit") {
  //     // editProduct.mutate(
  //     //   { id: product._id, data: formData },
  //     //   {
  //     //     onSuccess: async (res) => {
  //     //       toast.success(res?.message || "✅ Product updated successfully!");
  //     //       // await reRenderProducts();
  //     //     },
  //     //     onError: (err) => {
  //     //       toast.error(err?.response?.data?.message || "❌ Update failed");
  //     //     },
  //     //   }
  //     // );
  //   } else {
  //     addProduct.mutate(formData, {
  //       onSuccess: async (res) => {
  //         toast.success(res?.message || "✅ Product added successfully!");
  //         // await reRenderProducts();
  //         methods.reset();
  //       },
  //       onError: (err) => {
  //         toast.error(err?.response?.data?.message || "❌ Add failed");
  //       },
  //     });
  //   }
  // };

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    // 🧱 Basic product data
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("category", data.category); // ✅ لازم
    formData.append("subcategory", data.subcategory || "");
    formData.append("sku", data.sku || "");
    formData.append("isFeatured", String(data.isFeatured || false));

    // 🖼️ Main Image
    // if (data.mainImage instanceof File) {
    //   formData.append("mainImage", data.mainImage);
    // }

    // 🧩 Variants
    const formattedVariants = data.variants.map((v) => ({
      color: v.color,
      sizes: v.sizes,
      isDefault: v.isDefault || false,
      images: [], // backend هيضيف الصور بعد الرفع
    }));

    formData.append("variants", JSON.stringify(formattedVariants));

    // 📸 Variant Images
    data.variants.forEach((variant, index) => {
      variant.images.forEach((img) => {
        if (img.file) {
          formData.append(`variantImages_${index}`, img.file);
        }
      });
    });

    // 📨 إرسال الطلب
    addProduct.mutate(formData, {
      onSuccess: async (res) => {
        toast.success(res?.message || "✅ Product added successfully!");
        // await reRenderProducts();
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
