"use client";

import { useState, useCallback } from "react";
import { Cart } from "@/types/cart";
import CartItem from "./CartItem";
import CartSkeleton from "./CartSkeleton";
import CartEmpty from "./CartEmpty";
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from "@/app/cart/store/cart";

interface CartListProps {
    initialCart: Cart;
    page: number;
    onPageChange: (newPage: number) => void;
}

const CartList = ({ initialCart }: CartListProps) => {
    const sessionId = initialCart.sessionId;

    const { data = initialCart, isLoading, error } = useCart(sessionId, initialCart);

    const { updateQuantity, isUpdating } = useUpdateCartQuantity(sessionId);
    const { removeFromCart, isRemoving } = useRemoveFromCart(sessionId);

    const [isPending, setIsPending] = useState<number | null>(null);

    const handleQuantityChange = useCallback(
        (variantId: string, size: string, newQuantity: number) => {
            if (!sessionId) return;
            updateQuantity({ sessionId, variantId, size, quantity: newQuantity });
        },
        [sessionId, updateQuantity]
    );

    const handleDelete = useCallback(
        ({ variantId, size }: { variantId: string; size: string }) => {
            if (!sessionId) return;
            removeFromCart({ sessionId, variantId, size });
        },
        [sessionId, removeFromCart]
    );

    if (isLoading && !data) return <CartSkeleton />;
    if (error) return <CartEmpty />;
    if (!data || data.totalItems === 0 || !data.items?.length) return <CartEmpty />;

    return (
        <div className="lg:col-span-2 space-y-4">
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
    );
};

export default CartList;
