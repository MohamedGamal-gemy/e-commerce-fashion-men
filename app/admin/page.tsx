
"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardSummary from "./orders/components/orders-analytics/Charts/DashboardSummary";
import OrdersByStatus from "./analytics/components/OrdersByStatus ";
import RevenueTrend from "./analytics/components/RevenueTrend";
import TopProductsList from "./analytics/components/TopProductsList";

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders-analytics"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:9000/api/checkout/orders/analytics"
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
      <div className="text-center text-rose-500 mt-10">
        Failed to load analytics.
      </div>
    );
  if (!data) return null;

  return (
    <div className="space-y-8">
      <DashboardSummary summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <RevenueTrend trend={data.trend} />
          </motion.div>

          <OrdersByStatus ordersTrend={data.ordersTrend} />
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <TopProductsList products={data.topProducts} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <Card className="bg-slate-900/60 border border-slate-800 shadow">
              <CardHeader>
                <CardTitle className="text-slate-100">New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-50">
                  {data.newUsers}
                </div>
                <div className="text-slate-400 text-sm mt-1">
                  New users this period
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
