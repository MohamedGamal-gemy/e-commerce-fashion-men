"use client";

import React from "react";

interface HeaderProps {
  total?: number;
  hasActiveFilters: boolean;
}

export const Header: React.FC<HeaderProps> = ({ total, hasActiveFilters }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-200">
          Products {typeof total === "number" && (
            <span className="text-slate-400 text-lg ml-2">({total})</span>
          )}
        </h2>
        {hasActiveFilters && (
          <p className="text-slate-400 text-sm mt-1">Filtered results</p>
        )}
      </div>
    </div>
  );
};

export default Header;


