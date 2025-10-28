"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";
import { ProductVariants } from "./ProductVariants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // ✅ من shadcn
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

async function getProductDetails(id: string) {
  const res = await fetch(`http://localhost:9000/api/products/admin/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}

export function ProductDetailsDialog({
  open,
  onClose,
  id,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  mode?: "admin" | "user";
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-product-details", id],
    queryFn: () => getProductDetails(id),
    enabled: open,
  });

  const details = data?.product;
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (details?.variants?.length) {
      const first = details.variants[0];
      setSelectedVariant(first);
      setMainImage(first.images?.[0]?.url || "/placeholder.png");
      setSelectedSize(first.sizes[0].size);
    }
  }, [details]);

  if (!details) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* <DialogContent
        className="max-w-5xl h-[90vh] bg-slate-950 border
       border-slate-800 text-slate-200 overflow-hidden"
      > */}
      <DialogContent className="bg-slate-900 text-slate-100 border border-slate-800 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-100 text-xl font-semibold">
            Product Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[30rem] pr-2">
          {isLoading ? (
            <p className="text-center text-slate-400 py-10">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">
              Failed to load details ❌
            </p>
          ) : (
            <div className="space-y-6 pb-6">
              <div className="flex flex-col md:flex-row gap-8">
                <ProductImages
                  mainImage={mainImage}
                  setMainImage={setMainImage}
                  variant={selectedVariant}
                  title={details.title}
                />
                <ProductInfo details={details} />
              </div>

              <Separator className="bg-slate-800 -mt-4" />

              <ProductVariants
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
                variants={details.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={(variant) => {
                  setSelectedVariant(variant);
                  setMainImage(variant.images?.[0]?.url || "/placeholder.png");
                  setSelectedSize(null);
                }}
              />
              {mode === "user" && (
                <Button
                  // onClick={onClick}
                  className="mt-6 w-full bg-sky-600 hover:bg-sky-500 text-white font-medium
                transition-all duration-200 flex items-center justify-center gap-2
                rounded-xl shadow-sm shadow-sky-800/30"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              )}
            </div>
          )}
          <ScrollBar
            orientation="vertical"
            className="bg-slate-900/60 hover:bg-slate-800/80 transition-colors
                       [&_[data-orientation=vertical]_div]:bg-sky-600/60
                       [&_[data-orientation=vertical]_div:hover]:bg-sky-500"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
