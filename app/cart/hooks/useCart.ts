import { useGetCartQuery } from "@/store/cart";

export const useCart = (initialCart?: any) => {
  const { data, error, isLoading } = useGetCartQuery(
    { page: 1, limit: 4 },
    {
      skip: !!initialCart,
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    cart: initialCart || data,
    error,
    isLoading,
  };
};
