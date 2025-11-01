"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

interface FiltersHeaderProps {
  title?: string;
  selectedCount: number;
  onClearAll: () => void;
}

export const FiltersHeader: React.FC<FiltersHeaderProps> = ({
  title = "Filters",
  selectedCount,
  onClearAll,
}) => {
  const reduce = useReducedMotion();

  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>

        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.span
              initial={reduce ? undefined : { scale: 0, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0, opacity: 0 }}
              className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full"
              aria-live="polite"
            >
              {selectedCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.button
            initial={reduce ? undefined : { opacity: 0, x: 8 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: 8 }}
            onClick={onClearAll}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors rounded focus-visible:ring-2 focus-visible:ring-indigo-500/40 px-2 py-1"
            aria-label="Clear all filters"
            type="button"
          >
            <X className="w-4 h-4" />
            Clear
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
