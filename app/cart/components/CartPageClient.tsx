"use client";

import { memo, useState } from "react";
import {
  useCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "../store/cart";
import { toast } from "sonner";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartHeader from "./CartHeader";
import CartEmpty from "./CartEmpty";
import { Cart, CartItem as CartItemType } from "@/types/cart";

type Props = {
  cart: Cart;
  sessionId: string | null;
};

const CartPageClient = ({ cart, sessionId }: Props) => {
  const { removeFromCart, isRemoving } = useRemoveFromCart(sessionId);
  const { updateQuantity, isUpdating } = useUpdateCartQuantity(sessionId);
  const { data, isLoading } = useCart(sessionId, cart);

  const [isPending, setIsPending] = useState<number | null>(null);
  if (!sessionId) return;

  const handleQuantityChange = (
    variantId: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) return;
    updateQuantity({
      sessionId,
      variant: variantId, // ✅ بدل variantId
      size,
      quantity: newQuantity,
    });
  };

  const handleDelete = ({
    variantId,
    size,
    color,
  }: {
    variantId: string;
    size: string;
    color?: string;
  }) => {
    removeFromCart(
      { sessionId, variant: variantId, size, color },
      { onSuccess: () => toast.success("Item removed successfully ✅") }
    );
  };

  if (isLoading)
    return (
      <div className="text-gray-300 py-20 text-center">
        Loading your cart...
      </div>
    );

  // ✅ البيانات الحقيقية بتيجي في data.cart
  const currentCart = (data ?? cart) as Cart;
  const items = currentCart.items ?? [];
  // console.log(items);

  if (items.length === 0)
    return (
      <div className="mx-auto -mt-10 pb-6">
        <CartEmpty />
      </div>
    );

  return (
    <div className="w-full">
      <CartHeader itemsCount={currentCart.totalItems ?? 0} />

      <div className="flex flex-col md:flex-row gap-8 justify-between text-gray-100 px-6 py-8 min-h-screen">
        {/* 🛒 Cart Items */}
        <div className="space-y-6 w-full md:w-[750px]">
          {items.map((item: CartItemType, i: number) => (
            <CartItem
              key={i}
              item={item}
              i={i}
              handleQuantityChange={handleQuantityChange}
              handleDelete={handleDelete}
              isUpdating={isUpdating}
              isRemoving={isRemoving}
              isPending={isPending}
              setIsPending={setIsPending}
            />
          ))}
        </div>

        {/* 💰 Summary */}
        <div className="md:w-[350px]">
          <CartSummary
            subtotal={currentCart.subtotal ?? 0}
            shipping={40}
            discount={10}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CartPageClient);
