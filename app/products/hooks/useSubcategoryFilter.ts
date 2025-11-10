import { useQueryState } from "nuqs";
import { useCallback, useRef } from "react";
import { debounce } from "../utils/debounce";
import { useFilterArray, arrayToString } from "./useFilterArray";

export function useProductTypeFilter() {
  // نربط الحالة مع URL query param
  const [selectedProductTypesString, setProductTypesString] = useQueryState(
    "product-types", // اسم البراميتر في الـ URL
    { defaultValue: "" }
  );

  // نحول الـ string (من URL) إلى array
  const selectedProductTypes = useFilterArray(selectedProductTypesString);

  // Debounced function لتحديث الـ URL بعد 300ms من آخر تغيير
  const debouncedSetProductTypes = useRef(
    debounce((newProductTypes: string[]) => {
      setProductTypesString(arrayToString(newProductTypes));
    }, 300)
  ).current;

  // ✅ Toggle function
  const toggleProductType = useCallback(
    (value: string) => {
      const newProductTypes = selectedProductTypes.includes(value)
        ? selectedProductTypes.filter((v) => v !== value)
        : [...selectedProductTypes, value];

      debouncedSetProductTypes(newProductTypes);
    },
    [selectedProductTypes, debouncedSetProductTypes]
  );

  // ✅ Clear all selections
  const clearProductTypes = useCallback(() => {
    debouncedSetProductTypes([]);
  }, [debouncedSetProductTypes]);

  // ✅ Set مباشرة بدون debounce (لو حابب تتحكم من بره)
  const setProductTypes = useCallback(
    (productTypes: string[]) => {
      setProductTypesString(arrayToString(productTypes));
    },
    [setProductTypesString]
  );

  return {
    selectedProductTypes,
    selectedProductTypesString,
    toggleProductType,
    clearProductTypes,
    setProductTypes,
  };
}
