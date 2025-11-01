"use client";

import React from "react";

interface FiltersContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const FiltersContainer: React.FC<FiltersContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-72 bg-gradient-to-b from-slate-900/60 via-slate-900/50
         to-slate-900/40 p-8 rounded-2xl border border-slate-800 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default FiltersContainer;
