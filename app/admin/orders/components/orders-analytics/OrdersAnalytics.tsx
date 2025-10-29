"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrdersAnalyticsTest from "./Charts/OrdersAnalyticsTest";

export default function OrdersAnalytics() {
  const [range ] = useState("month");
  const [status] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders-analytics", range, status],
    queryFn: async () => {
      const statusParam = status === "all" ? "" : `&status=${status}`;
      const res = await fetch(
        `http://localhost:9000/api/checkout/orders/analytics?range=${range}${statusParam}`
      );
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="text-center text-slate-400 mt-10">
        Loading analytics...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load analytics.
      </div>
    );


  return (
    <OrdersAnalyticsTest data={data}/>
  );
}
