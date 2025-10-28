export const getSubcategories = async () => {
  const res = await fetch("http://localhost:9000/api/subcategories", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};
