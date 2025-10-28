import { motion } from "framer-motion";
import { FilterIcon, ShoppingBagIcon } from "lucide-react";

interface EmptyStateProps {
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({
  hasActiveFilters,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ShoppingBagIcon className="h-20 w-20 text-slate-600 mb-4" />

      <h3 className="text-xl font-semibold text-slate-300 mb-2">
        {hasActiveFilters ? "No matching products" : "No products available"}
      </h3>

      <p className="text-slate-400 max-w-md mb-6">
        {hasActiveFilters
          ? "Try adjusting your filters to see more results."
          : "Check back later for new products."}
      </p>

      {hasActiveFilters && onClearFilters && (
        <motion.button
          onClick={onClearFilters}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FilterIcon className="h-4 w-4" />
          Clear All Filters
        </motion.button>
      )}
    </motion.div>
  );
}
