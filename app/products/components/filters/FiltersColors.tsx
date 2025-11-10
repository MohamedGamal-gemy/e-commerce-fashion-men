"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ColorFilter({
  colors,
  selectedColors,
  toggleColor,
  clearColors,
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-emerald-300 font-semibold">Colors</Label>
        <button
          onClick={clearColors}
          className="text-xs text-slate-400 hover:text-red-400"
        >
          Clear
        </button>
      </div>

      {colors?.map((color) => (
        <label
          key={color.value}
          className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedColors.includes(color.name)}
              onCheckedChange={() => toggleColor(color.name)}
            />
            <div className="flex items-center gap-2">
              {/* ✅ دائرة اللون */}
              <span
                className="w-4 h-4 rounded-full border border-slate-600"
                style={{ backgroundColor: color.value }}
              ></span>
              <span className="text-slate-100 text-sm">{color.name}</span>
            </div>
          </div>

          {/* ✅ عدد المنتجات */}
          <span className="text-xs text-slate-400">{color.count ?? 0}</span>
        </label>
      ))}
    </div>
  );
}
