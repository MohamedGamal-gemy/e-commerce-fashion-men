"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminOrders } from "./hooks/useAdminOrders";
// import OrdersAnalytics from "./components/analytics/OrdersAnalytics";
import OrdersFilters from "./components/OrdersFilters";
import {
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import OrdersPagination from "./components/OrdersPagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableHeaderForOrders from "./components/table/table-header-for-orders";
import TableBodyForOrders from "./components/table/table-body-for-orders";
import OrdersAnalytics from "./components/orders-analytics/OrdersAnalytics";

export default function AdminOrdersPage() {
  const { data, isLoading, isError, updateStatus } = useAdminOrders();

  if (isLoading)
    return (
      <p className="text-slate-400 text-center mt-10">Loading orders...</p>
    );

  if (isError)
    return (
      <p className="text-red-400 text-center mt-10">Failed to load orders 😢</p>
    );

  return (
    <div className="container mx-auto py-12 space-y-10">
      <h1 className="text-2xl font-bold text-white mb-4 text-center">
        Orders Dashboard
      </h1>

      <div className="space-y-8">
        {/* <OrdersAnalytics /> */}
      </div>

      {/* 🎛️ Filters Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-slate-900/70 border border-slate-700 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-200 text-lg flex items-center gap-2">
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersFilters />
          </CardContent>
        </Card>
      </motion.div> */}

      {/* 📋 Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Table className="border border-slate-800 bg-slate-900/60 rounded-xl overflow-hidden">
          <TableCaption className="text-slate-500">
            Manage and track customer orders
          </TableCaption>
          <TableHeaderForOrders />
          <TableBody>
            {data.orders.map((order: any) => (
              <TableBodyForOrders
                order={order}
                updateStatus={updateStatus}
                key={order._id}
              />
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <OrdersPagination totalPages={data.totalPages} />
    </div>
  );
}
