// "use client";

// import React from "react";
// import type { Size } from "@/types/product";
// import { cn } from "@/lib/utils";

// export default function SizeSelector({
//   sizes,
//   value,
//   onChange,
// }: {
//   sizes: Size[];
//   value: string | null;
//   onChange: (s: string) => void;
// }) {
//   return (
//     <div>
//       <div className="text-sm text-slate-400 mb-2">Size</div>
//       <div className="flex flex-wrap gap-2">
//         {sizes.map((s) => {
//           const disabled = s.stock <= 0;
//           const selected = value === s.size;
//           return (
//             <button
//               key={s._id ?? s.size}
//               onClick={() => !disabled && onChange(s.size)}
//               disabled={disabled}
//               aria-pressed={selected}
//               title={disabled ? "Out of stock" : `${s.stock} in stock`}
//               className={cn(
//                 "px-3 py-1.5 rounded-md border text-sm min-w-[56px] transition",
//                 disabled
//                   ? "opacity-40 cursor-not-allowed border-slate-800 text-slate-600"
//                   : selected
//                   ? "bg-slate-700 text-slate-100 border-slate-400"
//                   : "border-slate-700 hover:border-slate-500 text-slate-300"
//               )}
//             >
//               {s.size}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";
import type { Size } from "@/types/product";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: Size[];
  value: string | null;
  onChange: (s: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-slate-300 tracking-wide">
        Select Size
      </h4>

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((s) => {
          const disabled = s.stock <= 0;
          const selected = value === s.size;

          return (
            <motion.button
              key={s._id ?? s.size}
              onClick={() => !disabled && onChange(s.size)}
              disabled={disabled}
              aria-pressed={selected}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={cn(
                "relative px-4 py-2 rounded-lg border text-sm font-medium uppercase tracking-wide min-w-[60px] transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950",
                disabled
                  ? "opacity-40 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-900/40"
                  : selected
                  ? "bg-sky-600/15 border-sky-500 text-sky-300 shadow-sm shadow-sky-900/30"
                  : "border-slate-700 text-slate-300 hover:border-sky-700 hover:text-sky-300 hover:bg-slate-800/40"
              )}
            >
              {s.size}
              {!disabled && s.stock <= 3 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-[10px] px-1 py-[1px] rounded-md text-black font-semibold">
                  Low
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
