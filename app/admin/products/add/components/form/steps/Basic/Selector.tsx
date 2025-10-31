"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProductFormData } from "../../../../schemas/productSchema";

interface Option {
  _id: string;
  name: string;
}

interface SelectorProps {
  option: Option[];
  name: keyof ProductFormData;
  defaultValue?: string;
  label?: string;
}

const Selector = ({ option, name, defaultValue, label }: SelectorProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const currentValue = watch(name);
  const errorMessage = errors[name]?.message as string | undefined;

  // ضبط القيمة الافتراضية أول تحميل فقط
  useEffect(() => {
    if (defaultValue && !currentValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, currentValue, name, setValue]);

  const selectedItem = option.find((o) => o._id === currentValue);

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={name} className="text-emerald-300 capitalize">
        {label || name}
      </Label>

      <Select
        value={currentValue || ""}
        onValueChange={(value) => setValue(name, value)}
      >
        <SelectTrigger
          className={cn(
            "bg-slate-900 border border-slate-700 text-slate-100 rounded-lg h-11 px-3 w-full outline-none ring-0 focus:ring-2 focus:ring-emerald-500",
            errorMessage && "border-red-500"
          )}
        >
          <SelectValue placeholder={`Select ${label || name}`}>
            {selectedItem?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-slate-900 text-slate-100 border-slate-700 shadow-lg">
          {option.map((sub) => (
            <SelectItem
              key={sub._id}
              value={sub._id}
              className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
            >
              {sub.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMessage && (
        <p className="text-red-400 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Selector;
