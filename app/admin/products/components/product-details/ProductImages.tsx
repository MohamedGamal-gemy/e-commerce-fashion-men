import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Variant } from "@/types/product";
import Image from "next/image";
import {motion} from "framer-motion";

interface ProductImagesProps {
  mainImage: string | null;
  setMainImage: (url: string) => void;
  variant: Variant | null; // ✅ اسمح بـ null
  title: string;
}

export function ProductImages({
  mainImage,
  setMainImage,
  variant,
  title,
}: ProductImagesProps) {
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
          {variant?.images?.map((img) => (
            <button
              key={img._id}
              onClick={() => setMainImage(img.url)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border ${mainImage === img.url
                  ? "border-sky-500"
                  : "border-slate-800 hover:border-sky-700"
                } transition`}
            >
              <Image
                src={img.url}
                alt={img._id}
                fill
                className="object-cover"
              />
            </button>
          )) || <p className="text-slate-400 text-sm">No images available</p>}
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
