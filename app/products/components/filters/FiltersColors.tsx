import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterCheckbox } from "./FilterCheckbox";
import { PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FiltersColorsProps {
  colors?: any[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

const VISIBLE_COLORS_LIMIT = 7;

export function FiltersColors({
  colors = [],
  selected = [],
  onToggle,
}: FiltersColorsProps) {
  const [showAll, setShowAll] = useState(false);
  const hasColors = colors && colors.length > 0;
  const visibleColors = showAll
    ? colors
    : colors.slice(0, VISIBLE_COLORS_LIMIT);
  const hasMoreColors = colors.length > VISIBLE_COLORS_LIMIT;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <PaletteIcon className="h-5 w-5 text-purple-400" />
        <h4 className="text-slate-300 text-sm font-semibold">Colors</h4>
        <span className="text-slate-500 text-sm">({colors?.length || 0})</span>
      </div>

      {/* Color list */}
      {hasColors ? (
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {visibleColors.map((color) => (
              <motion.div
                key={color.colorName}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FilterCheckbox
                  id={`color-${color.colorValue}`}
                  label={color.colorName}
                  checked={selected?.includes(color.colorName) || false}
                  onCheckedChange={() => onToggle?.(color.colorName)}
                  colorSwatch={color.colorValue}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-slate-500 text-sm text-center py-4">
          No colors available
        </p>
      )}

      {/* Show more / less */}
      {hasMoreColors && (
        <motion.div layout>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-sm"
          >
            {showAll
              ? `Show Less`
              : `Show ${colors.length - VISIBLE_COLORS_LIMIT} More`}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
