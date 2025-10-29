"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { ProductResponse } from "@/types/product";

interface ProductQuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
}

export function ProductQuickView({
  open,
  onOpenChange,
  productId,
}: ProductQuickViewProps) {
  const { data, isLoading } = useQuery<ProductResponse>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:9000/api/products/admin/${productId}`);
      if (!res.ok) throw new Error("فشل تحميل تفاصيل المنتج");
      return res.json() as Promise<ProductResponse>;
    },
    enabled: open, // ✅ Fetches only when modal is open
  });

  const product = data?.product;

  const firstVariant = product?.variants?.[0];
  const firstImage = firstVariant?.images?.[0]?.url ?? "/placeholder.png";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-900 border border-slate-800 text-slate-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-60">
            <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
          </div>
        ) : product ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-100">
                {product.title}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Product image */}
              <div className="relative h-64 w-full">
                <Image
                  src={firstImage}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product info */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sky-400 font-semibold mb-2">
                    {product.price.toLocaleString()} EGP
                  </p>
                  <p className="text-sm text-slate-300 mb-3">
                    {product.subcategory ?? "Uncategorized"}
                  </p>
                  <p className="text-sm text-slate-400 line-clamp-5">
                    {product.description || "No description available."}
                  </p>

                  {/* Variant Colors */}
                  {product.variants?.length > 1 && (
                    <div className="mt-3 flex gap-2 items-center">
                      {product.variants.map((variant) => (
                        <div
                          key={variant._id}
                          title={variant.color.name}
                          className="w-6 h-6 rounded-full border border-slate-600"
                          style={{ backgroundColor: variant.color.value }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <button className="w-full bg-sky-600 hover:bg-sky-700 transition text-white py-2 rounded-lg font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-slate-400">Product not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
