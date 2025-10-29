"use client";

import Image from "next/image";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./RatingStars";
import { ProductDetailsDialog } from "./product-details/ProductDetailsDialog";
import { ProductActions } from "./ProductActions";
import type { ProductAdmin } from "@/types/productsAdmin";

interface ProductRowProps {
  product: ProductAdmin;
}

export function ProductRow({ product }: ProductRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className="border-slate-800 hover:bg-slate-900/40 transition-colors">
        {/* ✅ Product Image + Title */}
        <TableCell className="flex items-center gap-3">
          <div className="relative w-14 h-14 overflow-hidden rounded-lg border border-slate-800 shadow-sm bg-slate-900">
            {product.mainImage ? (
              <Image
                src={product.mainImage}
                alt={product.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                No image
              </div>
            )}
          </div>
          <p className="font-medium text-slate-100 line-clamp-2">
            {product.title}
          </p>
        </TableCell>

        {/* ✅ Subcategory */}
        <TableCell className="text-slate-400 capitalize">
          {product.subcategory || "—"}
        </TableCell>

        {/* ✅ Price */}
        <TableCell className="text-center text-green-400 font-semibold">
          ${product.price?.toFixed(2)}
        </TableCell>

        {/* ✅ Stock */}
        <TableCell
          className={`text-center font-medium ${product.totalStock > 0 ? "text-emerald-400" : "text-red-400"
            }`}
        >
          {product.totalStock}
        </TableCell>

        {/* ✅ Rating */}
        <TableCell className="text-center">
          <RatingStars rating={product.rating || 0} />
        </TableCell>

        {/* ✅ Status */}
        <TableCell className="text-center">
          <Badge
            variant="outline"
            className={`px-2 py-0.5 text-xs rounded-full ${product.totalStock > 0
                ? "border-emerald-500 text-emerald-400"
                : "border-red-500 text-red-400"
              }`}
          >
            {product.totalStock > 0 ? "Active" : "Out of Stock"}
          </Badge>
        </TableCell>

        {/* ✅ Actions */}
        <TableCell className="text-center">
          <ProductActions
            row={product}
            onOpenDetails={() => setOpen(true)}
            onEdit={() => console.log("Edit product", product._id)}
          />
        </TableCell>
      </TableRow>

      <ProductDetailsDialog
        open={open}
        onClose={() => setOpen(false)}
        id={product._id}
      />
    </>
  );
}
