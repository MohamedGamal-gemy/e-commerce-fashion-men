export const currency = (v) => `$${Number(v || 0).toLocaleString()}`;
export const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch (e) {
    return iso;
  }
};
