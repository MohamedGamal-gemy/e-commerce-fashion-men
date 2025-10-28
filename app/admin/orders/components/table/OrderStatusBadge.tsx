"use client";

import { Badge } from "@/components/ui/badge";

export function OrderStatusBadge({ status }: { status: string }) {
  const colorClass =
    {
      paid: "bg-green-600/80 text-white",
      pending: "bg-yellow-500/80 text-black",
      shipped: "bg-blue-600/80 text-white",
      delivered: "bg-emerald-500/80 text-white",
      cancelled: "bg-red-600/80 text-white",
    }[status] || "bg-slate-600/80 text-white";

  return <Badge className={colorClass}>{status}</Badge>;
}
