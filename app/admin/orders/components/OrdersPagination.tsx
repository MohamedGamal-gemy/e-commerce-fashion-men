"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQueryState, parseAsInteger } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrdersPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center gap-2 mt-8"
    >
      {/* Previous */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {pageNumbers.map((num) => (
          <Button
            key={num}
            variant={num === currentPage ? "default" : "outline"}
            onClick={() => goToPage(num)}
            className={`${
              num === currentPage
                ? "bg-slate-700 text-white shadow-md"
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
            } w-10`}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
