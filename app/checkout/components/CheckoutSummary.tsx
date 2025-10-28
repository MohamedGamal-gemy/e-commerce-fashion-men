"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, CreditCard } from "lucide-react";
import Image from "next/image";

type CheckoutSummaryProps = {
  items: {
    productId: {
      _id: string;
      title: string;
      price: number;
    };
    quantity: number;
    size?: string;
    variantId?: {
      color?: { name: string; value: string };
      images?: { url: string }[];
    };
    isAvailable?: boolean;
    price: number;
  }[];
};

export default function CheckoutSummary({ items }: CheckoutSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <motion.div
      className="sticky top-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 bg-slate-900 border-slate-800 space-y-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-sky-400" />
          <h2 className="text-lg font-semibold">Order Summary</h2>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-slate-400 text-sm">Your cart is empty.</p>
          ) : (
            items.map((item, index) => {
              const imageUrl =
                item.variantId?.images?.[0]?.url ||
                "https://placehold.co/100x100?text=No+Image";

              return (
                <div
                  key={index}
                  className="flex justify-between items-center gap-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={imageUrl}
                      alt={item.productId.title}
                      width={48}
                      height={48}
                      className="rounded-md object-cover border border-slate-700"
                    />
                    <div>
                      <p className="font-medium text-white">
                        {item.productId.title}
                      </p>
                      <p className="text-slate-400">
                        {item.quantity} × {item.price} EGP
                      </p>
                      {item.size && (
                        <p className="text-xs text-slate-500">
                          Size: {item.size}
                        </p>
                      )}
                      {item.variantId?.color && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">
                            {item.variantId.color.name}
                          </span>
                          <span
                            className="w-3 h-3 rounded-full border border-slate-700"
                            style={{
                              backgroundColor: item.variantId.color.value,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold text-white">
                    {item.price * item.quantity} EGP
                  </p>
                </div>
              );
            })
          )}
        </div>

        <Separator className="bg-slate-800" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Subtotal</span>
            <span>{subtotal} EGP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <Truck className="h-4 w-4" /> Shipping
            </span>
            <span>{shipping === 0 ? "Free" : `${shipping} EGP`}</span>
          </div>
        </div>

        <Separator className="bg-slate-800" />

        <div className="flex justify-between items-center">
          <span className="font-semibold flex items-center gap-1">
            <CreditCard className="h-4 w-4 text-sky-400" /> Total
          </span>
          <span className="text-xl font-bold text-sky-400">{total} EGP</span>
        </div>
      </Card>
    </motion.div>
  );
}
