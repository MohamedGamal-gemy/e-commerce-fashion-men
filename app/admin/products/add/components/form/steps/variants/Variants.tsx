import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormData } from "../../schemas/productSchema";
import FiledVariants from "./FiledVariants";
import { Plus, Trash } from "lucide-react";
import ImagesOfVariants from "./ImagesOfVariants";
import SizesOfVariants from "./SizesOfVariants";

const Variants = ({ onImageUpload, existingImages = {}, getAllImagesForVariant, onRemoveExistingImage }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>();
  const {
    fields,
    append: appendVariant,
    remove,
  } = useFieldArray({
    name: "variants",
    control,
  });

  return (
    <div className="">
      <div className="mb-4">
        <button
          onClick={() =>
            appendVariant({
              color: { name: "", value: "#000000" },
              sizes: [{ size: "", stock: 1 }],
              images: [],
            })
          }
          type="button"
          className="bg-gradient-to-br to-green-600 from-sky-400 flex items-center
            hover:bg-gradient-to-bl duration-200 transition  p-2 rounded font-medium text-white"
        >
          <Plus size={18} />
          Add Variant
        </button>
      </div>
      {fields?.map((variant, indx) => (
        <div
          key={variant.id}
          className="space-y-4  bg-slate-900 p-4 rounded-xl mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="text-white">
              Variant #<span>{indx + 1}</span>
            </div>
            {fields.length > 1 && (
              <div>
                <button
                  onClick={() => remove(indx)}
                  type="button"
                  className="bg-gradient-to-br to-red-500/50 from-rose-400/50
            hover:bg-gradient-to-bl duration-200 transition  p-2 rounded font-medium text-white"
                >
                  <Trash size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <FiledVariants
              name="Color Name"
              value={`variants.${[indx]}.color.name`}
              error={errors.variants?.[indx]?.color?.name}
            />
            <FiledVariants
              value={`variants.${[indx]}.color.value`}
              type="color"
              name={"Color Value"}
              className="h-10"
              error={errors.variants?.[indx]?.color?.value}
            />
          </div>
          
          <ImagesOfVariants 
            variantIndx={indx} 
            onImageUpload={onImageUpload}
            existingImages={getAllImagesForVariant ? getAllImagesForVariant(indx) : (existingImages[indx] || [])}
            onRemoveExistingImage={(imageIdx:number)=> onRemoveExistingImage?.(indx, imageIdx)}
          />

          <SizesOfVariants variantIndx={indx} />
        </div>
      ))}
    </div>
  );
};

export default Variants;