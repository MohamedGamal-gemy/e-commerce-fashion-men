interface CartPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CartPagination = ({ page, totalPages, onPageChange }: CartPaginationProps) => (
  <div className="flex gap-2 items-center justify-center mt-4">
    {Array.from({ length: totalPages }).map((_, i) => (
      <button
        onClick={() => onPageChange(i + 1)}
        className={`${
          page === i + 1 ? "bg-sky-500 text-white" : "bg-slate-800 text-gray-200"
        } border border-slate-700 py-1 px-2 rounded cursor-pointer`}
        key={i}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default CartPagination;
