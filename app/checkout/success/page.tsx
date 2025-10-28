"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccess() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  // const orderId = params.get("session_id");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

useEffect(() => {
  const confirmOrder = async () => {
    try {
      if (!orderId) return;

      const res = await fetch("http://localhost:9000/api/checkout/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to confirm order: ${res.status}`);
      }

      setStatus("success");
    } catch (err) {
      console.error(" Confirm order error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  confirmOrder();
}, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-200">
        <Loader2 className="animate-spin mr-2" />
        Processing your payment...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-red-400">
        <p className="text-2xl font-semibold mb-2">Payment Failed!</p>
        <p className="mb-4">Something went wrong verifying your order.</p>
        <Link href="/" className="text-sky-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center text-slate-100">
      <CheckCircle className="text-green-400 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="mb-6 text-slate-400">
        Thank you for your order. Your order ID is{" "}
        <span className="font-mono text-sky-400">{orderId}</span>
      </p>
      <Link
        href="/"
        className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
