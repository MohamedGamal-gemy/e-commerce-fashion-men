// "use client";
// import Label from "../ui/Label";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import ErrorForm from "../ui/ErrorForm";

// export default function ImagesOfVariants({ index }: { index: number }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const { fields, remove, append } = useFieldArray({
//     name: `variants.${index}.images`,
//     control,
//   });

//   const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     Array.from(files).forEach((file) => {
//       append({
//         file,
//         preview: URL.createObjectURL(file),
//       });
//     });

//     e.target.value = "";
//   };

//   return (
//     <div className="bg-slate-900/40 p-4 rounded-xl">
//       <Label id={"images-variant"}>Images</Label>
//       <input
//         onChange={handleFilesChange}
//         className="input mb-4 mt-2"
//         type="file"
//         multiple
//       />
//       <div className="flex gap-2 flex-wrap">
//         {fields?.map((image, indexImg) => (
//           <div key={image.id} className="relative group">
//             <span
//               onClick={() => remove(indexImg)}
//               className="absolute top-0.5 right-1 text-red-400 cursor-pointer"
//             >
//               X
//             </span>
//             <img
//               src={image.preview || image.url}
//               alt=""
//               className="w-24 h-24 rounded object-cover"
//             />
//           </div>
//         ))}
//       </div>
//       <div className="mt-2">
//         <ErrorForm errors={errors?.variants?.[index]?.images} />
//       </div>
//     </div>
//   );
// }
// ###################################
"use client";
import Label from "../ui/Label";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorForm from "../ui/ErrorForm";
import { useState } from "react";

export default function ImagesOfVariants({ index }: { index: number }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: `variants.${index}.images`,
    control,
  });

  // ✅ يمكنك تبديل الاتجاه حسب رغبتك: "desc" = الأحدث أولاً، "asc" = الأقدم أولاً
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // ✅ نرتب الصور حسب التاريخ
    const sortedFiles = Array.from(files).sort((a, b) =>
      sortOrder === "desc"
        ? b.lastModified - a.lastModified
        : a.lastModified - b.lastModified
    );

    sortedFiles.forEach((file) => {
      append({
        file,
        preview: URL.createObjectURL(file),
      });
    });

    e.target.value = ""; // reset input
  };

  return (
    <div className="bg-slate-900/40 p-4 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <Label id={"images-variant"}>Images</Label>

        {/* ✅ زر لتبديل ترتيب الصور */}
        <button
          type="button"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Sort: {sortOrder === "asc" ? "Oldest → Newest" : "Newest → Oldest"}
        </button>
      </div>

      <input
        onChange={handleFilesChange}
        className="input mb-2 mt-1"
        type="file"
        multiple
      />

      <div className="flex gap-2 flex-wrap">
        {fields?.map((image, indexImg) => (
          <div
            key={image.id}
            className="relative group border border-slate-700 rounded-lg overflow-hidden"
          >
            <span
              onClick={() => remove(indexImg)}
              className="absolute top-0.5 right-1 bg-slate-900/70 rounded-full px-1 text-red-400 text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition"
              title="Remove"
            >
              ✕
            </span>
            <img
              src={image.preview || image.url}
              alt=""
              className="w-24 h-24 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-2">
        <ErrorForm errors={errors?.variants?.[index]?.images} />
      </div>
    </div>
  );
}
