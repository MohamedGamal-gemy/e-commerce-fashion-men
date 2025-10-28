import { useQueryState } from "nuqs";
import { useCallback, useRef } from "react";
import { debounce } from "../utils/debounce";
import { useFilterArray, arrayToString } from "./useFilterArray";

export function useColorFilter() {
  const [selectedColorsString, setColorsString] = useQueryState("color", {
    defaultValue: "",
  });

  // تحويل الـ string لـ array
  const selectedColors = useFilterArray(selectedColorsString);

  // Debounced function لتحديث الـ URL
  const debouncedSetColors = useRef(
    debounce((newColors: string[]) => {
      setColorsString(arrayToString(newColors));
    }, 300)
  ).current;

  // دالة Toggle مع debounce
  const toggleColor = useCallback(
    (value: string) => {
      const newColors = selectedColors.includes(value)
        ? selectedColors.filter((v) => v !== value)
        : [...selectedColors, value];
      
      debouncedSetColors(newColors);
    },
    [selectedColors, debouncedSetColors]
  );

  // دالة Clear All
  const clearColors = useCallback(() => {
    debouncedSetColors([]);
  }, [debouncedSetColors]);

  // دالة Set مباشرة (بدون debounce)
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


