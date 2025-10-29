import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

const CartLayout = ({
  cart,
  total,
  page,
  onPageChange,
}: {
  cart: any;
  total: number;
  page: number;
  onPageChange: (newPage: number) => void;
}) => {
  return (
    <div className="min-h-screen p-4 sm:p-8 relative">
      {/* <EffectLightBackground /> */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* <CartHeader itemCount={cart?.totalItems} /> */}
        <CartHeader itemsCount={cart?.totalItems} />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartList
            initialCart={cart}
            page={page}
            onPageChange={onPageChange}
          />
          {/* <CartSummary total={total} itemCount={cart?.totalItems} /> */}
<CartSummary subtotal={total} />
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
