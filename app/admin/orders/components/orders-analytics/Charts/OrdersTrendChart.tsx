// "use client"

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card"

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"

// export default function OrdersTrendChart({ data }: { data: any[] }) {
//   // تحويل البيانات إلى الشكل المطلوب
//   const formattedData = data.map((item) => {
//     const base: any = { date: item.date }
//     item.statuses.forEach((s: any) => {
//       base[s.status] = s.count
//     })
//     return base
//   })

//   return (
//     <Card className="bg-slate-900 text-slate-100 border-slate-700">
//       <CardHeader>
//         <CardTitle>Orders by Status</CardTitle>
//         <CardDescription>Orders trend breakdown by status</CardDescription>
//       </CardHeader>

//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={formattedData}>
//             <XAxis dataKey="date" stroke="#CBD5E1" />
//             <YAxis stroke="#CBD5E1" />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="pending" stackId="a" fill="#facc15" />
//             <Bar dataKey="paid" stackId="a" fill="#4ade80" />
//             <Bar dataKey="cancelled" stackId="a" fill="#f87171" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// تحويل بيانات ordersTrend للداتا المناسبة
function transformOrdersTrend(data) {
  return data.map(({ date, statuses }) => {
    const obj = { date }
    statuses.forEach(({ status, count }) => {
      obj[status] = count
    })
    return obj
  })
}

const chartConfig = {
  pending: {
    label: "Pending",
    color: "var(--chart-1)", // عدل حسب الألوان اللي تناسبك
  },
  paid: {
    label: "Paid",
    color: "var(--chart-2)",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--chart-3)",
  },
}

export default function OrdersTrendChart({ data }) {
  const chartData = transformOrdersTrend(data)

  return (
    <Card className="bg-slate-900 border border-slate-700 text-slate-100 h-[32rem]">
      <CardHeader>
        <CardTitle>Orders Trend</CardTitle>
        <CardDescription>Orders status over time</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5)} // يعرض فقط MM-DD
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
  )
}
