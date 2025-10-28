
export async function apiGet<T>(
  url: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const { revalidate, ...fetchOptions } = options || {};

  const res = await fetch(url, {
    cache: revalidate ? "force-cache" : "default",
    next: revalidate ? { revalidate } : undefined,
    ...fetchOptions,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  return res.json();
}
