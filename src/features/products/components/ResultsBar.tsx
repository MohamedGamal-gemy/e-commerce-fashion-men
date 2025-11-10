"use client";
import React from "react";
import { XCircle } from "lucide-react";

interface Props {
  total?: number;
  page?: number;
  totalPages?: number;
  onClearAll?: () => void;
}

export default function ResultsBar({ total, page, totalPages, onClearAll }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-slate-400 text-sm">
        {typeof total === "number" && typeof page === "number" && typeof totalPages === "number" ? (
          <span>
            Showing page <span className="text-slate-200">{page}</span> of <span className="text-slate-200">{totalPages}</span> — <span className="text-slate-200">{total}</span> items
          </span>
        ) : (
          <span>Loading results...</span>
        )}
      </div>
      {onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 hover:bg-slate-800 text-sm"
        >
          <XCircle className="h-4 w-4" />
          Clear filters
        </button>
      )}
    </div>
  );
}
