// "use client";

// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface ImageItem {
//   _id: string;
//   url: string;
// }

// export default function ProductGallery({
//   images,
//   activeIndex,
//   onChangeIndex,
//   title,
// }: {
//   images: ImageItem[];
//   activeIndex: number;
//   onChangeIndex: (i: number) => void;
//   title: string;
// }) {

//   return (
//     <div className="space-y-0">
//       <div className="relative  
//        bg-gradient-to w-96
//         border-slate-800  flex items-center justify-center">
//         {/* main image animated */}
//         <motion.div
//           key={images?.[activeIndex]?._id ?? "empty"}
//           initial={{ opacity: 0.6, scale: 0.99 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.28 }}
//           className="w-full  h-96  relative"
//         >
//           {images?.[activeIndex] ? (
//             <Image
//               src={images[activeIndex].url}
//               alt={title}
//               fill
//               className="object-contain"
//               priority={true}
//             />
//           ) : (
//             <div className="text-slate-400 text-center">No image available</div>
//           )}
//         </motion.div>


//       </div>

//       {/* thumbnails */}
//       <div className="flex gap-3  py-2">
//         {images?.map((img, i) => (
//           <button
//             key={img._id}
//             onClick={() => onChangeIndex(i)}
//             className={`w-14 h-14  rounded-md   ${
//               i === activeIndex
//                 ? "ring-2 ring-offset-2 ring-sky-500 border-transparent"
//                 : ""
//             }`}
//             aria-pressed={i === activeIndex}
//           >
//             <div className="relative w-full h-full">
//               <Image src={img.url} alt={`thumb-${i}`} fill className="object-cover" />
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ImageItem {
  _id: string;
  url: string;
}

export default function ProductGallery({
  images,
  activeIndex,
  onChangeIndex,
  title,
}: {
  images: ImageItem[];
  activeIndex: number;
  onChangeIndex: (i: number) => void;
  title: string;
}) {
  const activeImage = images?.[activeIndex];

  return (
    <div className="flex flex-col items-center gap-5 md:gap-6">
      {/* 🔹 Main Image */}
      <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden
       border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-lg">
        <motion.div
          key={activeImage?._id ?? "empty"}
          initial={{ opacity: 0.4, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          {activeImage ? (
            <Image
              src={activeImage.url}
              alt={title}
              fill
              className="object-cover object-top hover:scale-[1.02] transition-transform duration-300"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              No image available
            </div>
          )}
        </motion.div>
      </div>

      {/* 🔸 Thumbnails Carousel */}
      <ScrollArea className="w-full max-w-md">
        <div className="flex gap-3 pb-2">
          {images?.map((img, i) => {
            const selected = i === activeIndex;
            return (
              <motion.button
                key={img._id}
                onClick={() => onChangeIndex(i)}
                whileTap={{ scale: 0.94 }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all duration-200 ${
                  selected
                    ? "border-sky-500 ring-2 ring-sky-600/40 ring-offset-2 ring-offset-slate-950"
                    : "border-slate-800 hover:border-sky-700/60"
                }`}
                aria-pressed={selected}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    selected ? "scale-105" : "hover:scale-105"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
