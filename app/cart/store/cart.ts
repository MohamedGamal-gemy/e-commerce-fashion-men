"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Cart } from "@/types/cart";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                               🔹 API Response Type                         */
/* -------------------------------------------------------------------------- */

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  error?: string;
  cart?: T;
  sessionId?: string;
}

/* -------------------------------------------------------------------------- */
/*                               🔹 API Helper                                */
/* -------------------------------------------------------------------------- */

async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options,
    });

    const data = (await res.json().catch(() => ({}))) as ApiResponse<T>;

    // if (!res.ok) {
    //   const message = data?.message || data?.error || res.statusText;
    //   throw new Error(message || "Request failed");
    // }

    return data as T;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API request error:", err.message);
      throw err;
    }
    throw new Error("Unknown API error");
  }
}

/* -------------------------------------------------------------------------- */
/*                               🔹 Fetch Cart                                */
/* -------------------------------------------------------------------------- */

const emptyCart: Cart = {
  _id: "",
  sessionId: "",
  couponCode: null,
  discountAmount: 0,
  items: [],
  subtotal: 0,
  totalItems: 0,
  createdAt: "",
  updatedAt: "",
  userId: null,
};

const fetchCart = async (sessionId: string | null): Promise<Cart> => {
  try {
    const url = sessionId
      ? `http://localhost:9000/api/cart?sessionId=${encodeURIComponent(
          sessionId
        )}`
      : `http://localhost:9000/api/cart`;

    const data = await apiRequest<ApiResponse<Cart>>(url);
    const cartData = data?.cart || emptyCart;
    const ensuredSessionId = data?.sessionId || sessionId || "";
    return { ...cartData, sessionId: ensuredSessionId };
  } catch (err: unknown) {
    if (err instanceof Error)
      console.error("❌ Failed to fetch cart:", err.message);
    return { ...emptyCart, sessionId: sessionId ?? "" };
  }
};

export function useCart(sessionId: string | null, initialData?: Cart) {
  return useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: () => fetchCart(sessionId),
    initialData: initialData ?? { ...emptyCart, sessionId: sessionId ?? "" },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    placeholderData: (prev) =>
      prev ?? { ...emptyCart, sessionId: sessionId ?? "" },
    notifyOnChangeProps: ["data"],
  });
}

/* -------------------------------------------------------------------------- */
/*                             🔹 Add To Cart                                 */
/* -------------------------------------------------------------------------- */

export interface AddToCartInput {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
  sessionId?: string;
}

const addToCart = async (cartItem: {
  product: string;
  variant: string;
  size: string;
  quantity: number;
}): Promise<ApiResponse> => {
  return axios.post("http://localhost:9000/api/cart/items", cartItem, {
    headers: {
      "Content-Type": "application/json",
      // لو بتستخدم sessionId في localStorage:
      // "x-session-id": localStorage.getItem("sessionId") || ""
    },
    withCredentials: true,
  });
};

export function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess, error } = useMutation<
    ApiResponse,
    Error,
    AddToCartInput
  >({
    mutationFn: addToCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data?.message || "Item added to cart successfully ✅");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add item to cart ❌");
    },
  });

  return {
    addToCart: mutate,
    isAdding: isPending,
    isAddError: isError,
    isAdded: isSuccess,
    addError: error,
  };
}

/* -------------------------------------------------------------------------- */
/*                       🔹 Update Cart Quantity                              */
/* -------------------------------------------------------------------------- */

interface UpdateCartInput {
  sessionId: string;
  variantId: string;
  size: string;
  quantity: number;
}

const updateCartQuantity = async (itemData: UpdateCartInput) =>
  apiRequest<ApiResponse>("http://localhost:9000/api/cart/items", {
    method: "PATCH",
    body: JSON.stringify(itemData),
  });

export function useUpdateCartQuantity(_sessionId: string | null) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    ApiResponse,
    Error,
    UpdateCartInput
  >({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      toast.success("Cart updated successfully 🛒");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) =>
      toast.error(err.message || "Failed to update cart quantity."),
  });

  return {
    updateQuantity: mutate,
    isUpdating: isPending,
    isUpdateError: isError,
    updateError: error,
  };
}

/* -------------------------------------------------------------------------- */
/*                           🔹 Remove Cart Item                              */
/* -------------------------------------------------------------------------- */

interface RemoveCartInput {
  sessionId: string;
  variant: string;
  size: string;
  color?: string;
}

const removeItemFromCart = async (itemData: RemoveCartInput) =>
  apiRequest<ApiResponse>("http://localhost:9000/api/cart/items", {
    method: "DELETE",
    body: JSON.stringify(itemData),
  });
export function useRemoveFromCart(_sessionId: string | null) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    ApiResponse,
    Error,
    RemoveCartInput
  >({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      toast.success("Item removed successfully ❌");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message || "Failed to remove item."),
  });

  return {
    removeFromCart: mutate,
    isRemoving: isPending,
    isRemoveError: isError,
    removeError: error,
  };
}

/* -------------------------------------------------------------------------- */
/*                           🔹 Clear Entire Cart                             */
/* -------------------------------------------------------------------------- */

const clearCart = async (sessionId: string | null) =>
  apiRequest<ApiResponse>("http://localhost:9000/api/cart", {
    method: "DELETE",
    body: JSON.stringify({ sessionId, deleteAll: true }),
  });

export function useClearCart(_sessionId: string | null) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    ApiResponse,
    Error,
    string | null
  >({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully 🧹");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message || "Failed to clear cart."),
  });

  return {
    clearCart: mutate,
    isClearing: isPending,
    isClearError: isError,
    clearError: error,
  };
}
