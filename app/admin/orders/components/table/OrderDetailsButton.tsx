"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { Order } from "@/types/orders.types";

interface OrderDetailsButtonProps {
  order: Partial<Order>; // ✅ Accept partial orders
}

export function OrderDetailsButton({ order }: OrderDetailsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="bg-slate-700 hover:bg-slate-600 text-white"
        onClick={() => setOpen(true)}
      >
        View Details
      </Button>

      <OrderDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        order={order} // لو OrderDetailsModal محتاج Order كامل, خليها Partial<Order> | null
      />
    </>
  );
}
