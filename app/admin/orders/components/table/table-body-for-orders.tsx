import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActionsMenu } from "./OrderActionsMenu";
import { OrderDetailsButton } from "./OrderDetailsButton";

const TableBodyForOrders = ({ order, updateStatus }) => {
  return (
    <TableRow
      key={order._id}
      className="hover:bg-slate-800/60 transition-colors"
    >
      <TableCell className="font-mono text-slate-200">
        #{order._id.slice(-6).toUpperCase()}
      </TableCell>
      <TableCell className="text-slate-300">
        {order.user?.name || "Guest"}
      </TableCell>
      <TableCell className="text-slate-200 font-semibold">
        EGP {order.total}
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
          onChange={(status) => updateStatus.mutate({ id: order._id, status })}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableBodyForOrders;
