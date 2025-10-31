import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Pencil,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Subcategory } from "../page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  data: Subcategory[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (subcategory: Subcategory) => void;
}

export default function SubcategoryTable({
  data,
  isLoading,
  onDelete,
  onEdit,
}: Props) {
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40 text-slate-400">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 shadow-md overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-800">
          <TableRow>
            <TableHead className="text-slate-200">Name</TableHead>
            <TableHead className="text-right text-slate-200">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((sub) => (
              <TableRow
                key={sub._id}
                className="hover:bg-slate-700/40 transition-colors duration-150"
              >
                <TableCell className="font-medium text-slate-100">
                  {sub.name}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* ✏️ Edit */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-sky-400 hover:bg-sky-500/10"
                    onClick={() => onEdit(sub)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  {/* 🗑 Delete with confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-slate-800 border border-slate-700 text-slate-100">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-rose-400">
                          <AlertTriangle className="w-5 h-5" />
                          Confirm Deletion
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          Are you sure you want to delete{" "}
                          <span className="font-semibold text-slate-100">
                            {sub.name}
                          </span>
                          ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-700 hover:bg-slate-600 text-slate-200">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(sub._id)}
                          className="bg-rose-600 hover:bg-rose-500 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-slate-400 py-8 italic"
              >
                No subcategories found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
