"use client";

import { motion } from "framer-motion";
import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { useAdminOrders } from "./hooks/useAdminOrders";
import OrdersPagination from "./components/OrdersPagination";
import TableHeaderForOrders from "./components/table/table-header-for-orders";
import TableBodyForOrders from "./components/table/table-body-for-orders";
import { Order } from "@/types/orders.types";

export default function AdminOrdersClient() {
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

      <div className="space-y-8">{/* <OrdersAnalytics /> */}</div>

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
          {data && (
            <>
              <TableBody>
                {data.orders.map((order: Order) => (
                  <TableBodyForOrders
                    key={order._id}
                    order={order}
                    updateStatus={updateStatus}
                  />
                ))}
              </TableBody>

              <OrdersPagination totalPages={data.totalPages} />
            </>
          )}
        </Table>
      </motion.div>

    </div>
  );
}


