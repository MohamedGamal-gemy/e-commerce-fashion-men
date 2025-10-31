// import { useFormContext } from "react-hook-form";
// import { ProductFormData } from "../../schemas/productSchema";
// import { useState, useCallback, useEffect } from "react";
// import { X, Upload, Plus, Image as ImageIcon, Download } from "lucide-react";

// interface ImagesOfVariantsProps {
//   variantIndx: number;
//   onImageUpload: (variantIndex: number, files: File[]) => void;
//   existingImages?: Array<string | File | { url: string }>;
//   onRemoveExistingImage?: (imageIndex: number) => void;
// }

// const ImagesOfVariants = ({
//   variantIndx,
//   onImageUpload,
//   existingImages = [],
//   onRemoveExistingImage,
// }: ImagesOfVariantsProps) => {
//   const {
//     formState: { errors },
//   } = useFormContext<ProductFormData>();

//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [isDragOver, setIsDragOver] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     // console.log(
//     //   `📸 Selected ${files.length} files for variant ${variantIndx}:`,
//     //   files
//     // );

//     // Add new files to existing selection
//     setSelectedFiles((prev) => {
//       const updated = [...prev, ...files];
//       // console.log(
//       //   `🔄 Total files for variant ${variantIndx}: ${updated.length}`
//       // );

//       // Call the parent handler to update the hook state
//       if (onImageUpload) {
//         onImageUpload(variantIndx, updated);
//       }

//       return updated;
//     });
//   };

//   // Preserve selected files when component re-renders
//   useEffect(() => {
//     // This ensures that when the component re-renders (due to other field changes),
//     // we don't lose the selected files
//     // console.log(
//     //   `🔄 ImagesOfVariants re-rendered for variant ${variantIndx}, preserving ${selectedFiles.length} selected files`
//     // );
//   }, [variantIndx, selectedFiles.length]);

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   }, []);

//   const handleDrop = useCallback(
//     (e: React.DragEvent) => {
//       e.preventDefault();
//       setIsDragOver(false);

//       const files = Array.from(e.dataTransfer.files);
//       console.log(
//         `📸 Dropped ${files.length} files for variant ${variantIndx}:`,
//         files
//       );

//       // Filter only image files
//       const imageFiles = files.filter((file) => file.type.startsWith("image/"));

//       if (imageFiles.length !== files.length) {
//         console.warn(
//           `⚠️ Filtered out ${files.length - imageFiles.length} non-image files`
//         );
//       }

//       if (imageFiles.length > 0) {
//         setSelectedFiles((prev) => {
//           const updated = [...prev, ...imageFiles];
//           console.log(
//             `🔄 Total files after drop for variant ${variantIndx}: ${updated.length}`
//           );

//           // Call the parent handler to update the hook state
//           if (onImageUpload) {
//             onImageUpload(variantIndx, updated);
//           }

//           return updated;
//         });
//       }
//     },
//     [variantIndx, onImageUpload]
//   );

//   const removeFile = (index: number) => {
//     setSelectedFiles((prev) => {
//       const newFiles = prev.filter((_, i) => i !== index);

//       // Call the parent handler to update the hook state
//       if (onImageUpload) {
//         onImageUpload(variantIndx, newFiles);
//       }

//       return newFiles;
//     });
//   };

//   // Helper function to safely get image source
//   const getImageSrc = (img: string | File | { url: string }): string => {
//     if (typeof img === "string") {
//       return img;
//     }
//     if (img instanceof File) {
//       return URL.createObjectURL(img);
//     }
//     if (img && typeof img === "object" && "url" in img) {
//       return img.url;
//     }
//     // Return a data URL placeholder
//     return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzM0MTU2Ii8+CjxwYXRoIGQ9Ik0zMiAyMEMyNC4yNjgxIDIwIDE4IDI2LjI2ODEgMTggMzRDMjAgMzQgMjIgMzUuMzQzMSAyNCAzNkMyNCAzNy4xMDQ2IDIzLjEwNDYgMzggMjIgMzhIMjJDMjAuODk1NCAzOCAyMCAzNy4xMDQ2IDIwIDM2QzIwIDI4LjI2ODEgMjYuMjY4MSAyMiAzNCAyMkM0MS43MzE5IDIyIDQ4IDI4LjI2ODEgNDggMzZDNCA4IDQ2IDM3LjEwNDYgNDYgMzhINTRDNDIuODk1NCAzOCA0MiAzNy4xMDQ2IDQyIDM2QzQyIDI4LjI2ODEgMzUuNzMxOSAyMiAyOCAyMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
//   };

//   // Helper function to check if image is valid
//   const isValidImage = (
//     img: string | File | { url: string } | undefined
//   ): img is string | File | { url: string } => {
//     return Boolean(
//       img &&
//         (typeof img === "string" ||
//           img instanceof File ||
//           (typeof img === "object" && "url" in img))
//     );
//   };

