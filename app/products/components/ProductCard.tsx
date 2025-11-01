"use client";

import ImgTest from "@/public/uolvk4comyjidevwaihp-removebg-preview.png";
import { ProductDetailsDialog } from "@/app/admin/products/components/product-details/ProductDetailsDialog";
import { Card } from "@/components/ui/card";
import { Product, ProductVariant } from "@/types/productList";
import Link from "next/link";
import { useState } from "react";
import {
  CardMedia,
  QuickViewButton,
  RatingBadge,
  VariantStrip,
  CardInfo,
} from "./product-card";

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
      <div className="group relative ">
        {/* hover glow */}
        {/* <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity 
        duration-500 group-hover:opacity-100"
          aria-hidden
        /> */}
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden py-0  
            backdrop-blur-xs border
           border-white/15 rounded-md shadow-md hover:shadow-sky-900/30 transition-all
            duration-300 group-hover:-translate-y-1 group-hover:shadow-lg h-[22rem]  "
        >
          <div className="relative h-full w-full   bg-gradient-to-br to-gray-800
           via-black/60
           from-gray-800">
            <CardMedia
              title={product.title}
              mainImage={mainImage}
            // mainImage={ImgTest}
            // secondImage={secondImage}
            // hovered={hovered}
            />

            <QuickViewButton onClick={handleQuickView} />

            {product.rating ? <RatingBadge rating={product.rating} /> : null}

            {/* {product.variants?.length && product.variants.length > 1 ? (
              <VariantStrip
                variants={product.variants as ProductVariant[]}
                activeIndex={activeVariant}
                onSelect={(
                  i: number,
                  e: React.MouseEvent<HTMLButtonElement>
                ) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveVariant(i);
                }}
                onHoverStart={() => setHovered(false)}
              />
            ) : null} */}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black  via-gray-800/20" />

          <CardInfo
            title={product.title}
            subcategory={product.subcategory || "General"}
            price={product.price}
            variants={product.variants}
            activeVariant={activeVariant}
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
