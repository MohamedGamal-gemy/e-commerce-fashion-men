"use client";

import React from "react";

interface FiltersContainerProps {
  children: React.ReactNode;
}

export const FiltersContainer: React.FC<FiltersContainerProps> = ({ children }) => {
  return (
    <div
      // className="w-72 sticky top-6
      //  space-y-6 p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl"
// className="bg-gradient-to-br to-slate-900/40 via-slate-800 from-slate-900/40 p-4 w-72"
className="sticky top-6 bg-gradient-to-br to-gray-800 via-black/70 from-gray-800 w-72 p-4 space-y-6"
>
      {children}
    </div>
  );
};

export default FiltersContainer;


