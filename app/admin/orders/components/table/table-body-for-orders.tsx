import { TableCell, TableRow } from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActionsMenu } from "./OrderActionsMenu";
import { OrderDetailsButton } from "./OrderDetailsButton";
import { Order } from "@/types/orders.types";

interface TableBodyForOrdersProps {
  order: Order;
  updateStatus: {
    mutate: (data: { id: string; status: string }) => void;
    isPending?: boolean;
  };
}

const TableBodyForOrders = ({ order, updateStatus }: TableBodyForOrdersProps) => {
  return (
    <TableRow
      key={order._id}
      className="hover:bg-slate-800/60 transition-colors"
    >
      <TableCell className="font-mono text-slate-200">
        #{order._id.slice(-6).toUpperCase()}
      </TableCell>

      <TableCell className="text-slate-300">
        {(
          typeof (order as any).user === "object" && (order as any).user?.name
        ) || (
          typeof (order as any).user === "object" && (order as any).user?.email
        ) || (
          typeof order.userId === "object" && order.userId?.name
        ) || (
          typeof order.userId === "object" && order.userId?.email
        ) || order.billingDetails?.fullName || "Guest"}
      </TableCell>

      <TableCell className="text-slate-200 font-semibold">
        EGP {order.total ?? (order as any).totalPrice}
      </TableCell>

      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>

      <TableCell className="text-slate-400">
        {new Date(order.createdAt).toLocaleDateString()}
      </TableCell>

      <TableCell>
        <OrderDetailsButton order={order} />
      </TableCell>

      <TableCell className="text-right">
        <OrderActionsMenu
          orderId={order._id}
          disabled={!!updateStatus.isPending}
          onChange={(status) => updateStatus.mutate({ id: order._id, status })}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableBodyForOrders;
