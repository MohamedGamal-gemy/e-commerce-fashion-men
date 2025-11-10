import { Cart } from "@/types/cart";
import { cookies } from "next/headers";

export const getSessionId = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionId")?.value ?? null;
};

export const getCart = async (): Promise<Cart> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value ?? null;

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
    const url = `http://localhost:9000/api/cart`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // ✅ لو السيرفر رجّع خطأ (404 / 500 / إلخ)
    if (!res.ok) {
      const errorText = await res.text().catch(() => "No response body");
      console.error("🚨 [Cart Fetch Error]");
      console.error("URL:", url);
      console.error("Status:", res.status);
      console.error("Status Text:", res.statusText);
      console.error("Response Body:", errorText);
      console.error("----------------------------");

      return {
        ...emptyCart,
        error: `Failed to fetch cart: ${res.status} ${res.statusText}`,
      } as Cart;
    }

    // ✅ لو كل شيء تمام
    const data = await res.json();
    const ensuredSessionId: string = data?.sessionId || sessionId || "";

    const cart: Cart = data?.cart
      ? { ...data.cart, sessionId: ensuredSessionId }
      : { ...emptyCart, sessionId: ensuredSessionId };

    return cart;
  } catch (err: any) {
    console.error("💥 [Unhandled Cart Fetch Error]");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("----------------------------");

    return {
      ...emptyCart,
      error: `Unhandled error: ${err.message}`,
    } as Cart;
  }
};
