"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Cart } from "@/types/cart"; // ✅ استيراد الـ types من ملفك

/* -------------------------------------------------------------------------- */
/*                               🔹 API Response Type                         */
/* -------------------------------------------------------------------------- */

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  error?: string;
  cart?: T;
}

/* -------------------------------------------------------------------------- */
/*                               🔹 API Helper                                */
/* -------------------------------------------------------------------------- */

async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = (await res.json().catch(() => ({}))) as ApiResponse<T>;

    if (!res.ok) {
      const message = data?.message || data?.error || res.statusText;
      throw new Error(message || "Request failed");
    }

    return data as T;
  } catch (err: any) {
    console.error("API request error:", err.message);
    throw err;
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
  if (!sessionId) return emptyCart;

  try {
    const url = `http://localhost:9000/api/cart?sessionId=${encodeURIComponent(sessionId)}`;
    const data = await apiRequest<ApiResponse<Cart>>(url);
    return data?.cart || emptyCart;
  } catch (err: any) {
    console.error("❌ Failed to fetch cart:", err.message);
    return emptyCart;
  }
};

export function useCart(sessionId: string | null, initialData?: Cart) {
  return useQuery<Cart, Error>({
    queryKey: ["cart", sessionId],
    queryFn: () => fetchCart(sessionId),
    initialData: initialData ?? emptyCart,
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev ?? emptyCart, // ✅ البديل عن keepPreviousData
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

// ✅ دالة إرسال الطلب للـ API
const addToCart = async (cartItem: AddToCartInput): Promise<ApiResponse> => {
  const res = await apiRequest<ApiResponse>(
    "http://localhost:9000/api/cart/add",
    {
      method: "POST",
      body: JSON.stringify(cartItem),
    }
  );

  return res;
};

// ✅ الهوك الخاص بالإضافة للسلة
export function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess, error } = useMutation<
    ApiResponse,
    Error,
    AddToCartInput
  >({
    mutationFn: addToCart,
    onSuccess: (data, variables) => {
      // تحديث الكارت بعد الإضافة
      queryClient.invalidateQueries({
        queryKey: ["cart", variables.sessionId],
      });

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
  apiRequest<ApiResponse>(
    "http://localhost:9000/api/cart",
    {
      method: "PUT",
      body: JSON.stringify(itemData),
    }
  );

export function useUpdateCartQuantity(sessionId: string | null) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    ApiResponse,
    Error,
    UpdateCartInput
  >({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      toast.success("Cart updated successfully 🛒");
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
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
  variantId: string;
  size: string;
}

const removeItemFromCart = async (itemData: RemoveCartInput) =>
  apiRequest<ApiResponse>(
    "http://localhost:9000/api/cart",
    {
      method: "DELETE",
      body: JSON.stringify(itemData),
    }
  );

export function useRemoveFromCart(sessionId: string | null) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    ApiResponse,
    Error,
    RemoveCartInput
  >({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      toast.success("Item removed successfully ❌");
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
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
  apiRequest<ApiResponse>(
    "http://localhost:9000/api/cart",
    {
      method: "DELETE",
      body: JSON.stringify({ sessionId, deleteAll: true }),
    }
  );

export function useClearCart(sessionId: string | null) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    ApiResponse,
    Error,
    string | null
  >({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully 🧹");
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
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
