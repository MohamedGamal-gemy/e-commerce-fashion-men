import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { AnalyticsData } from "@/types/analytics.types";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function OrdersPieChart({
  summary,
}: {
  summary: AnalyticsData["summary"];
}) {
  const pieData = [
    { name: "Paid", value: summary.paid },
    { name: "Pending", value: summary.pending },
    { name: "Cancelled", value: summary.cancelled },
  ];

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle>Orders Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer
          className="h-[280px]"
          config={{
            paid: { label: "Paid", color: "#10b981" },
            pending: { label: "Pending", color: "#f59e0b" },
            cancelled: { label: "Cancelled", color: "#ef4444" },
          }}
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
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
