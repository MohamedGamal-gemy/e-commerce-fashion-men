// import { RotateCcw, Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function FiltersHeader({ onClear }: { onClear: () => void }) {
//   return (
//     <div className="flex items-center justify-between">
//       <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
//         <Filter className="w-5 h-5 text-sky-400" />
//         Filters
//       </h3>
//       <Button
//         size="sm"
//         variant="ghost"
//         onClick={onClear}
//         className="text-slate-400 hover:text-sky-400"
//       >
//         <RotateCcw className="w-4 h-4 mr-1" /> Reset
//       </Button>
//     </div>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FiltersHeaderProps {
  selectedCount: number;
  onClearAll: () => void;
}

export function FiltersHeader({
  selectedCount,
  onClearAll,
}: FiltersHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-700">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-slate-200">Filters</h3>
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
            >
              {selectedCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={onClearAll}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear All
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
