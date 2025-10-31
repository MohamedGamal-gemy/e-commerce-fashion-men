import { AnimatePresence, motion } from "framer-motion";
import FiledVariants from "./FiledVariants";
import { Trash2 } from "lucide-react";
import ImagesOfVariants from "./ImagesOfVariants";
import SizesOfVariants from "./SizesOfVariants";

const VariantsList = ({
  index,
  fields,
  remove,
  toggleAccordion,
  openIndex,
  errors,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4  bg-slate-900 p-4 rounded-xl mb-4"
    >
      <div className="border border-blue-400/20 shadow-md rounded-lg bg-slate-800">
        <div
          className="flex justify-between items-center p-3 cursor-pointer bg-gray-70"
          onClick={() => toggleAccordion(index)}
        >
          <div className="flex items-center gap-2">
            <span>Variant </span>
            <span
              className="w-6 h-6 bg-gradient-to-b to-green-400 rounded-lg
           bg-cyan-600 flex items-center justify-center"
            >
              {" "}
              {index + 1}
            </span>
          </div>
          {/* remove */}
          <Trash2
            className={`w-5 h-5 text-red-500 ${
              fields.length === 1 ? "invisible" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              remove(index);
            }}
          />
        </div>

        <AnimatePresence initial={false}>
          {openIndex === index && (
            <motion.div
              key="accordion-content"
              initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
              animate={{
                opacity: 1,
                scaleY: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                },
              }}
              exit={{
                opacity: 0,
                scaleY: 0,
                transformOrigin: "top",
                transition: { duration: 0.3 },
              }}
              className="p-3 space-y-2 origin-top"
            >
              <div className="flex items-center gap-4">
                <FiledVariants
                  name="Color Name"
                  value={`variants.${index}.color.name`}
                  error={errors?.variants?.[index]?.color?.name}
                />
                <FiledVariants
                  value={`variants.${index}.color.value`}
                  type="color"
                  name={"Color Value"}
                  className="h-10"
                  error={errors?.variants?.[index]?.color?.value}
                />
              </div>

              <ImagesOfVariants index={index} />
              <div className="bg-slate-900/40 p-4 rounded-xl">
                <SizesOfVariants variantIndx={index} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VariantsList;