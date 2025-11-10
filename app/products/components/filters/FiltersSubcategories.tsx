"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// import { useProductTypeFilter } from "@/hooks/useProductTypeFilter";

export default function ProductTypeFilter({
  productTypes,
  selectedProductTypes,
  toggleProductType,
  clearProductTypes,
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-emerald-300 font-semibold">Product Types</Label>
        <button
          onClick={clearProductTypes}
          className="text-xs text-slate-400 hover:text-red-400"
        >
          Clear
        </button>
      </div>

      {productTypes.map((type) => (
        <label
          key={type._id}
          className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-800"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedProductTypes.includes(type.name)}
              onCheckedChange={() => toggleProductType(type.name)}
            />
            <span className="text-slate-100 text-sm">{type.name}</span>
          </div>
          <span className="text-xs text-slate-400">
            {type.dynamicProductCount ?? 0}
          </span>
        </label>
      ))}
    </div>
  );
}
