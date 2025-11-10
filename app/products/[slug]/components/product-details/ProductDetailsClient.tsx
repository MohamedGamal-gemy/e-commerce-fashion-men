"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import ProductGallery from "./ProductGallery";
import ProductSummary from "../ProductSummary";
import { ProductReviews } from "../reviews/ProductReviews";

interface Props {
  product: Product;
  sessionId: string | null;
}

export default function ClientProductDetails({ product, sessionId }: Props) {
  // Selected variant id, size and active image index
  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
// console.log(product);

  // initial set
  useEffect(() => {
    if (product?.variants?.length) {
      setActiveVariantId(product?.variants[0]._id);
      setActiveImageIndex(0);
      setActiveSize(product?.variants[0].sizes?.[0]?.size ?? null);
    }
  }, [product]);

  const activeVariant = useMemo(() => {
  
    return (
      product?.variants?.find((v) => v._id === activeVariantId) ??
      product?.variants[0]
    );
  }, [product.variants, activeVariantId]);

  // when variant changes update image index and size
  useEffect(() => { 
    setActiveImageIndex(0);
    setActiveSize(activeVariant?.sizes?.[0]?.size ?? null);
  }, [activeVariantId, activeVariant]);

  const allImages = activeVariant?.images ?? [];

  const handleSelectVariant = useCallback((variantId: string) => {
    setActiveVariantId(variantId);
  }, []);

  const handleSelectSize = useCallback((size: string) => {
    setActiveSize(size);
  }, []);

  const handleImageChange = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

  // calculate stock for selected size
  const selectedStock = useMemo(() => {
    return activeVariant?.sizes?.find((s) => s.size === activeSize)?.stock ?? 0;
  }, [activeVariant, activeSize]);

  return (
    // <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* LEFT: gallery + thumbnails */}
      <section className="">
        <ProductGallery
          images={allImages}
          activeIndex={activeImageIndex}
          onChangeIndex={handleImageChange}
          title={product.title}
        />
      </section>

      {/* RIGHT: sticky details */}
      <aside className="lg:sticky top-24">
        <ProductSummary
          product={product}
          activeVariant={activeVariant}
          activeSize={activeSize || ""}
          selectedStock={selectedStock}
          onSelectVariant={handleSelectVariant}
          onSelectSize={handleSelectSize}
          sessionId={sessionId}
        />
      </aside>
      {/* <ProductReviews productId={product._id} /> */}
    </div>
  );
}
