import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export default function FiltersPrice({ filters, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-sky-400" /> Price Range
      </label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min"
          value={filters.minPrice || ""}
          onChange={(e) => onChange("minPrice", e.target.value)}
          className="w-1/2 bg-slate-800 border-slate-700 text-slate-200"
        />
        <Input
          type="number"
          placeholder="Max"
          value={filters.maxPrice || ""}
          onChange={(e) => onChange("maxPrice", e.target.value)}
          className="w-1/2 bg-slate-800 border-slate-700 text-slate-200"
        />
      </div>
    </div>
  );
}
