import CartHeader from "./CartHeader";
import CartList from "./CartList";
// import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { Cart } from "@/types/cart";

interface CartLayoutProps {
  cart: Cart;
  total: number;
  page: number;
  onPageChange: (newPage: number) => void;
}

const CartLayout = ({ cart, total, page, onPageChange }: CartLayoutProps) => {
  return (
    <div className="min-h-screen p-4 sm:p-8 relative">
      {/* <EffectLightBackground /> */}
      <div className="max-w-6xl mx-auto space-y-8">
        <CartHeader itemsCount={cart?.totalItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartList
            initialCart={cart}
            page={page}
            onPageChange={onPageChange}
          />
          <CartSummary subtotal={total} />
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
