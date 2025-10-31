import { useFormContext } from "react-hook-form";
import ErrorForm from "../ui/ErrorForm";
import CategoryAndSubcategory from "../CategoryAndSubcategory";
import { Category, Subcategory } from "@/types/category-subcategory";
import { ProductFormData } from "@/schemas/productSchema";
import HeadForm from "../ui/HeadForm";
import Label from "../ui/Label";

export default function BasicProductForm({
  categories,
  subcategories,
}: {
  categories: Category;
  subcategories: Subcategory;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div>
      <HeadForm>Basic Form</HeadForm>
      <div className="space-y-4 bg-slate-800/60  border-blue-400/10 border p-4 rounded-xl">
        <div className="flex items-center gap-5  ">
          <div className="w-1/2">
            <Label>Name</Label>
            <input
              {...register("title")}
              placeholder="Title"
              className="input"
            />
          </div>
          <div className="w-1/2">
            <Label>Price</Label>
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className="input"
            />
          </div>
        </div>
        {/* errors */}
        <div className="flex items-center justify-between gap-5 -mt-2 ">
          <div className="flex-1">
            <ErrorForm errors={errors.title} />
          </div>
          <div className="flex-1">
            <ErrorForm errors={errors.price} />
          </div>
        </div>
        <div>
          <Label>Description</Label>

          <textarea
            {...register("description")}
            placeholder="Description"
            rows={4}
            className="input"
          />
        </div>
        <div className="-mt-4">
          <ErrorForm errors={errors.description} />
        </div>

        <CategoryAndSubcategory
          categories={categories}
          subcategories={subcategories}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}