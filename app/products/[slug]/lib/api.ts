// small wrapper for fetch used on server
export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" }); // server fetch
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  
  const data: T = await res.json(); // نخزن النتيجة في متغير
  return data; // نرجع المتغير
}
