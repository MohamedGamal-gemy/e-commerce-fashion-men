"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { AnalyticsData } from "../../../types";

export default function TopProductsList({
  products,
}: {
  products: AnalyticsData["topProducts"];
}) {
  return (
    <Card className="bg-slate-900 border border-slate-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Top Selling Products
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {products.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 bg-gradient-to-br from-slate-800/60 to-slate-800/30 p-4 rounded-xl border border-slate-700/60 hover:border-slate-500/60 transition-all"
            >
              {/* Product Image */}
              <div className="relative h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={p.image.url}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-100 truncate">{p.name}</p>
                <p className="text-slate-400 text-sm mt-1">
                  Sold:{" "}
                  <span className="text-slate-200 font-semibold">
                    {p.totalSold}
                  </span>{" "}
                  |{" "}
                  <span className="text-emerald-400 font-semibold">
                    ${p.totalRevenue.toLocaleString()}
                  </span>
                </p>
              </div>

              {/* Rank badge */}
              <div className="text-slate-400 text-xs font-semibold bg-slate-800 px-2 py-1 rounded-md">
                #{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
