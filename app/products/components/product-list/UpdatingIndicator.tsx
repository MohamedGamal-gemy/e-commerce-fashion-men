"use client";

import React from "react";

interface UpdatingIndicatorProps {
  show: boolean;
}

export const UpdatingIndicator: React.FC<UpdatingIndicatorProps> = ({ show }) => {
  if (!show) return null;
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      <span className="text-sm">Updating...</span>
    </div>
  );
};

export default UpdatingIndicator;


