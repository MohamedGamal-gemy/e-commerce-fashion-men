export const getImageUrl = (img: any): string => {
  if (img instanceof File) {
    return URL.createObjectURL(img);
  }
  if (typeof img === "string") {
    return img;
  }
  if (img?.url) {
    return img.url;
  }
  if (img?.preview) {
    return img.preview;
  }
  return "";
};