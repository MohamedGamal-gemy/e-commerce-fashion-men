// import { getSessionId } from "../cart/lib/getCart";
// import CheckoutForm from "./components/CheckoutForm";

// const Checkout = async() => {
//   const sessionId =await getSessionId();

//   return (
//     <div className="container m-auto my-8">
//       <div className="max-w-xl  w-full mx-auto">
//         <CheckoutForm sessionId={sessionId} />
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import { getCart, getSessionId } from "../cart/lib/getCart";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutSummary from "./components/CheckoutSummary";

export default async function CheckoutPage() {
  const sessionId = await getSessionId();
  const cart = await getCart();
  // مؤقتًا: بيانات تجريبية للسلة
  // const items = [
  //   { id: "1", name: "T-shirt Classic", price: 350, quantity: 2 },
  //   { id: "2", name: "Sneakers Air", price: 800, quantity: 1 },
  // ];
  console.log(cart);

  return (
    <div className="container mx-auto py-10 px-4">
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
