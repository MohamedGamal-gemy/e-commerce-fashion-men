"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function OrderActionsMenu({
  onChange,
}: {
  orderId?: string;
  onChange: (status: string) => void;
}) {
  const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-slate-700 text-slate-200 hover:bg-slate-800/80"
        >
          Change Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200 ">
        {statuses.map((status) => (
          <DropdownMenuItem className="hover:bg-sky-400" key={status} onClick={() => onChange(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
