"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useDeleteResource } from "../hooks/useDeleteResource";
import type { ProductAdmin } from "@/types/productsAdmin";

interface ProductActionsProps {
  row: ProductAdmin;
  onOpenDetails: () => void;
  onEdit: () => void;
}

export function ProductActions({ row, onOpenDetails, onEdit }: ProductActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: handleDelete, isPending } = useDeleteResource(
    "admin-products",
    "products/admin"
  );

  return (
    <>
      <div className="flex items-center justify-center">
        {/* 👁️ View Details */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-sky-400 hover:bg-slate-800/60"
          onClick={onOpenDetails}
        >
          <Eye className="w-4 h-4" />
        </Button>

        {/* ✏️ Edit */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-yellow-400 hover:bg-slate-800/60"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4" />
        </Button>

        {/* 🗑️ Delete */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-red-500 hover:bg-slate-800/60"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* ⚠️ Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="bg-slate-950 border border-slate-800 text-slate-200">
          <DialogHeader>
            <DialogTitle className="text-red-500 font-semibold">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>

          <p className="text-slate-400 mb-4">
            This will permanently delete{" "}
            <span className="text-sky-400 font-medium">{row.title}</span>. This
            action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => handleDelete(row._id)}
              className="transition-all duration-300"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
