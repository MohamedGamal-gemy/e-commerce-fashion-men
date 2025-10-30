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

function FilterCheckboxBase({
  id,
  label,
  checked,
  onCheckedChange,
  icon,
  colorSwatch,
  disabled = false,
}: FilterCheckboxProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleChange = useCallback(
    (newChecked: boolean | "indeterminate") => {
      if (newChecked !== "indeterminate") {
        onCheckedChange(newChecked);
      }
    },
    [onCheckedChange]
  );

  return (
    <motion.label
      htmlFor={id}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg border transition-all cursor-pointer outline-none
        ${
          checked
            ? "bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10"
            : "bg-slate-800/60 border-slate-700 hover:border-slate-500"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "focus-visible:ring-2 focus-visible:ring-blue-500/50"}
      `}
      whileHover={shouldReduceMotion ? undefined : { scale: disabled ? 1 : 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: disabled ? 1 : 0.98 }}
      layout
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className={`
          data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
          data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-blue-500/50
        `}
        aria-label={`Select ${label}`}
      />
      
      {colorSwatch && (
        <div 
          className="w-4 h-4 rounded-full border border-slate-600 shadow-sm"
          style={{ backgroundColor: colorSwatch }}
          title={label}
          aria-hidden="true"
        />
      )}
      
      {icon && <div className="text-slate-300">{icon}</div>}
      
      <span className="text-slate-200 text-sm font-medium flex-1">
        {label}
      </span>
    </motion.label>
  );
}

export const FilterCheckbox = React.memo(FilterCheckboxBase);