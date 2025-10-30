"use client";

import React from "react";
import { ProductSkeleton } from "../ui/ProductSkeleton";

interface LoadingStateProps {
  show: boolean;
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ show, count = 8 }) => {
  if (!show) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingState;


