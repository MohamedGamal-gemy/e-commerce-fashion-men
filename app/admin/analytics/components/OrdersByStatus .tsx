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
import { motion } from "framer-motion";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface OrderStatus {
  status: string;
  count: number;
}

interface OrdersTrendItem {
  date: string;
  statuses: OrderStatus[];
}

interface OrdersByStatusProps {
  ordersTrend?: OrdersTrendItem[];
}

// ✅ نوع آمن بدل any
type StatusData = {
  date: string;
  paid?: number;
  pending?: number;
  cancelled?: number;
  [key: string]: string | number | undefined;
};

const OrdersByStatus: React.FC<OrdersByStatusProps> = ({
  ordersTrend = [],
}) => {
  const normalized: StatusData[] = ordersTrend.map((d) => {
    const obj: StatusData = { date: formatDate(d.date) };

    (d.statuses || []).forEach((s) => {
      obj[s.status] = s.count;
    });

    // تأكد أن الثلاث حالات الأساسية موجودة
    obj.paid = obj.paid ?? 0;
    obj.pending = obj.pending ?? 0;
    obj.cancelled = obj.cancelled ?? 0;

    return obj;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 border border-slate-800 shadow-lg hover:shadow-cyan-900/10 transition-all duration-300 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base font-semibold tracking-wide">
            Orders by Status
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={normalized}
                margin={{ top: 10, right: 15, left: -5, bottom: 5 }}
                barSize={40}
              >
                <defs>
                  <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#064e3b" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#facc15" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#78350f" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="cancelledGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#450a0a" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  opacity={0.4}
                />

                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  contentStyle={{
                    backgroundColor: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(51,65,85,0.7)",
                    borderRadius: 8,
                    color: "#f1f5f9",
                    backdropFilter: "blur(8px)",
                  }}
                />

                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }} />

                <Bar
                  dataKey="paid"
                  stackId="a"
                  fill="url(#paidGradient)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />

                <Bar
                  dataKey="pending"
                  stackId="a"
                  fill="url(#pendingGradient)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />

                <Bar
                  dataKey="cancelled"
                  stackId="a"
                  fill="url(#cancelledGradient)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrdersByStatus;
