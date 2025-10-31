import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  type?: string;
  className?: string;
  value: any;
  error: { message: string } | undefined;
};

const FiledVariants = ({
  name,
  type = "text",
  className,
  value,
  error,
}: Props) => {
  const { register } = useFormContext();
  return (
    <div className="flex-1">
      <div className=" text-gray-50 ">
        <label className=" block text-sm font-medium text-slate-700 dark:text-slate-300">
          {name}
        </label>
        <input
          {...register(value)}
          type={type}
          className={`input ${className}`}
        />
      </div>
      <div>
        {error && <p className="text-red-500 mt-1">{error?.message}</p>}
      </div>
    </div>
  );
};

export default FiledVariants;