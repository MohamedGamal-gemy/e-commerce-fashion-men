"use client";

import { useQueryState, parseAsString, parseAsFloat } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { CalendarIcon, RotateCcw, Search } from "lucide-react";

export default function OrdersFilters() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("all")
  );

  const [from, setFrom] = useQueryState("from", parseAsString.withDefault(""));

  const [to, setTo] = useQueryState("to", parseAsString.withDefault(""));

  const [minTotal, setMinTotal] = useQueryState(
    "minTotal",
    parseAsFloat.withDefault("")
  );

  const [maxTotal, setMaxTotal] = useQueryState(
    "maxTotal",
    parseAsFloat.withDefault("")
  );

  const resetFilters = () => {
    setSearch(null);
    setStatus("all");
    setFrom(null);
    setTo(null);
    setMinTotal(null);
    setMaxTotal(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl mb-6 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 🔍 البحث */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search orders..."
            className="pl-8 bg-slate-800 border-slate-700"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🧾 الحالة - shadcn Select */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200 focus:ring-slate-600">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* 📅 من */}
        <div className="relative">
          <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="date"
            className="pl-8 bg-slate-800 border-slate-700"
            value={from || ""}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        {/* 📅 إلى */}
        <div className="relative">
          <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="date"
            className="pl-8 bg-slate-800 border-slate-700"
            value={to || ""}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* 💰 السعر الأدنى */}
        <Input
          placeholder="Min total"
          type="number"
          className="bg-slate-800 border-slate-700"
          value={minTotal || ""}
          onChange={(e) =>
            setMinTotal(e.target.value ? Number(e.target.value) : null)
          }
        />

        {/* 💰 السعر الأقصى */}
        <Input
          placeholder="Max total"
          type="number"
          className="bg-slate-800 border-slate-700"
          value={maxTotal || ""}
          onChange={(e) =>
            setMaxTotal(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>

      {/* 🔄 زر إعادة التصفية */}
      <div className="flex justify-end mt-3">
        <Button
          onClick={resetFilters}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800 transition-all"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </motion.div>
  );
}
