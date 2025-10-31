
"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { X, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FiledVariants from "./FiledVariants";
import { ProductFormData } from "../../../schemas/productSchema";

const SizesOfVariants = ({ variantIndx }: { variantIndx: number }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    name: `variants.${variantIndx}.sizes`,
    control,
  });

  const addSize = () => appendSize({ size: "", stock: 1 });

  return (
    <div className="border border-slate-700/50 rounded-xl p-4 bg-slate-900/60 backdrop-blur-md">
      {/* // <div className="border border-slate-700/50 rounded-xl p-4  backdrop-blur-md"> */}
      <div className="flex items-center justify-between">

        <h3 className="text-sm font-semibold text-slate-100 mb-2">
          Sizes & Stock
        </h3>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addSize}
            className="text-sky-500"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Size
          </Button>
        </div>
      </div>
      {/* ✅ ScrollArea من shadcn */}
      <ScrollArea className="h-48 bg pr-2 " >
        <AnimatePresence mode="sync">
          {sizeFields.map((sizeField, sizeIndex) => (
            <motion.div
              key={sizeField.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-start gap-3 mb-4"
            >
              <div className="flex gap-3 w-full">
                <FiledVariants
                  name="Size"
                  value={`variants.${variantIndx}.sizes.${sizeIndex}.size`}
                  error={errors?.variants?.[variantIndx]?.sizes?.[sizeIndex]?.size}
                />
                <FiledVariants
                  type="number"
                  name="Stock"
                  value={`variants.${variantIndx}.sizes.${sizeIndex}.stock`}
                  error={errors?.variants?.[variantIndx]?.sizes?.[sizeIndex]?.stock}
                />
              </div>

              {sizeFields.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="mt-6 h-8 w-8 shrink-0"
                  onClick={() => removeSize(sizeIndex)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <Separator className="my-3 bg-slate-700/50" />

        {/* <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addSize}
            className="bg-gradient-to-tr from-green-500 to-sky-400 text-white hover:from-green-400 hover:to-sky-300 transition-all"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Size
          </Button>
        </div> */}
        <ScrollBar className="bg-slate-400 w-1 hover:bg-slate-500 rounded-full" />

      </ScrollArea >
    </div >
  );
};

export default SizesOfVariants;
