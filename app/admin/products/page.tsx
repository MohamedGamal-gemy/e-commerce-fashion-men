import { Suspense } from "react";
import AdminProductsClient from "./AdminProductsClient";
// import AdminProductsClient from "./AdminProductsClient";

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<p className="text-center text-slate-400 mt-20">Loading...</p>}>
      <AdminProductsClient />
    </Suspense>
  );
}
