// app/products/hooks/useColorFilter.ts
import { useQueryState } from "nuqs";
import { useCallback, useRef } from "react";
import { debounce } from "../utils/debounce";
import { useFilterArray, arrayToString } from "./useFilterArray";

export function useColorFilter() {
  // نربط الـ state بالـ URL param
  const [selectedColorsString, setColorsString] = useQueryState("colors", {
    defaultValue: "",
  });

  // نحول الـ string إلى array
  const selectedColors = useFilterArray(selectedColorsString);

  // ✅ debounce function
  const debouncedSetColors = useRef(
    debounce((newColors: string[]) => {
      setColorsString(arrayToString(newColors));
    }, 300)
  ).current;

  // ✅ toggleColor
  const toggleColor = useCallback(
    (value: string) => {
      const newColors = selectedColors.includes(value)
        ? selectedColors.filter((v) => v !== value)
        : [...selectedColors, value];

      debouncedSetColors(newColors);
    },
    [selectedColors, debouncedSetColors]
  );

  // ✅ clear all colors
  const clearColors = useCallback(() => {
    debouncedSetColors([]);
  }, [debouncedSetColors]);

  // ✅ set colors directly (بدون debounce)
  const setColors = useCallback(
    (colors: string[]) => {
      setColorsString(arrayToString(colors));
    },
    [setColorsString]
  );

  return {
    selectedColors,
    selectedColorsString,
    toggleColor,
    clearColors,
    setColors,
  };
}
