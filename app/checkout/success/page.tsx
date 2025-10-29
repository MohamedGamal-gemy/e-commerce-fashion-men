import { Suspense } from "react";
import CheckoutSuccessClient from "./components/CheckoutSuccessClient";

export const dynamic = "force-dynamic";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-slate-200">Loading...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
