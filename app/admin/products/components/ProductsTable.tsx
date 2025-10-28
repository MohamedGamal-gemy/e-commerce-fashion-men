"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductRow } from "./ProductRow";

export function ProductsTable({ products }: { products: any[] }) {
  if (!products?.length) {
    return (
      <div className="text-center text-slate-400 py-12">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <Table>
        <TableHeader className="bg-slate-900/70 backdrop-blur-sm">
          <TableRow className="border-slate-800">
            <TableHead className="text-slate-300 font-medium">Product</TableHead>
            <TableHead className="text-slate-300 font-medium">Subcategory</TableHead>
            <TableHead className="text-center text-slate-300 font-medium">Price</TableHead>
            <TableHead className="text-center text-slate-300 font-medium">Stock</TableHead>
            <TableHead className="text-center text-slate-300 font-medium">Rating</TableHead>
            <TableHead className="text-center text-slate-300 font-medium">Status</TableHead>
            <TableHead className="text-center text-slate-300 font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <ProductRow key={product._id} product={product} />
          ))}
        </TableBody>
      </Table>

      {/* <TableCaption className="text-slate-500 py-4 text-sm">
        {products.length} products displayed
      </TableCaption> */}
    </div>
  );
}
