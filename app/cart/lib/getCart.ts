import { Cart } from "@/types/cart";
import { cookies } from "next/headers";

export const getSessionId = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionId")?.value ?? null;
};

export const getCart = async (): Promise<Cart> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value ?? null;

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

  try {
    const url = sessionId
      ? `http://localhost:9000/api/cart?sessionId=${sessionId}`
      : `http://localhost:9000/api/cart`;

    const res = await fetch(url, {
      cache: "no-store",
      // forward current cookies to backend (for SSR)
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch cart:", await res.text());
      return emptyCart;
    }

    const data = await res.json();
    const ensuredSessionId: string = data?.sessionId || sessionId || "";
    const cart: Cart = data?.cart
      ? { ...data.cart, sessionId: ensuredSessionId }
      : { ...emptyCart, sessionId: ensuredSessionId };

    // Note: On SSR, Set-Cookie from backend won't reach browser. We pass sessionId via props.
    return cart;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Cart fetch error:", err.message);
    } else {
      console.error("❌ Unknown cart fetch error:", err);
    }
    return emptyCart;
  }
};
