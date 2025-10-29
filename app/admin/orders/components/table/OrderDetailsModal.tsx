"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/orders.types";

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: Partial<Order> | null; // ✅ بدل Order كامل
}

export function OrderDetailsModal({ open, onClose, order }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 text-slate-200">
        <ScrollArea className="min-h-96 pr-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Order #{order._id?.slice(-6).toUpperCase() || "------"}
            </DialogTitle>
          </DialogHeader>

          {/* Basic Order Info */}
          <div className="space-y-3 mt-2">
            <div className="flex justify-between items-center">
              <p>
                <span className="text-slate-400">Customer:</span>{" "}
                {order.billingDetails?.fullName || "Guest"}
              </p>
              <Badge className="capitalize">{order.status ?? "Unknown"}</Badge>
            </div>
            <p>
              <span className="text-slate-400">Date:</span>{" "}
              {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
            </p>
            <p>
              <span className="text-slate-400">Total:</span>{" "}
              <span className="text-white font-semibold">
                EGP {order.total ?? "-"}
              </span>
            </p>
          </div>

          <Separator className="bg-slate-700/60 my-3" />

          {/* Order Items */}
          <ScrollArea className="h-52 pr-2">
            <div className="space-y-3 mt-2">
              {order.items?.map((item) => (
                <div
                  key={item._id ?? Math.random()}
                  className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl hover:bg-slate-800/80 transition"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                    <Image
                      src={item.variantId?.images?.[0]?.url || "/placeholder.png"}
                      alt={item.productId?.title || "Product"}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">
                      {item.productId?.title || "Unknown"}
                    </h4>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>
                        Size: <span className="text-slate-200">{item.size || "-"}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        Color:{" "}
                        <span
                          className="inline-block w-3.5 h-3.5 rounded-full border border-slate-700"
                          style={{ backgroundColor: item.variantId?.color?.value || "transparent" }}
                        ></span>
                        <span className="text-slate-200">
                          {item.variantId?.color?.name || "-"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-slate-200 font-semibold text-sm">
                      EGP {item.price ?? "-"}
                    </p>
                    <p className="text-slate-400 text-xs">Qty: {item.quantity ?? "-"}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator className="bg-slate-700/60 my-4" />

          {/* Billing Details */}
          {order.billingDetails && (
            <div className="space-y-2 text-sm">
              <h3 className="text-white font-semibold text-lg">Billing Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <p>
                  <span className="text-slate-400">Full Name:</span>{" "}
                  {order.billingDetails.fullName ?? "-"}
                </p>
                <p>
                  <span className="text-slate-400">Email:</span>{" "}
                  {order.billingDetails.email ?? "-"}
                </p>
                <p>
                  <span className="text-slate-400">Phone:</span>{" "}
                  {order.billingDetails.phone ?? "-"}
                </p>
                <p>
                  <span className="text-slate-400">City:</span>{" "}
                  {order.billingDetails.city ?? "-"}
                </p>
                <p className="col-span-2">
                  <span className="text-slate-400">Address:</span>{" "}
                  {order.billingDetails.address ?? "-"}
                </p>
                <p>
                  <span className="text-slate-400">Postal Code:</span>{" "}
                  {order.billingDetails.postalCode ?? "-"}
                </p>
                <p>
                  <span className="text-slate-400">Country:</span>{" "}
                  {order.billingDetails.country ?? "-"}
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
