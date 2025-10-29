"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

// ✅ نوع واحد يمثل كل حالة
type OrderStatusCount = {
  status: "pending" | "paid" | "cancelled";
  count: number;
};

// ✅ نوع يمثل كل يوم (المدخل الأصلي)
type OrdersTrendInput = {
  date: string;
  statuses: OrderStatusCount[];
};

// ✅ نوع البيانات بعد التحويل (للرسم)
type OrdersTrendChartData = {
  date: string;
  pending?: number;
  paid?: number;
  cancelled?: number;
};

function transformOrdersTrend(data: OrdersTrendInput[]): OrdersTrendChartData[] {
  return data.map(({ date, statuses }) => {
    const obj: OrdersTrendChartData = { date };
    statuses.forEach(({ status, count }) => {
      obj[status] = count;
    });
    return obj;
  });
}

const chartConfig: ChartConfig = {
  pending: {
    label: "Pending",
    color: "var(--chart-1)",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-2)",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--chart-3)",
  },
};

export default function OrdersTrendChart({ data }: { data: OrdersTrendInput[] }) {
  const chartData = transformOrdersTrend(data);

  return (
    <Card className="bg-slate-900 border border-slate-700 text-slate-100 h-[32rem]">
      <CardHeader>
        <CardTitle>Orders Trend</CardTitle>
        <CardDescription>Orders status over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(5)} // يعرض فقط MM-DD
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="pending"
              stackId="a"
              fill="var(--color-pending)"
              radius={[0, 0, 4, 4]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="paid"
              stackId="a"
              fill="var(--color-paid)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="cancelled"
              stackId="a"
              fill="var(--color-cancelled)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending analysis <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Orders status trend over selected period
        </div>
      </CardFooter>
    </Card>
  );
}
