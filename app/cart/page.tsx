import CartPageClient from "./components/CartPageClient";
import { getCart, getSessionId } from "./lib/getCart";

const CartPage = async () => {
  const sessionId =await getSessionId();
  const cart = await getCart();

  return (
    <div className="container mx-auto mt-10">
      <CartPageClient cart={cart} sessionId={sessionId} />
    </div>
  );
};

export default CartPage;
