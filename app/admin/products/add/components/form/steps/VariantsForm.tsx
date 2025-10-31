import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import VariantsList from "../variantsForm/VariantsList";
import { ProductFormData } from "../../../schemas/productSchema";

const VariantsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormData>();
  const {
    fields,
    append: appendVariant,
    remove,
  } = useFieldArray({
    name: "variants",
    control,
  });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="">
      <AnimatePresence>
        {fields?.map((field, indx) => (
          <VariantsList
            key={field.id}
            index={indx}
            fields={fields}
            openIndex={openIndex}
            remove={remove}
            errors={errors}
            toggleAccordion={toggleAccordion}
          />
        ))}
      </AnimatePresence>
      <div className="mb-4">
        <button
          onClick={() => {
            appendVariant({
              color: { name: "", value: "#000000" },
              sizes: [{ size: "", stock: 1 }],
              images: [],
            });
            setOpenIndex(fields.length);
          }}
          type="button"
          className="bg-gradient-to-br to-green-600 from-sky-400 flex items-center
            hover:bg-gradient-to-bl duration-200 transition  p-2 rounded font-medium text-white"
        >
          <Plus size={18} />
          Add Variant
        </button>
      </div>
    </div>
  );
};

export default VariantsForm;