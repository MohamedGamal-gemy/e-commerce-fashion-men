import { Suspense } from "react";
import AdminOrdersClient from "./AdminOrdersClient";
// import AdminOrdersClient from "./AdminOrdersClient";

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<p className="text-slate-400 text-center mt-10">Loading orders...</p>}>
      <AdminOrdersClient />
    </Suspense>
  );
}
