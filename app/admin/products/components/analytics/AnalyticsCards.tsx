"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, BarChart3, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsData {
  totalProducts: number;
  lowStockProducts: number;
  totalStock: number;
  averageRating: number;
}

export function AnalyticsCards() {
  const { data, isLoading, isError } = useQuery<AnalyticsData>({
    queryKey: ["products-analytics"],
    queryFn: async () => {
      const res = await fetch("http://localhost:9000/api/products/admin/analytics");
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return res.json();
    },
  });

  const cards = [
    {
      title: "Total Products",
      value: data?.totalProducts ?? 0,
      icon: <Package className="h-5 w-5 text-sky-400" />,
      bg: "from-sky-900 to-sky-500 border-sky-800/50",
    },
    {
      title: "Low Stock",
      value: data?.lowStockProducts ?? 0,
      icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
      bg: "from-red-900 to-rose-500 border-red-800/50",
    },
    {
      title: "Total Stock",
      value: data?.totalStock ?? 0,
      icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
      bg: "from-emerald-900 to-emerald-500 border-emerald-800/50",
    },
    {
      title: "Avg. Rating",
      value: data?.averageRating?.toFixed(1) ?? "0.0",
      icon: <Star className="h-5 w-5 text-yellow-400" />,
      bg: "from-violet-900 to-fuchsia-500 border-violet-800/30",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid bg- gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl bg-slate-800" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-400 bg-slate-900 border border-red-800 p-4 rounded-xl">
        Error loading analytics data
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-5">
      {cards.map((card, i) => (
        <Card
          key={i}
          className={`bg-gradient-to-br ${card.bg}
  border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-900/20`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
