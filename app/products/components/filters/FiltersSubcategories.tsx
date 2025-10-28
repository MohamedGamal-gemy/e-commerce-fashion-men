import { motion, AnimatePresence } from "framer-motion";
import { FilterCheckbox } from "./FilterCheckbox";
import { LayersIcon } from "lucide-react";

interface FiltersSubcategoriesProps {
  subcategories?: any[];
  selected?: string[];
  onToggle?: (value: string) => void;
}

export function FiltersSubcategories({
  subcategories = [],
  selected = [],
  onToggle,
}: FiltersSubcategoriesProps) {
  const hasSubcategories =  subcategories?.length > 0;

  const handleToggle = (value: string) => {
    onToggle?.(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LayersIcon className="h-5 w-5 text-blue-400" />
        <h4 className="text-slate-300 text-sm font-semibold">Subcategories</h4>
        <span className="text-slate-500 text-sm">
          ({subcategories?.length || 0})
        </span>
      </div>

      {/* <AnimatePresence> */}
      {hasSubcategories ? (
        // <motion.div
        <div
          className="space-y-2 max-h-80 "
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
        >
          {subcategories.map((subcategory, index) => (
            <motion.div
              key={subcategory._id}
              // initial={{ opacity: 0, y: 10 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: index * 0.05 }}
            >
              <FilterCheckbox
                id={`subcategory-${subcategory._id}`}
                label={subcategory.name}
                checked={selected?.includes(subcategory.name) || false}
                onCheckedChange={(checked) => {
                  if (checked !== "indeterminate") {
                    handleToggle(subcategory.name);
                  }
                }}
                icon={<LayersIcon className="h-4 w-4" />}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p
          className="text-slate-500 text-sm text-center py-4"
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
        >
          No subcategories available
        </motion.p>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
}
