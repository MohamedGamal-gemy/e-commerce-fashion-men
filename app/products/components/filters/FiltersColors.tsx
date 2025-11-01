"use client";

import { Palette } from "lucide-react";
import { FilterCheckbox } from "./FilterCheckbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Color } from "@/types/filter";

interface FiltersColorsProps {
  colors?: Color[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export const FiltersColors: React.FC<FiltersColorsProps> = ({
  colors = [],
  selected = [],
  onToggle,
}) => {
  return (
    <section aria-labelledby="colors-heading" className="space-y-3">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-pink-400" />
        <h4 id="colors-heading" className="text-sm font-semibold text-slate-200">
          Colors
        </h4>
        <span className="text-sm text-slate-400">({colors.length})</span>
      </div>

      {colors.length ? (
        <ScrollArea className="h-72 rounded-md">
          <div className="p-1 space-y-2">
            {colors.map((c) => (
              <FilterCheckbox
                key={c.colorValue}
                id={`color-${c.colorValue}`}
                label={c.colorName}
                checked={selected.includes(c.colorName)}
                onCheckedChange={() => onToggle?.(c.colorName)}
                colorSwatch={c.colorValue}
              />
            ))}
          </div>
          <ScrollBar className="w-2 rounded-full bg-slate-700/40" />
        </ScrollArea>
      ) : (
        <p className="text-sm text-slate-400 text-center py-4">No colors</p>
      )}
    </section>
  );
};
