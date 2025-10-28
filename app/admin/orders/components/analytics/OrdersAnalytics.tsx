// // "use client";

// // import { useState } from "react";
// // import axios from "axios";
// // import { useQuery } from "@tanstack/react-query";
// // import { ShoppingCart, CheckCircle, DollarSign } from "lucide-react";
// // import { AnalyticsHeader } from "./AnalyticsHeader";
// // import { AnalyticsCard } from "./AnalyticsCard";
// // import { RevenueAreaChart, RevenueLineChart } from "./RevenueLineChart";
// // import { OrdersBarChart } from "./OrdersBarChart";

// // export default function OrdersAnalytics() {
// //   const [range, setRange] = useState("month");

// //   const { data, isLoading } = useQuery({
// //     queryKey: ["orders-analytics", range],
// //     queryFn: async () => {
// //       const res = await axios.get(
// //         `http://localhost:9000/api/checkout/orders/analytics?range=${range}`
// //       );
// //       return res.data;
// //     },
// //   });

// //   if (isLoading)
// //     return (
// //       <div className="flex justify-center items-center h-80">
// //         <p className="text-slate-400 animate-pulse text-lg">
// //           Loading analytics...
// //         </p>
// //       </div>
// //     );

// //   const { totalOrders, paid, totalRevenue, revenueTrend } = data || {};
// //   const validData =
// //     Array.isArray(revenueTrend) &&
// //     revenueTrend.map((d) => ({
// //       _id: d._id || "N/A",
// //       totalRevenue: d.totalRevenue || 0,
// //     }));

// //   const sampleSparkline = [
// //     { value: 20 },
// //     { value: 60 },
// //     { value: 40 },
// //     { value: 100 },
// //     { value: 70 },
// //     { value: 90 },
// //   ];

// //   const cards = [
// //     {
// //       title: "Total Orders",
// //       value: totalOrders,
// //       icon: <ShoppingCart size={18} />,
// //       color: "from-sky-500/90 to-cyan-500/30",
// //       data: sampleSparkline,
// //     },
// //     {
// //       title: "Paid Orders",
// //       value: paid,
// //       icon: <CheckCircle size={18} />,
// //       color: "from-emerald-500/90 to-green-600/30",
// //       data: sampleSparkline,
// //     },
// //     {
// //       title: "Total Revenue",
// //       value: `EGP ${totalRevenue?.toLocaleString() || 0}`,
// //       icon: <DollarSign size={18} />,
// //       color: "from-orange-400/90 to-amber-500/30",
// //       data: sampleSparkline,
// //     },
// //   ];

// //   return (
// //     <div className="space-y-8">
// //       <AnalyticsHeader range={range} onChange={setRange} />
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {cards.map((card, i) => (
// //           <AnalyticsCard key={card.title} {...card} delay={i * 0.1} />
// //         ))}
// //       </div>
// //       {/* 📊 Charts Row */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* <RevenueLineChart data={data.revenueTrend || []} /> */}
// //         {/* <RevenueAreaChart data={data.revenueTrend || []} /> */}
// //         {/* <OrdersBarChart
// //           data={data.revenueTrend || []}
// //           totalOrders={data.totalOrders || 0}
// //         /> */}
// //       </div>

// //       {/* <RevenueLineChart data={validData} />
// //       <OrdersBarChart
// //         data={data?.revenueTrend || []}
// //         totalOrders={data?.totalOrders || 0}
// //       /> */}
// //     </div>
// //   );
// // }


"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react";

// 🎨 ألوان للرسوم البيانية
const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function OrdersAnalytics() {
  const [range, setRange] = useState("month");
  const [status, setStatus] = useState("all");

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

  const { summary, trend, growthRate, topProducts, newUsers } = data;

  // 🥧 Data للـ Pie chart
  const pieData = [
    { name: "Paid", value: summary.paid },
    { name: "Pending", value: summary.pending },
    { name: "Cancelled", value: summary.cancelled },
  ];

  return (
    <div className="container mx-auto py-10 space-y-10 text-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">📊 Orders Analytics</h1>

        <div className="flex gap-3">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[130px] bg-slate-900 border-slate-700 text-slate-300">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[130px] bg-slate-900 border-slate-700 text-slate-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Orders"
          value={summary.totalOrders}
          icon={<ShoppingBag className="text-blue-400" />}
        />
        <SummaryCard
          title="Total Revenue"
          value={`$${summary.totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="text-green-400" />}
        />
        <SummaryCard
          title="Growth Rate"
          value={`${growthRate}%`}
          icon={<TrendingUp className="text-emerald-400" />}
        />
        <SummaryCard
          title="New Users"
          value={newUsers}
          icon={<Users className="text-purple-400" />}
        />
      </div>

      {/* Revenue Trend */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              totalRevenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
            }}
            className="h-[300px]"
          >
            <AreaChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="_id" stroke="#94a3b8" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="totalRevenue"
                stroke="#10b981"
                fill="#10b98120"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Orders Breakdown Pie Chart */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Orders Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer
            config={{
              paid: { label: "Paid", color: "hsl(var(--chart-1))" },
              pending: { label: "Pending", color: "hsl(var(--chart-2))" },
              cancelled: { label: "Cancelled", color: "hsl(var(--chart-3))" },
            }}
            className="h-[300px]"
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Products Bar Chart */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              totalSold: { label: "Sold", color: "hsl(var(--chart-1))" },
            }}
            className="h-[300px]"
          >
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="_id" stroke="#94a3b8" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="totalSold" fill="#6366f1" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* User Growth (demo static line) */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">User Growth (Demo)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: { label: "Users", color: "hsl(var(--chart-2))" },
            }}
            className="h-[300px]"
          >
            <LineChart
              data={[
                { month: "Jan", users: 50 },
                { month: "Feb", users: 75 },
                { month: "Mar", users: 100 },
                { month: "Apr", users: 130 },
                { month: "May", users: 180 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: JSX.Element;
}) {
  return (
    <Card className="bg-slate-900 border-slate-700 hover:border-slate-500 transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}




