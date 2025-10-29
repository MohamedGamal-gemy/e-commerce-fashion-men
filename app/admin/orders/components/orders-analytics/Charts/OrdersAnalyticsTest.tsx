"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopProductsList from "./TopProductsTable";
import DashboardSummary from "./DashboardSummary";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsData {
  summary: {
    totalOrders: number;
    pending: number;
    paid: number;
    cancelled: number;
    totalRevenue: number;
    avgOrderValue: number;
  };
  trend: { _id: string; totalRevenue: number }[];
  ordersTrend: {
    date: string;
    statuses: { status: string; count: number }[];
  }[];
  growthRate: number;
  topProducts: {
    _id: string;
    totalSold: number;
    totalRevenue: number;
    name: string;
    image: { url: string };
  }[];
  newUsers: number;
}

export default function OrdersAnalyticsTest({ data }: { data: AnalyticsData }) {

  return (
    <div className="space-y-8">
      <DashboardSummary summary={data.summary} />
      {/* Revenue Trend */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Revenue Trend
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trend}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="_id"
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalRevenue"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <TopProductsList products={data.topProducts} />
    </div>
  );
}
