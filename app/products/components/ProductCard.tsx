import { ProductDetailsDialog } from "@/app/admin/products/components/product-details/ProductDetailsDialog";
import { Card } from "@/components/ui/card";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);
  const variant = product.variants?.[activeVariant];

  return (
    <Link href={`products/${product._id}`}>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden p-0 bg-slate-900 border border-slate-800 rounded-xl 
        shadow-md hover:shadow-sky-900/30 transition-all duration-300 group"
      >
        {/* 🔹 صورة المنتج */}
        <div className="relative h-[22rem] w-full overflow-hidden">
          <Image
            src={hovered ? variant?.secondImage : variant?.mainImage}
            alt={product.title}
            fill
            priority
            className="object-cover object-top transition-all duration-700 group-hover:scale-105"
          />

          {/* 👁️ Quick View Icon */}
          <button
            onClick={() => setOpen(true)}
            className="absolute top-3 right-3 z-40 bg-slate-950/70 p-2 rounded-full text-slate-300 hover:text-white hover:bg-sky-700/60 transition"
          >
            <Eye size={18} />
          </button>

          {/* ⭐ Rating Badge */}
          {product.rating > 0 && (
            <div
              className="absolute top-3 left-3 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
              bg-slate-950/60 backdrop-blur-sm border border-slate-800 shadow-sm
              text-yellow-400 text-sm font-medium animate-in fade-in slide-in-from-top-1"
            >
              <Star
                size={14}
                className="fill-yellow-400 text-yellow-400 drop-shadow-sm"
              />
              <span className="text-slate-100 text-xs">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* 🔸 شريط صور الـ Variants */}
          {product.variants?.length > 1 && (
            <div
              onMouseEnter={() => setHovered(false)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 
              bg-slate-950/60 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-800 shadow-sm"
            >
              {product.variants.map((v: any, i: number) => (
                <button
                  key={v._id}
                  onClick={() => setActiveVariant(i)}
                  className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
                    activeVariant === i
                      ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-slate-900"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={v.mainImage}
                    alt=""
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0  bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        {/* النصوص بالأسفل */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col z-10 bg-gradient-to-t from-slate-950/80 to-transparent">
          <h3 className="text-slate-100 font-semibold text-base truncate group-hover:text-sky-300 transition">
            {product.title}
          </h3>
          <p className="text-slate-400 text-xs mb-1">{product.subcategory}</p>

          <div className="flex items-center justify-between mt-1">
            <p className="text-sky-400 font-semibold text-sm">
              {product.price} EGP
            </p>
          </div>
        </div>
      </Card>

      {/* 👁️ Dialog */}
      <ProductDetailsDialog
        mode="user"
        open={open}
        onClose={() => setOpen(false)}
        id={product._id}
      />
    </Link>
  );
}
