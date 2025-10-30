"use client";

import React from "react";
import { EmptyState } from "../EmptyState";

interface EmptyResultsProps {
  show: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyResults: React.FC<EmptyResultsProps> = ({
  show,
  hasActiveFilters,
  onClearFilters,
}) => {
  if (!show) return null;
  return (
    <EmptyState hasActiveFilters={hasActiveFilters} onClearFilters={onClearFilters} />
  );
};

export default EmptyResults;


