import { useQueryState } from "nuqs";
import { useCallback, useRef } from "react";
import { debounce } from "../utils/debounce";
import { useFilterArray, arrayToString } from "./useFilterArray";

export function useSubcategoryFilter() {
  const [selectedSubcategoriesString, setSubcategoriesString] = useQueryState(
    "subcategory",
    { defaultValue: "" }
  );

  // تحويل الـ string لـ array
  const selectedSubcategories = useFilterArray(selectedSubcategoriesString);

  // Debounced function لتحديث الـ URL
  const debouncedSetSubcategories = useRef(
    debounce((newSubcategories: string[]) => {
      setSubcategoriesString(arrayToString(newSubcategories));
    }, 300)
  ).current;

  // دالة Toggle مع debounce
  const toggleSubcategory = useCallback(
    (value: string) => {
      const newSubcategories = selectedSubcategories.includes(value)
        ? selectedSubcategories.filter((v) => v !== value)
        : [...selectedSubcategories, value];

      debouncedSetSubcategories(newSubcategories);
    },
    [selectedSubcategories, debouncedSetSubcategories]
  );

  // دالة Clear All
  const clearSubcategories = useCallback(() => {
    debouncedSetSubcategories([]);
  }, [debouncedSetSubcategories]);

  // دالة Set مباشرة (بدون debounce)
  const setSubcategories = useCallback(
    (subcategories: string[]) => {
      setSubcategoriesString(arrayToString(subcategories));
    },
    [setSubcategoriesString]
  );

  return {
    selectedSubcategories,
    selectedSubcategoriesString,
    toggleSubcategory,
    clearSubcategories,
    setSubcategories,
  };
}

