import { getCart, getSessionId } from "../cart/lib/getCart";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutSummary from "./components/CheckoutSummary";

export default async function CheckoutPage() {
  const sessionId = await getSessionId();
  const cart = await getCart();
// console.log();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Mobile view: Summary above form */}
      <div className="block lg:hidden mb-6">
        <CheckoutSummary items={cart?.items} />
      </div>

      {/* <div className="grid lg:grid-cols-2 gap-10 items-start"> */}
      <div className="flex  gap-10 items-start">
        <div className="max-w- mx-auto w-full">
          <CheckoutForm sessionId={sessionId} />
        </div>

        {/* Desktop view: Sticky Summary */}
        <div className="hidden lg:block max-w-[25rem] w-full ">
          <CheckoutSummary items={cart?.items} />
        </div>
      </div>
    </div>
  );
}
