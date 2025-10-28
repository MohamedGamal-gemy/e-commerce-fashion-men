"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OrderDetailsModal } from "./OrderDetailsModal";

export function OrderDetailsButton({ order }: { order: any }) {
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
        order={order}
      />
    </>
  );
}
