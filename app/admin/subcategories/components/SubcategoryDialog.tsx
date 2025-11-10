"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import SubcategoryForm from "./SubcategoryForm";
import axios from "axios";
import { Subcategory } from "../page";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: Subcategory | null;
}

export default function SubcategoryDialog({ open, setOpen, editData }: Props) {
  const queryClient = useQueryClient();

  const isEditing = !!editData;

  const mutation = useMutation({
    mutationFn: async (values: { name: string }) => {
      if (isEditing) {
        return axios.put(
          `http://localhost:9000/api/product-types/${editData?._id}`,
          values
        );
      } else {
        return axios.post("http://localhost:9000/api/product-types", values);
      }
    },
    onSuccess: () => {
      toast.success(isEditing ? "Updated successfully" : "Added successfully");
      queryClient.invalidateQueries({ queryKey: ["types"] });
      setOpen(false);
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Operation failed";
      toast.error(msg);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-slate-800 border border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-100">
            {isEditing ? "Edit Subcategory" : "Add Subcategory"}
          </DialogTitle>
        </DialogHeader>
        <SubcategoryForm
          onSubmit={(values) => mutation.mutate(values)}
          isLoading={mutation.isPending}
          defaultValues={editData || { name: "" }}
        />
      </DialogContent>
    </Dialog>
  );
}
