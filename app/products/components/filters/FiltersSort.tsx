"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface FiltersSortProps {
  sort?: "latest" | "price_asc" | "price_desc" | "top_rated";
  onChange: (value: "latest" | "price_asc" | "price_desc" | "top_rated") => void;
}

export default function FiltersSort({ sort, onChange }: FiltersSortProps) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-sky-400" /> Sort by
      </label>

      <Select
        value={sort || "latest"}
        onValueChange={(v) =>
          onChange(v as "latest" | "price_asc" | "price_desc" | "top_rated")
        }
      >
        <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-200">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="price_asc">Price: Low → High</SelectItem>
          <SelectItem value="price_desc">Price: High → Low</SelectItem>
          <SelectItem value="top_rated">Top Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
