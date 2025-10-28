"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function ProductQuickView({ open, onOpenChange, productId }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:9000/api/products/admin/${productId}`);
      return res.json();
    },
    enabled: open, // 👈 لا يجلب البيانات إلا لما يُفتح المودال
  });

  const product = data?.product;

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
              {/* Images */}
              <div className="relative h-64 w-full">
                <Image
                  src={product.variants?.[0]?.images?.[0]?.url || product.variants?.[0]?.mainImage}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-sky-400 font-semibold mb-2">
                    {product.price} EGP
                  </p>
                  <p className="text-sm text-slate-300 mb-3">{product.subcategory}</p>
                  <p className="text-sm text-slate-400 line-clamp-5">
                    {product.description || "No description available."}
                  </p>
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
