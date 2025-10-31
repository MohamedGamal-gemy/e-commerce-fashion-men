"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: FormData) => void;
  isLoading: boolean;
  defaultValues?: { name: string };
}

export default function SubcategoryForm({
  onSubmit,
  isLoading,
  defaultValues,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { name: "" },
  });

  const handleSubmit = (values: FormData) => onSubmit(values);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 mt-4">
      <div>
        <label className="text-sm font-medium mb-1 block text-slate-200">
          Name
        </label>
        <Input
          placeholder="Enter subcategory name"
          {...form.register("name")}
          className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-slate-500"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-rose-400 mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-2"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
