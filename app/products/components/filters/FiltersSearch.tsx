import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FiltersSearch({ search, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm font-medium">Search</label>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search products..."
          value={search}
          // onChange={(e) => onChange("search", e.target.value)}
          onChange={(e) => onChange( e.target.value)}
          className="pl-9 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}
