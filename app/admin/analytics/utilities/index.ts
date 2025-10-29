export const currency = (v: number | string) =>
  `$${Number(v || 0).toLocaleString()}`;

export const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};
