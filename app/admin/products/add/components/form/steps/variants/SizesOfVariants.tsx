import { useFieldArray, useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { ProductFormData } from "../../schemas/productSchema";
import FiledVariants from "./FiledVariants";

const SizesOfVariants = ({ variantIndx }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    name: `variants.[${variantIndx}].sizes`,
    control,
  });
  return (
    <div>
      {/* append */}
      <div className="text-end">
        <button
          type="button"
          onClick={() => append({ size: "L", stock: 1 })}
          className="bg-sky-400 rounded p-2 text-white "
        >
          Add Size
        </button>
      </div>
      {/*  */}
      {fields.map((sizes, indexSizes) => (
        <div key={sizes.id} className="flex items-center gap-4">
          <div>
            <div className="flex gap-4">
              <FiledVariants
                name={"Size"}
                value={`variants.${variantIndx}.sizes.${indexSizes}.size`}
                error={
                  errors?.variants?.[variantIndx]?.sizes?.[indexSizes]?.size
                }
              />
              <FiledVariants
                name={"Stock"}
                type="number"
                value={`variants.${variantIndx}.sizes.${indexSizes}.stock`}
                error={
                  errors?.variants?.[variantIndx]?.sizes?.[indexSizes]?.stock
                }
              />
            </div>
          </div>
          {/* remove */}
          {fields.length > 1 && (
            <div>
              <button
                type="button"
                onClick={() => remove(indexSizes)}
                className="p-1 mt-8 rounded bg-rose-700/20 text-rose-500"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SizesOfVariants;