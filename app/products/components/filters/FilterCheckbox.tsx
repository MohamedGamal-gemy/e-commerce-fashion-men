"use client";

import React, { useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, useReducedMotion } from "framer-motion";

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ReactNode;
  colorSwatch?: string;
  disabled?: boolean;
}

const FilterCheckboxBase: React.FC<FilterCheckboxProps> = ({
  id,
  label,
  checked,
  onCheckedChange,
  icon,
  colorSwatch,
  disabled = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleChange = useCallback(
    (value: boolean | "indeterminate") => {
      if (value !== "indeterminate") onCheckedChange(value);
    },
    [onCheckedChange]
  );

  return (
    <motion.label
      htmlFor={id}
      layout
      whileHover={shouldReduceMotion ? undefined : { scale: disabled ? 1 : 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: disabled ? 1 : 0.98 }}
      className={`flex items-center  gap-3 px-3 w-48 py-2 rounded-lg border transition-colors cursor-pointer
        ${checked ? "bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-slate-600 shadow-sm" : "bg-transparent border-transparent hover:bg-slate-800/30"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "focus-visible:ring-2 focus-visible:ring-indigo-500/40"}
      `}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className="!h-4 !w-4"
        aria-label={`Select ${label}`}
      />

      {colorSwatch ? (
        <div
          className="w-4 h-4 rounded-full border border-slate-700 shadow-sm"
          style={{ backgroundColor: colorSwatch }}
          aria-hidden
        />
      ) : null}

      {icon ? <div className="text-slate-300">{icon}</div> : null}

      <span className="text-sm text-slate-200 font-medium flex-1 truncate ">{label}</span>
    </motion.label>
  );
};

export const FilterCheckbox = React.memo(FilterCheckboxBase);