//   const totalImages =
//     (existingImages?.filter(isValidImage).length || 0) + selectedFiles.length;

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <label className="block text-sm font-medium text-gray-200">
//           Variant Images
//         </label>
//         <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
//           {totalImages} image{totalImages !== 1 ? "s" : ""}
//         </span>
//       </div>

//       {/* Enhanced File Input for Multiple Photos */}
//       <div className="space-y-3">
//         <div className="flex items-center gap-2">
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//             id={`image-upload-${variantIndx}`}
//           />
//           <label
//             htmlFor={`image-upload-${variantIndx}`}
//             className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             <Upload size={18} />
//             <span className="font-medium">Upload Multiple Photos</span>
//           </label>

//           {/* Quick Add More Button */}
//           <button
//             type="button"
//             onClick={() =>
//               document.getElementById(`image-upload-${variantIndx}`)?.click()
//             }
//             className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             <Plus size={18} />
//             <span>Add More</span>
//           </button>
//         </div>

//         {/* Drag & Drop Zone */}
//         <div
//           className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
//             isDragOver
//               ? "border-sky-400 bg-sky-900/20"
//               : "border-gray-600 hover:border-gray-500"
//           }`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <Download
//             size={32}
//             className={`mx-auto mb-3 transition-colors duration-200 ${
//               isDragOver ? "text-sky-400" : "text-gray-500"
//             }`}
//           />
//           <p
//             className={`text-sm transition-colors duration-200 ${
//               isDragOver ? "text-sky-300" : "text-gray-400"
//             }`}
//           >
//             {isDragOver
//               ? "Drop images here!"
//               : "Drag & drop multiple images here"}
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             Supports: JPG, PNG, GIF, WebP
//           </p>
//         </div>

//         <p className="text-xs text-gray-400">
//           💡 You can select multiple images at once, use "Add More", or drag &
//           drop images directly
//         </p>
//       </div>

//       {/* Image Grid Display */}
//       <div className="space-y-4">
//         {/* Existing Images Section */}
//         {existingImages && existingImages.length > 0 && (
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <ImageIcon size={16} className="text-gray-400" />
//               <h4 className="text-sm font-medium text-gray-300">
//                 Existing Images ({existingImages.filter(isValidImage).length})
//               </h4>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {existingImages.filter(isValidImage).map((img, idx) => (
//                 <div key={`existing-${idx}`} className="relative group">
//                   <img
//                     src={getImageSrc(img)}
//                     alt={`Existing ${idx + 1}`}
//                     className="w-full h-24 object-cover rounded-lg border-2 border-gray-600 group-hover:border-sky-400 transition-all duration-200"
//                     onError={(e) => {
//                       e.currentTarget.src = getImageSrc("placeholder");
//                     }}
//                   />
//                   <div
//                     className="absolute top-0 left-0 
//                      group-hover:bg-black/30 transition-colors rounded-lg flex items-center justify-center"
//                   >
//                     <button
//                       type="button"
//                       onClick={() => onRemoveExistingImage?.(idx)}
//                       className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-opacity"
//                       title="Delete image"
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* New Selected Files Section */}
//         {selectedFiles.length > 0 && (
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <Plus size={16} className="text-green-400" />
//               <h4 className="text-sm font-medium text-green-300">
//                 New Images ({selectedFiles.length})
//               </h4>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//               {selectedFiles.map((file, idx) => (
//                 <div key={`new-${idx}`} className="relative group">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`New ${idx + 1}`}
//                     className="w-full h-24 object-cover rounded-lg border-2 border-green-400 group-hover:border-green-300 transition-all duration-200"
//                   />
//                   <div className="absolute top-0 left-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
//                     <button
//                       type="button"
//                       onClick={() => removeFile(idx)}
//                       className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-200"
//                       title="Remove image"
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                   <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                     NEW
//                   </div>
//                   <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
//                     {(file.size / 1024 / 1024).toFixed(1)} MB
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {totalImages === 0 && (
//           <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
//             <ImageIcon size={48} className="mx-auto text-gray-500 mb-3" />
//             <p className="text-gray-400 text-sm">No images uploaded yet</p>
//             <p className="text-gray-500 text-xs mt-1">
//               Click "Upload Multiple Photos" or drag & drop images to get
//               started
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Error Display */}
//       {errors?.variants?.[variantIndx]?.images && (
//         <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
//           <p className="text-red-400 text-sm">
//             {errors.variants[variantIndx].images?.message}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImagesOfVariants;


import React from 'react'

const ImagesOfVariants = () => {
  return (
    <div>ImagesOfVariants</div>
  )
}

export default ImagesOfVariants