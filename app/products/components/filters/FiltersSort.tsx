"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersSortProps {
  sort?: string
  setSort: (value: "latest" | "price_asc" | "price_desc" | "top_rated") => void;
}

export default function FiltersSort({ sort, setSort }: FiltersSortProps) {
  return (
    <div className="space-y-2 w-40">

      <Select
        value={sort || "latest"}
        onValueChange={(v) =>
          setSort(v as "latest" | "price_asc" | "price_desc" | "top_rated")
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
