"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import SubcategoryDialog from "./components/SubcategoryDialog";
import SubcategoryTable from "./components/SubcategoryTable";

export type Subcategory = {
  _id: string;
  name: string;
};

export default function SubcategoriesPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Subcategory | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Subcategory[]>({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:9000/api/subcategories");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`http://localhost:9000/api/subcategories/${id}`),
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: () => toast.error("Failed to delete"),
  });

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-semibold tracking-tight">Subcategories</h1>

          <Button
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Subcategory
          </Button>
        </div>

        <SubcategoryTable
          data={data || []}
          isLoading={isLoading}
          onDelete={(id) => deleteMutation.mutate(id)}
          onEdit={(subcategory) => {
            setEditData(subcategory);
            setOpen(true);
          }}
        />

        <SubcategoryDialog
          open={open}
          setOpen={setOpen}
          editData={editData}
        />
      </div>
    </div>
  );
}
