"use client";

import React from "react";

interface FiltersContainerProps {
  children: React.ReactNode;
}

export const FiltersContainer: React.FC<FiltersContainerProps> = ({ children }) => {
  return (
    <div
      className="w-72 sticky top-6
       space-y-6 p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl"
    >
      {children}
    </div>
  );
};

export default FiltersContainer;


