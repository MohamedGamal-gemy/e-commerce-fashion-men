"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RevenueAreaChartProps {
  data: { _id: string; totalRevenue: number }[];
}

export function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  // ✅ تجهيز البيانات القادمة من الـ backend
  const chartData =
    data && data.length > 0
      ? data.map((item) => ({
          month: item._id,
          revenue: item.totalRevenue,
        }))
      : [
          { month: "January", revenue: 0 },
          { month: "February", revenue: 0 },
          { month: "March", revenue: 0 },
          { month: "April", revenue: 0 },
          { month: "May", revenue: 0 },
          { month: "June", revenue: 0 },
        ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-lg hover:shadow-emerald-500/10 transition-all">
      <CardHeader>
        <CardTitle className="text-slate-100 text-lg">Revenue Overview</CardTitle>
        <CardDescription className="text-slate-400">
          Showing total revenue for the last 6 months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="#334155" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="#94a3b8"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              strokeWidth={2}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm text-slate-400">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 leading-none font-medium text-slate-200">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2 text-slate-500 leading-none">
              Based on latest order data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
