
// import { useMemo } from "react";

// export function useFilterArray(value: string): string[] {
//   return useMemo(() => {
//     if (!value) return [];
//     return value.split(",").filter(Boolean);
//   }, [value]);
// }

// export function arrayToString(values: string[]): string {
//   return values.filter(Boolean).join(",");
// }

// hooks/useFilterArray.ts
import { useMemo } from "react";

export function useFilterArray(value: string | null | undefined): string[] {
  return useMemo(() => {
    if (!value || value === "") return [];
    return value.split(",").filter(Boolean);
  }, [value]);
}

export function arrayToString(values: string[]): string {
  return values.filter(Boolean).join(",");
}