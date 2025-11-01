

import FiledData from "./FiledData";
import CategorySelector from "./CategorySelector";
import SubcategorySelector from "./SubcategorySelector";
import { useFormContext } from "react-hook-form";
import { ProductFormData } from "../../../../schemas/productSchema";

const BasicInfo = ({
  // categories,
  subcategories,
  selectedCat,
  selectedSub,
}: {
  // categories: any[];
  subcategories: any[];
  selectedCat?: string;
  selectedSub?: string;
}) => {
  const {
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <FiledData name="title" error={errors.title} label="Title" />
        <FiledData name="price" type="number" error={errors.price} label="Price" />
      </div>

      <FiledData name="description" type="textarea" error={errors.description} label="Description" />

      <div className="flex flex-col md:flex-row gap-4">
        {/* <CategorySelector options={categories} defaultValue={selectedCat} /> */}
        <SubcategorySelector options={subcategories} defaultValue={selectedSub} />
      </div>
    </div>
  );
};

export default BasicInfo;
