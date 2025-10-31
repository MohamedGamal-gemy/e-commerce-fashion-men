import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useProductForm from "./useProductForm"; // ✅ تأكد إن الباث صح

const useImagesOfVariants = ({ index }: { index: number }) => {
  const { watch } = useFormContext();

  // ✅ استدعاء الـ handlers من useProductForm
  const {
    handleVariantImageUpload,
    removeVariantNewImages,
    newImages,
    existingImages,
  } = useProductForm({}); // خد بالك: لو hook بتاعك محتاج args، لازم تباصيها

  // الصور الجديدة اللي اتضافت من اليوزر (Files)
  const currentNewImages = newImages[index] || [];
  // الصور القديمة اللي جاية من الـ backend
  const currentExistingImages = existingImages[index] || [];

  const [previews, setPreviews] = useState<
    { file: File | null; preview: string }[]
  >([]);

  // عند إضافة ملفات جديدة
  const onDrop = (acceptedFiles: File[]) => {
    handleVariantImageUpload(index, [...currentNewImages, ...acceptedFiles]);
  };

  // إعداد dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // بناء previews
  useEffect(() => {
    const allImages = [...currentExistingImages, ...currentNewImages] as (
      | File
      | string
      | { url: string }
    )[];

    if (allImages.length === 0) {
      setPreviews([]);
      return;
    }

    const newPreviews = allImages
      .map((img) => {
        if (img instanceof File) {
          return { file: img, preview: URL.createObjectURL(img) };
        } else if (typeof img === "string") {
          return { file: null, preview: img };
        } else if (img?.url) {
          return { file: null, preview: img.url };
        }
        return null;
      })
      .filter(Boolean) as { file: File | null; preview: string }[];

    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((p) => {
        if (p.file) URL.revokeObjectURL(p.preview);
      });
    };
  }, [currentNewImages, currentExistingImages]);

  // حذف صورة جديدة
  const removeImage = (fileIndex: number) => {
    // لو الحذف من الصور الجديدة
    if (fileIndex >= currentExistingImages.length) {
      const newIndex = fileIndex - currentExistingImages.length;
      const updated = currentNewImages.filter((_, i) => i !== newIndex);
      handleVariantImageUpload(index, updated);
    } else {
      // لو عايز تضيف دعم حذف الصور القديمة:
      // removeExistingImage(index, currentExistingImages[fileIndex])
    }
  };

  return {
    removeImage,
    previews,
    onDrop,
    getRootProps,
    getInputProps,
    isDragActive,
  };
};

export default useImagesOfVariants;