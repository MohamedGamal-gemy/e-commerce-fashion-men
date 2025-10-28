import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CheckoutFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  register: any;
  error?: string;
  inputMode?: string;
};

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
        inputMode={inputMode as any}
        className="bg-slate-800 border-slate-700 focus:ring-sky-500"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
