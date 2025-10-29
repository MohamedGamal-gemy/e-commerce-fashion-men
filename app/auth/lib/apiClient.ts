export async function apiPost<T, B = unknown>(url: string, body: B): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important to send cookies
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error((data as { message?: string }).message || "Request failed");
  return data as T;
}
