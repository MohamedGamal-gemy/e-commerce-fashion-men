import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, CartesianGrid, XAxis, Line } from "recharts";

export default function UserGrowthChart() {
  const data = [
    { month: "Jan", users: 50 },
    { month: "Feb", users: 75 },
    { month: "Mar", users: 100 },
    { month: "Apr", users: 130 },
    { month: "May", users: 180 },
  ];

  return (
    <Card className="bg-slate-900 border-slate-700 h-60">
      <CardHeader>
        <CardTitle className="text-slate-200">User Growth</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          className="h-40 w-full"
          config={{
            users: { label: "Users", color: "#3b82f6" },
          }}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
