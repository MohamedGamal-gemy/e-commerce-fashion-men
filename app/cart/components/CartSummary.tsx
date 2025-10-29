import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CartSummary({
  subtotal = 0,
  shipping = 0,
  discount = 0,
}: 
{
  subtotal: number;
  shipping?: number;
  discount?: number;
}) {
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-white">Order Summary</h2>

      <Separator className="bg-white/10" />

      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-white">
            LE {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-white">
            LE {shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-red-400 font-medium">
            - LE {discount.toFixed(2)}
          </span>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="flex justify-between text-base font-semibold text-white">
        <span>Total</span>
        <span>LE {total.toFixed(2)}</span>
      </div>
      <Link href={"/checkout"}>
        <button className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition">
          Proceed to Checkout
        </button>
      </Link>
      {/* <CheckoutButton items={items} sessionId={sessionId} /> */}
    </div>
  );
}
