"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { motion } from "framer-motion";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  data: { value: number }[];
  delay?: number;
}

export function AnalyticsCard({
  title,
  value,
  icon,
  color,
  data,
  delay = 0,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div
        className={`relative bg-gradient-to-br  from-slate-900 to-slate-800  {color} p-[1px] rounded-2xl shadow-lg hover:shadow-emerald-400/10 transition-all`}
      >
        <Card className="bg-slate-90 rounded-2xl border-none">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <span className="text-emerald-400">{icon}</span>
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent 
                from-white to-slate-300 mb-2"
            >
              {value}
            </p>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
