"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface OrdersBarChartProps {
  data: {
    _id: string;
    totalRevenue: number;
    totalOrders?: number;
  }[];
  totalOrders: number;
}

export function OrdersBarChart({ data, totalOrders }: OrdersBarChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  // لو مفيش عدد طلبات في كل يوم، نوزع الإجمالي عشوائيًا (مؤقتًا) للتجريب
  const chartData = data.map((d) => ({
    ...d,
    totalOrders:
      d.totalOrders ??
      Math.floor(totalOrders / data.length + Math.random() * 5),
  }));

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border
     border-slate-700 shadow-md hover:shadow-sky-400/10 transition-all">
      <CardHeader>
        <CardTitle className="text-slate-200 text-lg flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-sky-400" /> Orders vs Revenue
        </CardTitle>
      </CardHeader>

      <CardContent className="h-60">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="_id" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
              />
              <Legend
                wrapperStyle={{ color: "#cbd5e1", fontSize: 13 }}
                iconSize={10}
              />
              <Bar
                dataKey="totalOrders"
                fill="#38bdf8"
                name="Orders"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="totalRevenue"
                fill="#10b981"
                name="Revenue (EGP)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-slate-500 mt-20">
            No bar chart data available for this range.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

