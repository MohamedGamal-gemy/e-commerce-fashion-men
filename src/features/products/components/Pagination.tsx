// src/features/products/components/Pagination.tsx
"use client";
import React from "react";

interface Props {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ totalPages, currentPage = 1, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;
  const go = (p: number) => onPageChange?.(Math.min(Math.max(1, p), totalPages));
  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div className="mt-10 flex justify-center">
      <nav className="inline-flex items-center gap-2 text-slate-300 text-sm">
        <button
          className="px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-50"
          onClick={() => go(currentPage - 1)}
          disabled={currentPage <= 1 || !onPageChange}
        >
          Prev
        </button>
        {start > 1 && (
          <>
            <button className="px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800" onClick={() => go(1)} disabled={!onPageChange}>1</button>
            {start > 2 && <span className="px-1">…</span>}
          </>
        )}
        {pages.map((p) => (
          <button
            key={p}
            className={`px-3 py-1 rounded-md border ${p === currentPage ? "border-blue-500 bg-blue-600/20" : "border-slate-700 hover:bg-slate-800"}`}
            onClick={() => go(p)}
            disabled={!onPageChange}
          >
            {p}
          </button>
        ))}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-1">…</span>}
            <button className="px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800" onClick={() => go(totalPages)} disabled={!onPageChange}>{totalPages}</button>
          </>
        )}
        <button
          className="px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-50"
          onClick={() => go(currentPage + 1)}
          disabled={currentPage >= totalPages || !onPageChange}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
