// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// // import {
// //   ChartContainer,
// //   ChartTooltip,
// //   ChartTooltipContent,
// // } from "@/components/ui/chart";
// // import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AreaChart } from "lucide-react";
// import {
//   Area,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// // export default function RevenueChart({ data }: { data: any[] }) {
// //   return (
// //     <Card className="bg-slate-900 border-slate-700 h-60">
// //       <CardHeader>
// //         <CardTitle>Revenue Trend</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <ChartContainer
// //           config={{
// //             totalRevenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
// //           }}
// //           className="h-40 w-full"
// //         >
// //           <AreaChart data={data}>
// //             <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
// //             <XAxis dataKey="_id" stroke="#94a3b8" fontSize={12} />
// //             <ChartTooltip content={<ChartTooltipContent />} />
// //             <Area
// //               type="monotone"
// //               dataKey="totalRevenue"
// //               stroke="#10b981"
// //               fill="#10b98120"
// //             />
// //           </AreaChart>
// //         </ChartContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// const RevenueChart = ({ data }) => {
//   return (
//     <div>
//       <Card className="bg-slate-900 border-slate-800">
//         <CardHeader>
//           <CardTitle className="text-slate-100">Revenue Trend</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={data.trend}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//               <XAxis dataKey="_id" stroke="#94a3b8" />
//               <YAxis stroke="#94a3b8" />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="totalRevenue"
//                 stroke="#38bdf8"
//                 fill="#0ea5e9"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RevenueChart;




// "use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const RevenueChart = ({ data }) => {
  return (
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
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
  );
};

export default RevenueChart;
