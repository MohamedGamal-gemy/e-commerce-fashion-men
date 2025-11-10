// src/features/products/components/ProductCard.tsx
"use client";
import React from "react";
import type { Product } from "../types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  // const preview = product.colorPreviews?.[0];
  return (
    <div
      className="rounded-xl border border-slate-700 bg-gradient-to-br to-slate-800 from-black  p-2
      hover:bg-gradient-to-bl duration-300   transition-all"
      // className="rounded-xl border border-slate-800 bg-gradient-to-br to-slate-900/60 from-slate-700/80 p-3
      // hover:bg-gradient-to-bl duration-300   transition-all"
    >
      <div className="aspect-square   h-[20rem] w-full overflow-hidden rounded-lg bg-slate-800 mb-3">
        <Link href={`/products/${product.slug}`}>
          {product?.mainImage ? (
            <Image
              priority={true}
              width={500}
              height={500}
              src={product?.mainImage}
              alt={product.title}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-slate-600 text-sm">
              No image
            </div>
          )}
        </Link>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="">
          <h3
            className="text-slate-200 text-sm font-medium  truncate"
            title={product.title}
          >
            {product.title}
          </h3>
          {product.productTypeName && (
            <p className="text-slate-500 text-xs my-1">
              {product.productTypeName}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-slate-100 font-semibold ">
          {product.price.toFixed(0)} EGP
        </div>

        <div className="flex gap-2 items-center ">
          {product?.colors?.map((color) => (
            <div key={color._id} className="">
              <Image
                width={80}
                height={80}
                src={color.image}
                alt={product.title}
                className=" w-10 h-10  object-cover object-top rounded-md "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
