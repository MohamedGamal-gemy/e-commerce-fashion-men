"use client";

import { ProductVariant } from "@/types/productList";
import { VariantStrip } from "./VariantStrip";

interface CardInfoProps {
  title: string;
  productTypeName: string;
  price: number;
}

export function CardInfo({
  title,
  productTypeName,
  price,
  activeVariant,
  variants,
}: CardInfoProps) {
  return (
    // <div className="p-4 pb-8  absolute -bottom-4 bg-amber- w-full   ">
    <div className="p-4 pb-8 -mt-9 bg-gradient-to-br to-gray-700/40 via-gray-800/40 from-gray-700/40 ">
      <h3
        className="text-blu-400 font-semibold text-[15px] truncate tracking-tight
       group-hover:text-sky-300 transition"
      >
        {title}
      </h3>
      <p className="text-slate-300 text-xs my-1">{productTypeName}</p>

      <div className="flex items-center justify-between mt-1">
        <span
          className="text--400/90 font-semibold text-sm b-slate-700/40 border
         border-slate-700 rounded-full px-2.5 py-1 backdrop-blur-sm"
        >
          {price.toLocaleString()} EGP
        </span>
        <div>
          {variants?.length && variants.length > 1 ? (
            <VariantStrip
              variants={variants as ProductVariant[]}
              activeIndex={activeVariant}
              onSelect={(i: number, e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                // setActiveVariant(i);
              }}
              // onHoverStart={() => setHovered(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
