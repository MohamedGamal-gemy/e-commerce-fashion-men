"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import TopProductsList from "./TopProductsTable";
import { SummaryCard } from "../SummaryCard";
import DashboardSummary from "./DashboardSummary";
import { RevenueAreaChart } from "../../analytics/RevenueLineChart";
import RevenueChart from "./RevenueChart";
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
  // Format data for stacked bar chart
  const formattedOrdersTrend = data.ordersTrend.map((day) => ({
    date: day.date,
    paid: day.statuses.find((s) => s.status === "paid")?.count || 0,
    pending: day.statuses.find((s) => s.status === "pending")?.count || 0,
    cancelled: day.statuses.find((s) => s.status === "cancelled")?.count || 0,
  }));

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <SummaryCard title="Total Orders" value={data.summary.totalOrders} />
        <SummaryCard title="Paid" value={data.summary.paid} />
        <SummaryCard title="Pending" value={data.summary.pending} />
        <SummaryCard
          title="Revenue"
          value={`$${data.summary.totalRevenue.toLocaleString()}`}
        />
        <SummaryCard
          title="Avg. Order Value"
          value={`$${data.summary.avgOrderValue.toFixed(2)}`}
        />
        <SummaryCard title="New Users" value={data.newUsers} />
      </div> */}
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

      {/* <RevenueChart  data={data}/> */}
      {/* Orders Trend */}
      {/* <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Orders by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedOrdersTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="paid" stackId="a" fill="#22c55e" />
              <Bar dataKey="pending" stackId="a" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      {/* <Card className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl hover:shadow-sky-900/10 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-slate-100 flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            Orders by Status
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
                cursor={{ fill: "rgba(30,41,59,0.3)" }}
              />
              <Legend
                wrapperStyle={{
                  color: "#94a3b8",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="paid"
                stackId="a"
                fill="#22c55e"
                radius={[6, 6, 0, 0]}
                name="Paid"
              />
              <Bar
                dataKey="pending"
                stackId="a"
                fill="#facc15"
                radius={[6, 6, 0, 0]}
                name="Pending"
              />
              <Bar
                dataKey="cancelled"
                stackId="a"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
                name="Cancelled"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      {/* Top Products */}
      <TopProductsList products={data.topProducts} />
    </div>
  );
}
