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

const CartPageClient = ({ cart, sessionId }) => {
  const { removeFromCart, isRemoving } = useRemoveFromCart(sessionId);
  const { updateQuantity, isUpdating } = useUpdateCartQuantity(sessionId);
  const { data, isLoading } = useCart(sessionId, cart);

  const [isPending, setIsPending] = useState(null);

  const handleQuantityChange = (variantId, size, newQuantity) => {
    if (newQuantity <= 0) return;

    updateQuantity({
      sessionId,
      variantId: variantId._id,
      size,
      quantity: newQuantity,
    });
  };

  const handleDelete = ({ variantId, size }) => {
    removeFromCart(
      { sessionId, variantId: variantId._id, size },
      {
        onSuccess: () => toast.success("Item removed successfully ✅"),
      }
    );
  };

  if (isLoading)
    return (
      <div className="text-gray-300 py-20 text-center">
        Loading your cart...
      </div>
    );

  return (
    <div className="w-full">
      {/* 🧩 Header */}

      {data?.items?.length ? (
        <>
          <CartHeader itemsCount={data?.items?.length || 0} />
          <div className="flex flex-col md:flex-row gap-8 justify-between  text-gray-100 px-6 py-8 min-h-screen">
            {/* 🛒 Cart Items */}
            <div className="space-y-6 w-full md:w-[750px]">
              {data.items.map((item, i) => (
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
                subtotal={data?.subtotal}
                shipping={40}
                discount={10}
                // items={data?.items}
                // sessionId={sessionId}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto -mt-10 pb-6">
          <CartEmpty />
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default memo(CartPageClient);
