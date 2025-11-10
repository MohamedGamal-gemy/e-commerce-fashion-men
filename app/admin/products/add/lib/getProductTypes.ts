export async function getProductTypes() {
  try {
    const res = await fetch(`http://localhost:9000/api/product-types`);
    if (!res.ok) throw new Error("Failed to fetch product types");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
