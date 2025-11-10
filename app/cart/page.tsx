import CartPageClient from "./components/CartPageClient";
import { getCart } from "./lib/getCart";

const CartPage = async () => {
  const cart = await getCart();
  const sessionId = cart.sessionId || null;
console.log(cart);

  return (
    <div className="container mx-auto mt-10">
      <CartPageClient cart={cart} sessionId={sessionId} />
    </div>
  );
};

export default CartPage;
