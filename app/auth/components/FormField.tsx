// "use client";
// import React, { ReactNode } from "react";
// import { Label } from "@/components/ui/label";

// export default function FormField({ label, children, error }: { label?: string; children: ReactNode; error?: string }) {
//   return (
//     <div className="flex flex-col gap-2">
//       {label && <Label className="text-slate-200">{label}</Label>}
//       {children}
//       {error && <p className="text-sm text-rose-400">{error}</p>}
//     </div>
//   );
// }

"use client";

import React, { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export default function FormField({
  label,
  children,
  error,
}: {
  label?: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full relative z-10">
      {label && (
        <Label className="text-slate-100 font-medium tracking-wide text-sm">
          {label}
        </Label>
      )}

      <div className="relative group z-">
        <div className="relative z-10 rounded-lg bg-slate-800/60 border
         border-slate-700/60 focus-within:border-sky-500/70 shadow-[inset_0_0_10px_rgba(15,23,42,0.6)] 
         transition-all duration-300 ease-out">
          {children}
        </div>

        <div className="absolute -inset-[1px] rounded-lg opacity-0 group-focus-within:opacity-100 
        transition-opacity duration-500 bg-gradient-to-r from-sky-500/40 to-cyan-400/30 blur-md" />
      </div>

      {error && (
        <p className="text-sm font-medium text-rose-400/90 tracking-wide mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
