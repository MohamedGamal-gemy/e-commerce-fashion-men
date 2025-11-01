"use client";

import React from "react";

interface FiltersContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const FiltersContainer: React.FC<FiltersContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-[19rem] bg-gradient-to-b from-slate-900/60 via-zinc-800/50
         to-slate-900/40 p-5 pr-2 border border-slate-800 shadow-lg ${className}`}
    >
      {/* className={`w-80 bg-gradient-to-b from-slate-900/60 via-slate-900/50
         to-slate-900/40 p-5  border border-slate-800 shadow-lg ${className}`}
    > */}
      {children}
    </div>
  );
};

export default FiltersContainer;
