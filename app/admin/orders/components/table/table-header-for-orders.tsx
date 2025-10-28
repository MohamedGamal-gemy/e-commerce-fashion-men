import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

const TableHeaderForOrders = () => {
  return (
          <TableHeader className="bg-slate-800/50">
            <TableRow>
              <TableHead className="text-slate-300">Order ID</TableHead>
              <TableHead className="text-slate-300">Customer</TableHead>
              <TableHead className="text-slate-300">Total</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Date</TableHead>
              <TableHead className="text-slate-300">Details</TableHead>
              <TableHead className="text-slate-300 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
  )
}

export default TableHeaderForOrders
