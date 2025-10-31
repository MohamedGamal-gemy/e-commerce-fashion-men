// import { useFormContext } from "react-hook-form";

// const FiledData = ({ name, type = "text", error }) => {
//   const { register } = useFormContext();
//   return (
//     <div className="flex-1">
//       <div className=" text-gray-100 ">
//         <label className=" block text-sm font-medium text-emerald-300  mb-1 capitalize">
//           {name}
//         </label>
//         {type === "textarea" ? (
//           <textarea rows={4} className="input" {...register(name)} />
//         ) : (
//           <input
//             {...register(name, {
//               valueAsNumber: type === "number" ? true : false,
//             })}
//             type={type}
//             className="input"
//           />
//         )}
//       </div>
//       {error && <p className="text-red-500 mt-1">{error?.message}</p>}
//     </div>
//   );
// };

// export default FiledData;



"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldDataProps {
  name: string;
  type?: string;
  error?: any;
  label?: string;
}

const FiledData = ({ name, type = "text", error, label }: FieldDataProps) => {
  const { register } = useFormContext();

  const inputBase =
    "bg-gray-950 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 transition";

  return (
    <div className="flex-1 space-y-2">
      <Label htmlFor={name} className="text-emerald-300 capitalize">
        {label || name}
      </Label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          rows={8}

          className={cn(inputBase, "resize-none ")}
        />
      ) : (
        <input
          id={name}
          {...register(name, {
            valueAsNumber: type === "number" ? true : false,
          })}
          type={type}
          className={inputBase}
        />
      )}
      {error && (
        <p className="text-red-400 text-sm mt-1">{error?.message}</p>
      )}
    </div>
  );
};

export default FiledData;
