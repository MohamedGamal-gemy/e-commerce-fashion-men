


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

interface Option {
    _id: string;
    name: string;
}

export default function SubcategorySelector({
    options,
    defaultValue,
}: {
    options: Option[];
    defaultValue?: string;
}) {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<ProductFormData>();

    const value = watch("subcategory");
    const errorMessage = errors.subcategory?.message as string | undefined;

    // 🧠 نجيب العنصر المتطابق سواء القيمة كانت ID أو Name
    const matchedOption = useMemo(() => {
        if (!defaultValue) return undefined;
        return (
            options.find(
                (opt) =>
                    opt._id === defaultValue || opt.name.toLowerCase() === defaultValue.toLowerCase()
            ) || undefined
        );
    }, [defaultValue, options]);

    // ✅ اضبط القيمة الافتراضية أول مرة فقط
    useEffect(() => {
        if (matchedOption && !value) {
            setValue("subcategory", matchedOption._id);
        }
    }, [matchedOption, value, setValue]);

    return (
        <div className="w-full space-y-2">
            <Label className="text-emerald-300">Subcategory</Label>
            <Select
                value={value || ""}
                onValueChange={(val) => setValue("subcategory", val)}
            >
                <SelectTrigger
                    className={cn(
                        "bg-slate-900 border border-slate-700 text-slate-100 h-11 rounded-lg w-full focus:ring-2 focus:ring-emerald-500",
                        errorMessage && "border-red-500"
                    )}
                >
                    <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-slate-100 border-slate-700">
                    {options.map((sub) => (
                        <SelectItem key={sub._id} value={sub._id}>
                            {sub.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
        </div>
    );
}
