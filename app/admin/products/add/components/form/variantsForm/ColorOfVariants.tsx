import { useFormContext } from "react-hook-form";
import ErrorForm from "../ui/ErrorForm";
import Label from "../ui/Label";

const ColorOfVariants = ({ index }: { index: number }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className=" bg-slate-900/40 p-4 rounded-xl">
      <div className="flex items-center gap-5 ">
        <div className="flex-1">
          <Label id={"color-name"}>Color Name</Label>
          <input
            {...register(`variants.${index}.color.name`)}
            placeholder="Color Name"
            className="input"
          />
        </div>
        <div className="flex-1">
          <Label id={"color-value"}>Color Value</Label>
          <input
            type="color"
            // value={"#000000"}
            {...register(`variants.${index}.color.value`)}
            placeholder="Color Value"
            className="input h-11"
          />
        </div>
      </div>
      <div className="flex mt-1.5 gap-5 items-center  justify-between">
        <div className="w-full">
          <ErrorForm errors={errors?.variants?.[index]?.color?.name} />
        </div>
        
        <div className="w-full">
          <ErrorForm errors={errors?.variants?.[index]?.color?.value} />
        </div>
      </div>
    </div>
  );
};

export default ColorOfVariants;