"use client";

import { ProductDetailsDialog } from "@/app/admin/products/components/product-details/ProductDetailsDialog";
import { Card } from "@/components/ui/card";
import { Product, ProductVariant } from "@/types/productList";
import Link from "next/link";
import { useState } from "react";
import { CardMedia, QuickViewButton, RatingBadge, VariantStrip, CardInfo } from "./product-card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);

  const activeVariantData = product.variants?.[activeVariant];
  const mainImage = activeVariantData?.mainImage || "/placeholder.png";
  const secondImage = activeVariantData?.secondImage || mainImage;

  const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent navigation
    e.stopPropagation(); // stop bubbling (important inside Link)
    setOpen(true);
  };

  return (
    <Link href={`products/${product._id}`}>
      <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b
       from-slate-700/40 via-slate-700/10 to-transparent hover:from-sky-500/20
        hover:via-purple-500/10 hover:to-transparent transition-colors duration-300">
        {/* hover glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity 
        duration-500 group-hover:opacity-100" aria-hidden />
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden p-0 bg-slate-900/90 backdrop-blur-xs border
           border-slate-800 rounded-2xl shadow-md hover:shadow-sky-900/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
        >
          <div className="relative h-[19rem] w-full overflow-hidden">
            <CardMedia
              title={product.title}
              mainImage={mainImage}
              secondImage={secondImage}
              hovered={hovered}
            />

            <QuickViewButton onClick={handleQuickView} />

            {product.rating ? (
              <RatingBadge rating={product.rating} />
            ) : null}

            {product.variants?.length && product.variants.length > 1 ? (
              <VariantStrip
                variants={product.variants as ProductVariant[]}
                activeIndex={activeVariant}
                onSelect={(i: number, e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveVariant(i);
                }}
                onHoverStart={() => setHovered(false)}
              />
            ) : null}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-transparent" />

          <CardInfo
            title={product.title}
            subcategory={product.subcategory || "General"}
            price={product.price}
          />
        </Card>
      </div>

      <ProductDetailsDialog
        mode="user"
        open={open}
        onClose={() => setOpen(false)}
        id={product._id}
      />
    </Link>
  );
}
