"use client";
import Label from "../ui/Label";
import { useFieldArray, useFormContext } from "react-hook-form";
import ErrorForm from "../ui/ErrorForm";

export default function ImagesOfVariants({ index }: { index: number }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    name: `variants.${index}.images`,
    control,
  });

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      append({
        file,
        preview: URL.createObjectURL(file), 
      });
    });

    e.target.value = ""; 
  };

  return (
    <div className="bg-slate-900/40 p-4 rounded-xl">
      <Label id={"images-variant"}>Images</Label>
      <input
        onChange={handleFilesChange}
        className="input mb-4 mt-2"
        type="file"
        multiple
      />
      <div className="flex gap-2 flex-wrap">
        {fields?.map((image, indexImg) => (
          <div key={image.id} className="relative group">
            <span
              onClick={() => remove(indexImg)}
              className="absolute top-0.5 right-1 text-red-400 cursor-pointer"
            >
              X
            </span>
            <img
              src={image.preview || image.url} 
              alt=""
              className="w-24 h-24 rounded object-cover"
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