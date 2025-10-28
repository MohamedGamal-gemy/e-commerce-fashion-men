// export function debounce<T extends (...args: any[]) => void>(
//   callback: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeoutId: NodeJS.Timeout | null = null;

//   return (...args: Parameters<T>) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       callback(...args);
//     }, wait);
//   };
// }

// utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}