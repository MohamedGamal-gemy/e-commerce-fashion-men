"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductsTable } from "./components/ProductsTable";
import { useQueryState } from "nuqs";
import OrdersPagination from "../orders/components/OrdersPagination";
import { AnalyticsCards } from "./components/analytics/AnalyticsCards";
import { ProductsAdminResponse } from "@/types/productsAdmin";

async function getProducts({
  page = 1,
  limit = 10,
  subcategory = "",
}): Promise<ProductsAdminResponse> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(subcategory ? { subcategory } : {}),
  });

  const res = await fetch(`http://localhost:9000/api/products/admin?${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function AdminProductsClient() {
  const [subcategory] = useQueryState("subcategory", { defaultValue: "" });
  const [page] = useQueryState("page", {
    defaultValue: 1,
    parse: (v) => parseInt(v),
    serialize: (v) => v.toString(),
  });

  const { data, isLoading, error } = useQuery<ProductsAdminResponse, Error>({
    queryKey: ["admin-products", page, subcategory],
    queryFn: () => getProducts({ page, limit: 10, subcategory }),
    staleTime: 1000 * 60,
  });
  if (isLoading)
    return <p className="text-center text-slate-400 mt-20">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-400 mt-20">Failed to load products</p>
    );

  const products = data?.products || [];
  const pages = data?.pages || 1;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold text-white mb-8 text-center">
        Products Dashboard
      </h1>
      <AnalyticsCards />

      <div
        className="bg-slate-95
      bg-gradient-to-br from-slate-950 to-slate-800
      border border-slate-800/80 shadow-lg shadow-slate-900/50 rounded-2xl overflow-hidden"
      >
        <ProductsTable products={products} />
      </div>
      {pages > 1 && <OrdersPagination totalPages={pages} />}
    </div>
  );
}


