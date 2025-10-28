import CartItem from "./CartItem";
import CartPagination from "./CartPagination";
import { useGetCartQuery } from "@/store/cart";
import CartSkeleton from "./CartSkeleton";
import CartEmpty from "./CartEmpty";
const CartList = ({ initialCart, page, onPageChange }) => {
  const {
    data = initialCart,
    isLoading,
    error,
  } = useGetCartQuery({ page, limit: 4 }, { skip: !initialCart });
  if (isLoading && !data) return <CartSkeleton />;
  if (error) return <CartEmpty />;

  if (
    !data ||
    data.totalItems === 0 ||
    !data.items ||
    data.items.length === 0
  ) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:col-span-2  space-y-4">
      {data.items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
      {data.totalPages > 1 && (
        <CartPagination
          onPageChange={onPageChange}
          page={page}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
};

export default CartList;
