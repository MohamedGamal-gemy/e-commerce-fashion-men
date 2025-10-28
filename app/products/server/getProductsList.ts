export const getProductsList = async () => {
  const res = await fetch("http://localhost:9000/api/products/show", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};
