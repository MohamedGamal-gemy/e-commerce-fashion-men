
import { cookies } from "next/headers";

export const getSessionId = async() => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionId")?.value || null;
};

export const getCart = async () => {
  const sessionId =await getSessionId();

  if (!sessionId) {
    return { items: [], subtotal: 0, totalItems: 0 };
  }

  try {
    const res = await fetch(
      `http://localhost:9000/api/cart?sessionId=${sessionId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Failed to fetch cart:", await res.text());
      return { items: [], subtotal: 0, totalItems: 0 };
    }

    const data = await res.json();
    return data?.cart || data || { items: [], subtotal: 0, totalItems: 0 };
  } catch (err) {
    console.error("❌ Cart fetch error:", err.message);
    return { items: [], subtotal: 0, totalItems: 0 };
  }
};
