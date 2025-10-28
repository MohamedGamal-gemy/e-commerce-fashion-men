"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export function SummaryCard({
  title,
  value,
  icon,
  color = "from-cyan-500 to-blue-600",
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="group"
    >
      <Card
        className={`relative overflow-hidden
           border border-slate-800 bg-gradient-to-br ${color} hover:${color}/20 transition-all`}
      >
        {/* Gradient glow border */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 
          group-hover:opacity-30 transition-opacity duration-500`}
        />

        <CardContent className="relative z-10 flex items-center gap-4 p-5">
          {/* Icon */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl 
              bg-gradient-to-br ${color} text-white shadow-lg`}
          >
            {icon}
          </div>

          {/* Text */}
          <div className="flex flex-col text-left">
            <h3 className="text-slate-200 text-sm">{title}</h3>
            <p className="text-2xl font-semibold text-slate-100 mt-1 tracking-tight">
              {value}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
