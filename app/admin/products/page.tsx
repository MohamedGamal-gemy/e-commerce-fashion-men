"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductsTable } from "./components/ProductsTable";
import { useQueryState } from "nuqs";
import OrdersPagination from "../orders/components/OrdersPagination";
import { AnalyticsCards } from "./components/analytics/AnalyticsCards";

async function getProducts({ page = 1, limit = 10, subcategory = "" }) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(subcategory ? { subcategory } : {}),
  });

  const res = await fetch(`http://localhost:9000/api/products/admin?${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function AdminProductsPage() {
  // 🔹 الحالة عبر الـ URL بدلاً من useState
  const [subcategory, setSubcategory] = useQueryState("subcategory", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (v) => parseInt(v),
    serialize: (v) => v.toString(),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products", page, subcategory],
    queryFn: () => getProducts({ page, limit: 10, subcategory }),
    keepPreviousData: true,
  });

  if (isLoading)
    return <p className="text-center text-slate-400 mt-20">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-400 mt-20">
        Failed to load products ❌
      </p>
    );

  const products = data?.products || [];
  const pages = data?.pages || 1;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold text-white mb-8 text-center">
        Products Dashboard
      </h1>
      <AnalyticsCards />

      {/* 🔹 فلترة بالـ subcategory */}
      {/* <div className="flex justify-end mb-4">
        <select
          value={subcategory || ""}
          onChange={(e) => {
            setPage(1); // نرجع لأول صفحة لما نغير الفلتر
            setSubcategory(e.target.value || null);
          }}
          className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
        >
          <option value="">All Subcategories</option>
          <option value="sweetshirt">Sweetshirt</option>
          <option value="tshirt">T-shirt</option>
          <option value="hoodie">Hoodie</option>
        </select>
      </div> */}

      <div
        className="bg-slate-95
      bg-gradient-to-br from-slate-950 to-slate-800
      border border-slate-800/80 shadow-lg shadow-slate-900/50 rounded-2xl overflow-hidden"
      >
        {/* <CardHeader>
          <CardTitle className="text-slate-100 text-lg">All Products</CardTitle>
        </CardHeader>
        <CardContent> */}
        <ProductsTable products={products} />
        {/* </CardContent> */}
        {/* </Card> */}
      </div>
      {/* 🔹 Pagination Controls */}
      {pages > 1 && <OrdersPagination totalPages={pages} />}
    </div>
  );
}
