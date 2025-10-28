// TopProductsList.jsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Product {
  _id: string; // يُفترض أن يكون هو الـ ID الخاص بالمنتج
  totalSold: number;
  totalRevenue: number;
  // قد تحتاج لجلب اسم المنتج لاحقًا باستخدام ID
}

interface TopProductsListProps {
  products: Product[];
}

// مكون وهمي لعرض اسم المنتج (يفترض أنك ستستبدله بالاسم الفعلي)
const getProductName = (id: string, index: number): string => {
  const names = [
    "Premium Laptop X1",
    "Smartphone Pro Max",
    "Wireless Earbuds Z",
    "Gaming Keyboard 500",
    "4K Monitor Slim",
  ];
  return names[index] || `Product ID: ${id.substring(id.length - 4)}`;
};

export function TopProductsList({ products }: TopProductsListProps) {
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <Card
      className="bg-gradient-to-br from-slate-900 to-slate-800 border
      border-slate-700 shadow-md hover:shadow-pink-400/10 transition-all h-full"
    >
      <CardHeader>
        <CardTitle className="text-slate-200 text-lg flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-pink-400" /> Top Selling Products
        </CardTitle>
      </CardHeader>

      <CardContent className="h-80 overflow-y-auto">
        {hasProducts ? (
          <ol className="space-y-4">
            {products.map((product, index) => (
              <li
                key={product._id}
                className="p-3 bg-slate-800/50 rounded-lg transition-all hover:bg-slate-700/60"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xl font-bold ${
                        index === 0
                          ? "text-yellow-400"
                          : index === 1
                          ? "text-slate-400"
                          : index === 2
                          ? "text-amber-600"
                          : "text-slate-500"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <p className="font-medium text-slate-100 truncate max-w-[150px]">
                      {getProductName(product._id, index)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-sky-400">
                      {product.totalSold} Units
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">
                      EGP {product.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-slate-500 mt-20">
            No top products data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
