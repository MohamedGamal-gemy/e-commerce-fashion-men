"use client";

import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { ProductFormData } from "../../../../schemas/productSchema";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ProductTypeOption {
  _id: string;
  name: string;
  type?: string; // لو حابب تعرض النوع بجانب الاسم
}

export default function ProductTypesSelector({
  productTypes,
  defaultValue,
}: {
  productTypes: ProductTypeOption[];
  defaultValue?: string;
}) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const value = watch("productType");
  const errorMessage = errors.productType?.message as string | undefined;

  // ⚡ قيمة افتراضية
  const matchedOption = useMemo(() => {
    if (!defaultValue) return undefined;
    return (
      productTypes.find(
        (opt) =>
          opt._id === defaultValue ||
          opt.name.toLowerCase() === defaultValue.toLowerCase()
      ) || undefined
    );
  }, [defaultValue, productTypes]);

  useEffect(() => {
    if (matchedOption && !value) {
      setValue("productType", matchedOption._id);
    }
  }, [matchedOption, value, setValue]);

  return (
    <div className="w-full space-y-2">
      <Label className="text-emerald-300 font-medium">Product Type</Label>
      <Select
        value={value || ""}
        onValueChange={(val) => setValue("productType", val)}
      >
        <SelectTrigger
          className={cn(
            "bg-slate-900 border border-slate-700 text-slate-100 h-11 rounded-lg w-full focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm hover:border-emerald-400/40",
            errorMessage && "border-red-500 focus:ring-red-500"
          )}
        >
          <SelectValue placeholder="Select Product Type" />
        </SelectTrigger>

        <SelectContent className="bg-slate-900 text-slate-100 border border-slate-700 shadow-md rounded-lg">
          {productTypes?.map((type) => (
            <SelectItem
              key={type._id}
              value={type._id}
              className="hover:bg-slate-800 cursor-pointer flex justify-between items-center px-3 py-2"
            >
              <span>{type.name}</span>
              {type.type && (
                <span className="text-xs text-slate-400">{type.type}</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
    </div>
  );
}
