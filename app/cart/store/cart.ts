// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "sonner";

// /* ---------------------------- Fetch Cart ---------------------------- */
// const fetchCart = async (sessionId) => {
//   if (!sessionId) return { items: [], subtotal: 0, totalItems: 0 };

//   try {
//     const res = await axios.get("http://localhost:9000/api/cart", {
//       params: { sessionId },
//     });

//     return (
//       res.data?.cart || res.data || { items: [], subtotal: 0, totalItems: 0 }
//     );
//   } catch (err) {
//     console.error("Failed to fetch cart:", err.response?.data || err.message);
//     return { items: [], subtotal: 0, totalItems: 0 };
//   }
// };

// export function useCart(sessionId, initialData) {
//   return useQuery({
//     queryKey: ["cart", sessionId],
//     queryFn: () => fetchCart(sessionId),
//     initialData,
//     enabled: !!sessionId,
//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 10,
//     refetchOnWindowFocus: false,
//     keepPreviousData: true,
//     notifyOnChangeProps: ["data"],
//   });
// }

// /* --------------------------- Add To Cart --------------------------- */
// const addToCart = async (cartItem) => {
//   const res = await axios.post("http://localhost:9000/api/cart/add", cartItem);
//   return res.data;
// };

// export function useAddToCart() {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, isError, isSuccess, error } = useMutation({
//     mutationFn: addToCart,
//     onSuccess: (data, variables) => {
//       const sessionId = variables.sessionId;
//       queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
//       toast.success(data?.message || "Item added to cart successfully");
//     },
//     onError: (err) => {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         err.message ||
//         "Failed to add item to cart.";
//       console.error("Add to cart error:", msg);
//       toast.error(msg);
//     },
//   });

//   return {
//     addToCart: mutate,
//     isAdding: isPending,
//     isAddError: isError,
//     isAdded: isSuccess,
//     addError: error,
//   };
// }

// /* ------------------------ Update Cart Quantity ------------------------ */
// const updateCartQuantity = async (itemData) => {
//   const res = await axios.put("http://localhost:9000/api/cart", itemData);
//   return res.data;
// };

// export function useUpdateCartQuantity(sessionId) {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, isError, error } = useMutation({
//     mutationFn: updateCartQuantity,
//     onSuccess: () => {
//       toast.success("Cart updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
//     },
//     onError: (err) => {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message ||
//         "Failed to update cart quantity.";
//       console.error(msg);
//       toast.error(msg);
//     },
//   });

//   return {
//     updateQuantity: mutate,
//     isUpdating: isPending,
//     isUpdateError: isError,
//     updateError: error,
//   };
// }

// /* ------------------------- Remove Cart Item ------------------------- */
// const removeItemFromCart = async (itemData) => {
//   const res = await axios.delete("http://localhost:9000/api/cart", {
//     data: itemData,
//   });
//   return res.data;
// };

// export function useRemoveFromCart(sessionId) {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, isError, error } = useMutation({
//     mutationFn: removeItemFromCart,
//     onSuccess: () => {
//       toast.success("Item removed successfully");
//       queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
//     },
//     onError: (err) => {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message ||
//         "Failed to remove item from cart.";
//       console.error(msg);
//       toast.error(msg);
//     },
//   });

//   return {
//     removeFromCart: mutate,
//     isRemoving: isPending,
//     isRemoveError: isError,
//     removeError: error,
//   };
// }

// /* --------------------------- Clear Entire Cart --------------------------- */
// const clearCart = async (sessionId) => {
//   const res = await axios.delete("http://localhost:9000/api/cart", {
//     data: { sessionId, deleteAll: true },
//   });
//   return res.data;
// };

// export function useClearCart(sessionId) {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, isError, error } = useMutation({
//     mutationFn: clearCart,
//     onSuccess: () => {
//       toast.success("Cart cleared successfully");
//       queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
//     },
//     onError: (err) => {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         err.message ||
//         "Failed to clear cart.";
//       console.error(msg);
//       toast.error(msg);
//     },
//   });

//   return {
//     clearCart: mutate,
//     isClearing: isPending,
//     isClearError: isError,
//     clearError: error,
//   };
// }


"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/* ---------------------------- Helper Function ---------------------------- */
async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = data?.message || data?.error || res.statusText;
      throw new Error(message || "Request failed");
    }

    return data;
  } catch (err) {
    console.error("API request error:", err.message);
    throw err;
  }
}

/* ---------------------------- Fetch Cart ---------------------------- */
const fetchCart = async (sessionId) => {
  if (!sessionId) return { items: [], subtotal: 0, totalItems: 0 };

  try {
    const url = `http://localhost:9000/api/cart?sessionId=${encodeURIComponent(
      sessionId
    )}`;
    const data = await apiRequest(url);
    return data?.cart || data || { items: [], subtotal: 0, totalItems: 0 };
  } catch (err) {
    console.error("Failed to fetch cart:", err.message);
    return { items: [], subtotal: 0, totalItems: 0 };
  }
};

export function useCart(sessionId, initialData) {
  return useQuery({
    queryKey: ["cart", sessionId],
    queryFn: () => fetchCart(sessionId),
    initialData,
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    notifyOnChangeProps: ["data"],
  });
}

/* --------------------------- Add To Cart --------------------------- */
const addToCart = async (cartItem) => {
  return apiRequest("http://localhost:9000/api/cart/add", {
    method: "POST",
    body: JSON.stringify(cartItem),
  });
};

export function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data, variables) => {
      const sessionId = variables.sessionId;
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
      toast.success(data?.message || "Item added to cart successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add item to cart.");
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

/* ------------------------ Update Cart Quantity ------------------------ */
const updateCartQuantity = async (itemData) => {
  return apiRequest("http://localhost:9000/api/cart", {
    method: "PUT",
    body: JSON.stringify(itemData),
  });
};

export function useUpdateCartQuantity(sessionId) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      toast.success("Cart updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update cart quantity.");
    },
  });

  return {
    updateQuantity: mutate,
    isUpdating: isPending,
    isUpdateError: isError,
    updateError: error,
  };
}

/* ------------------------- Remove Cart Item ------------------------- */
const removeItemFromCart = async (itemData) => {
  return apiRequest("http://localhost:9000/api/cart", {
    method: "DELETE",
    body: JSON.stringify(itemData),
  });
};

export function useRemoveFromCart(sessionId) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      toast.success("Item removed successfully");
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove item from cart.");
    },
  });

  return {
    removeFromCart: mutate,
    isRemoving: isPending,
    isRemoveError: isError,
    removeError: error,
  };
}

/* --------------------------- Clear Entire Cart --------------------------- */
const clearCart = async (sessionId) => {
  return apiRequest("http://localhost:9000/api/cart", {
    method: "DELETE",
    body: JSON.stringify({ sessionId, deleteAll: true }),
  });
};

export function useClearCart(sessionId) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully");
      queryClient.invalidateQueries({ queryKey: ["cart", sessionId] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to clear cart.");
    },
  });

  return {
    clearCart: mutate,
    isClearing: isPending,
    isClearError: isError,
    clearError: error,
  };
}
