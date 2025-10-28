"use client";
import { Button } from "@/components/ui/button";

interface AnalyticsHeaderProps {
  range: string;
  onChange: (value: string) => void;
}

export function AnalyticsHeader({ range, onChange }: AnalyticsHeaderProps) {
  const buttons = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "All", value: "all" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-2xl font-bold text-white tracking-wide">
        📊 Analytics Overview
      </h2>
      <div className="flex flex-wrap gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            size="sm"
            variant={range === btn.value ? "default" : "outline"}
            className={`rounded-full transition-all ${
              range === btn.value
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                : "border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
            }`}
            onClick={() => onChange(btn.value)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
