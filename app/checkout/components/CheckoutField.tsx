"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormRegisterReturn } from "react-hook-form";

interface CheckoutFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn; // ✅ Proper type from react-hook-form
  error?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; // ✅ Properly typed
}

export default function CheckoutField({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
  inputMode,
}: CheckoutFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        inputMode={inputMode}
        className="bg-slate-800 border-slate-700 focus:ring-sky-500"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
