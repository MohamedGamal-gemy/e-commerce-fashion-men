"use client";
import { useMemo } from "react";
import { useQueryState } from "nuqs";
import { useDebouncedValue } from "./useDebouncedValue";

export function useFilterState() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [productTypeCsv, setProductTypeCsv] = useQueryState("productTypeName", { defaultValue: "" });
  const [colorCsv, setColorCsv] = useQueryState("color", { defaultValue: "" });
  const [pageStr, setPageStr] = useQueryState("page", { defaultValue: "1" });

  const page = useMemo(() => Math.max(1, parseInt(pageStr || "1", 10) || 1), [pageStr]);
  const limit = 20;

  const debouncedSearch = useDebouncedValue(search, 350);

  const setCsv = (arr: string[]) => arr.filter(Boolean).join(",");
  const toggleCsv = (csv: string, value: string) => {
    const arr = csv ? csv.split(",").filter(Boolean) : [];
    const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    return setCsv(next);
  };

  const onSearchChange = (v: string) => { setSearch(v); setPageStr("1"); };
  const onToggleProductType = (name: string) => { setProductTypeCsv(toggleCsv(productTypeCsv, name)); setPageStr("1"); };
  const onToggleColor = (value: string) => { setColorCsv(toggleCsv(colorCsv, value)); setPageStr("1"); };
  const onClearAll = () => { setSearch(""); setProductTypeCsv(""); setColorCsv(""); setPageStr("1"); };
  const setPage = (p: number) => setPageStr(String(p));

  return {
    search,
    debouncedSearch,
    productTypeCsv,
    colorCsv,
    page,
    limit,
    onSearchChange,
    onToggleProductType,
    onToggleColor,
    onClearAll,
    setPage,
  };
}
