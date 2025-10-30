"use client";

import { FilterCheckbox } from "./FilterCheckbox";
import { PaletteIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Color } from "@/types/filter";

interface FiltersColorsProps {
  colors?: Color[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export function FiltersColors({ colors = [], selected = [], onToggle }: FiltersColorsProps) {
  return (
    <div className="space-y-4 bg-slate-500/10 p-4 rounded-md border border-slate-500/40">
      <div className="flex items-center gap-2">
        <PaletteIcon className="h-5 w-5 text-purple-400" />
        <h4 className="text-slate-300 text-sm font-semibold">Colors</h4>
        <span className="text-slate-500 text-sm">({colors.length})</span>
      </div>

      {colors.length ? (
        <ScrollArea className="h-80 rounded-md pr-2">
          <div className="p-2 space-y-2">
            {colors.map((color) => (
              <FilterCheckbox
                key={color.colorValue}
                id={`color-${color.colorValue}`}
                label={color.colorName}
                checked={selected.includes(color.colorName)}
                onCheckedChange={() => onToggle?.(color.colorName)}
                colorSwatch={color.colorValue}
              />
            ))}
          </div>
          <ScrollBar className="bg-slate-400 w-1 hover:bg-slate-500 rounded-full" />
        </ScrollArea>
      ) : (
        <p className="text-slate-500 text-sm text-center py-4">No colors available</p>
      )}
    </div>
  );
}
