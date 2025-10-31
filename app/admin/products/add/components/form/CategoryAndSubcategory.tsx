import ErrorForm from "./ui/ErrorForm";
import Label from "./ui/Label";
import SelectCategoryOrSubcategory from "./ui/SelectCategoryOrSubcategory";

const CategoryAndSubcategory = ({
  categories,
  subcategories,
  register,
  errors,
}) => {
  return (
    <div>
      {/* category & subcategory */}
      <div className="flex items-center gap-5 w-full">
        <div className="w-1/2 space-y-1">
          <Label id={"category"}>Category</Label>
          <SelectCategoryOrSubcategory
            items={categories}
            name={"category"}
            register={register}
          />
        </div>
        {/*subcategory*/}
        <div className="w-1/2 space-y-1">
          <Label id={"subcategory"}>Subcategory</Label>
          <SelectCategoryOrSubcategory
            items={subcategories}
            name={"subcategory"}
            register={register}
          />
        </div>
      </div>
      {/* errors  category & subcategory*/}
      <div className="flex items-center justify-between gap-5 mt-2">
        <div className="flex-1">
          <ErrorForm errors={errors.category} />
        </div>
        <div className="flex-1">
          <ErrorForm errors={errors.subcategory} />
        </div>
      </div>
    </div>
  );
};

export default CategoryAndSubcategory;