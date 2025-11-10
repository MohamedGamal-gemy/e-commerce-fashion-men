// src/features/products/api/client.ts
export function getApiBase() {
  // Prefer server-side env, fallback to public env, then default
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:9000/api"
  );
}

export async function apiGet<T>(
  path: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const base = getApiBase();
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const { revalidate, ...fetchOptions } = options || {};

  const res = await fetch(url, {
    cache: revalidate ? "force-cache" : "default",
    next: revalidate ? { revalidate } : undefined,
    ...fetchOptions,
  });
  if (!res.ok) {
    throw new Error(`GET ${url} failed: ${res.status}`);
  }
  return res.json();
}
