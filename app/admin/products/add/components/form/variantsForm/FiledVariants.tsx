// import { useFormContext } from "react-hook-form";
// import { AnimatePresence, motion } from "framer-motion";

// type Props = {
//   name: string;
//   type?: string;
//   className?: string;
//   value: any;
//   error: { message: string } | undefined;
// };
// const FiledVariants = ({
//   name,
//   type = "text",
//   className,
//   value,
//   error,
// }: Props) => {
//   const { register } = useFormContext();
//   return (
//     <div className="w-full">
//       <div className=" text-gray-50 ">
//         <label className="block text-xs font-bold text-green-300 mb-1">
//           {name}
//         </label>
//         <input
//           {...register(value)}
//           type={type}
//           className={`input ${className}`}
//         />
//       </div>
//       <AnimatePresence mode="wait">
//         {error && (
//           <motion.p
//             key="error-message"
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             transition={{ duration: 0.2 }}
//             className="text-rose-500 mt-1 text-sm"
//           >
//             {error.message}
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default FiledVariants;


"use client";

import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  type?: string;
  className?: string;
  value: any;
  error?: { message?: string };
};

const FiledVariants = ({
  name,
  type = "text",
  className,
  value,
  error,
}: Props) => {
  const { register } = useFormContext();

  return (
    <div className="w-full">
      {/* ✅ Label */}
      <Label
        htmlFor={value}
        className="block text-xs font-semibold text-emerald-300 mb-1 uppercase tracking-wide"
      >
        {name}
      </Label>

      {/* ✅ Input */}
      <Input
        id={value}
        type={type}
        {...register(value)}
        className={cn(
          "bg-slate-900 border border-slate-700 text-slate-100 focus-visible:ring-1 focus-visible:ring-emerald-400",
          error && "border-rose-500 focus-visible:ring-rose-400",
          className
        )}
      />

      {/* ✅ Error animation */}
      <AnimatePresence mode="wait">
        {error?.message && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-rose-500 mt-1 text-xs font-medium"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FiledVariants;
