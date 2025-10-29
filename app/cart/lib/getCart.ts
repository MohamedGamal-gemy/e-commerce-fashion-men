import { Cart } from "@/types/cart";
import { cookies } from "next/headers";

export const getSessionId = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionId")?.value ?? null;
};

export const getCart = async (): Promise<Cart> => {
  const sessionId = await getSessionId();

  // ✅ Unified empty cart shape
  const emptyCart: Cart = {
    _id: "",
    sessionId: sessionId ?? "",
    items: [],
    subtotal: 0,
    totalItems: 0,
    discountAmount: 0,
    couponCode: null,
  };

  if (!sessionId) return emptyCart;

  try {
    const res = await fetch(
      `http://localhost:9000/api/cart?sessionId=${sessionId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Failed to fetch cart:", await res.text());
      return emptyCart;
    }

    const data = await res.json();

    // ✅ Always return a consistent cart structure
    return data.cart ?? data ?? emptyCart;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Cart fetch error:", err.message);
    } else {
      console.error("❌ Unknown cart fetch error:", err);
    }
    return emptyCart;
  }
};
