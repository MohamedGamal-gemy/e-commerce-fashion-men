"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FiltersSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function FiltersSearch({ search, setSearch }: FiltersSearchProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
