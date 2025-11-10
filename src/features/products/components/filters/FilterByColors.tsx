"use client";
import React from "react";
import { Palette } from "lucide-react";
import type { ColorOption } from "../../types";

interface Props {
  colors: ColorOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export default function FilterByColors({ colors, selectedValues, onToggle }: Props) {
  const list = Array.isArray(colors) ? colors : [];
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
      <div className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-medium">
        <Palette className="h-4 w-4 text-slate-400" />
        Colors
      </div>
      <div className="flex flex-col gap-2">
        {list.filter(c => c.value).map((c) => {
          const checked = selectedValues.includes(c.value!);
          return (
            <label key={c.value} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs cursor-pointer select-none ${checked ? "border-blue-500 bg-blue-600/20 text-blue-200" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
              onClick={() => onToggle(c.name!)}
            >
              <span
                className="h-4 w-4 rounded-sm border border-slate-600"
                style={{ backgroundColor: c.value || "transparent" }}
              />
              {c.name}
              {typeof c.count === "number" && c.count > 0 && (
                <span className="ml-1 text-slate-400">({c.count})</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
