"use client";

import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export function ProductImages({
  mainImage,
  setMainImage,
  variant,
  title,
}: {
  mainImage: string | null;
  setMainImage: (url: string) => void;
  variant: any;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center w-full md:w-1/2">
      <motion.div
        key={mainImage}
        initial={{ opacity: 0.4, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-80 rounded-xl overflow-hidden border border-slate-800"
      >
        <Image
          src={mainImage || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover"
        />
      </motion.div>

      <ScrollArea className="w-64 mt-4 pb-2">
        <div className="flex gap-2 justify-start px-2 pb-2">
          {variant?.images?.map((img: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setMainImage(img.url)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border ${
                mainImage === img.url
                  ? "border-sky-500"
                  : "border-slate-800 hover:border-sky-700"
              } transition`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${idx}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="bg-slate-900/60 hover:bg-slate-800/80 transition-colors
             [&_[data-orientation=horizontal]_div]:bg-sky-600/60
             [&_[data-orientation=horizontal]_div:hover]:bg-sky-500"
        />
      </ScrollArea>
    </div>
  );
}
