import { Trash2 } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const CartItem = ({
  item,
  i,
  handleQuantityChange,
  handleDelete,
  isUpdating,
  isRemoving,
  ispending,
  setispending,
}) => (
  <div
    key={i}
    className="border border-white/10 rounded-xl p-4 w-full bg-slate-900/80 hover:bg-slate-900 
    transition-all duration-200 shadow-md hover:shadow-lg"
  >
    {/* <div className="grid grid-cols-3 items-center gap-4"> */}
    <div className="flex justify-between items-center gap-4">
      {/* 🖼️ Product Image & Info */}
      <div className="flex gap-4 items-start col-span-2">
        <Image
          className="w-24 h-24 object-cover rounded-lg border border-white/10 object-top"
          src={item.variantId.images[0].url}
          alt={item.productId.title}
          height={100}
          width={100}
        />
        <div className="space-y-1.5">
          <div className="text-base font-semibold">{item.productId.title}</div>
          <div className="text-sm text-sky-400 font-bold">
            LE {item.productId.price}
          </div>
          <div className="text-sm text-gray-400">
            {item.size} · {item.variantId.color.name}
          </div>
        </div>
      </div>

      {/* 🔢 Quantity + Delete */}
      <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
        <button
          className="bg-slate-700 hover:bg-slate-600 px-3 py-1 text-lg font-semibold"
          disabled={isUpdating}
          onClick={() => {
            handleQuantityChange(item.variantId, item.size, item.quantity - 1);
            setispending(i);
          }}
        >
          -
        </button>

        {isUpdating && ispending === i ? (
          <div className="w-12 flex justify-center py-1">
            <div className="w-5 h-5 border-2 border-sky-400 border-b-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="w-12 text-center bg-transparent text-gray-100 outline-none !border-0"
          />
        )}

        <button
          className="bg-slate-700 hover:bg-slate-600 px-3 py-1 text-lg font-semibold"
          disabled={isUpdating}
          onClick={() => {
            handleQuantityChange(item.variantId, item.size, item.quantity + 1);
            setispending(i);
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={() =>
          handleDelete({ variantId: item.variantId, size: item.size })
        }
        className="text-red-500 hover:text-red-400 transition-colors duration-150"
      >
        {isRemoving && ispending === i ? (
          <div className="w-5 h-5 border-2 border-red-500 border-b-transparent rounded-full animate-spin" />
        ) : (
          <Trash2 size={20} />
        )}
      </button>
    </div>
  </div>
);

export default memo(CartItem);
