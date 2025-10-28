"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SummaryCard from "./SummaryCard";
import RevenueChart from "./Charts/RevenueChart";
import OrdersPieChart from "./Charts/OrdersPieChart";
// import TopProductsChart fro./Charts/TopProductsTableart";
import UserGrowthChart from "./Charts/UserGrowthChart";
import { ShoppingBag, DollarSign, TrendingUp, Users } from "lucide-react";
import TopProductsTable from "./Charts/TopProductsTable";
import OrdersTrendChart from "./Charts/OrdersTrendChart";
import OrdersAnalyticsTest from "./Charts/OrdersAnalyticsTest";

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

  const { summary, trend, growthRate, topProducts, newUsers, ordersTrend } =
    data;

  return (
    <OrdersAnalyticsTest data={data}/>
  );
}
    // <div className="container mx-auto py-8 space-y-8 text-slate-100">
    //   {/* Header */}
    //   <div className="flex justify-between items-center">
    //     <h1 className="text-2xl font-bold text-white">📊 Orders Analytics</h1>

    //     <div className="flex gap-3">
    //       <Select value={range} onValueChange={setRange}>
    //         <SelectTrigger className="w-[130px] bg-slate-900 border-slate-700 text-slate-300">
    //           <SelectValue placeholder="Range" />
    //         </SelectTrigger>
    //         <SelectContent className="bg-slate-800 border-slate-700">
    //           <SelectItem value="day">Today</SelectItem>
    //           <SelectItem value="week">This Week</SelectItem>
    //           <SelectItem value="month">This Month</SelectItem>
    //           <SelectItem value="year">This Year</SelectItem>
    //         </SelectContent>
    //       </Select>

    //       <Select value={status} onValueChange={setStatus}>
    //         <SelectTrigger className="w-[130px] bg-slate-900 border-slate-700 text-slate-300">
    //           <SelectValue placeholder="Status" />
    //         </SelectTrigger>
    //         <SelectContent className="bg-slate-800 border-slate-700">
    //           <SelectItem value="all">All</SelectItem>
    //           <SelectItem value="pending">Pending</SelectItem>
    //           <SelectItem value="paid">Paid</SelectItem>
    //           <SelectItem value="cancelled">Cancelled</SelectItem>
    //         </SelectContent>
    //       </Select>
    //     </div>
    //   </div>

    //   {/* Summary Cards */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    //     <SummaryCard
    //       title="Total Orders"
    //       value={summary.totalOrders}
    //       icon={<ShoppingBag className="text-blue-400" />}
    //     />
    //     <SummaryCard
    //       title="Total Revenue"
    //       value={`$${summary.totalRevenue.toFixed(2)}`}
    //       icon={<DollarSign className="text-green-400" />}
    //     />
    //     <SummaryCard
    //       title="Growth Rate"
    //       value={`${growthRate}%`}
    //       icon={<TrendingUp className="text-emerald-400" />}
    //     />
    //     <SummaryCard
    //       title="New Users"
    //       value={newUsers}
    //       icon={<Users className="text-purple-400" />}
    //     />
    //   </div>

    //   {/* Charts Grid */}
    //   {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //     <div className="flex flex-col gap-6">
    //       <RevenueChart data={trend} />
    //       <UserGrowthChart />
    //     </div>

    //     <div className="col-span-1">
    //       <OrdersTrendChart data={ordersTrend} />
    //     </div>

    //     <div className="col-span-1">
    //       <TopProductsTable data={topProducts} />
    //     </div>
    //   </div> */}
    // </div>
