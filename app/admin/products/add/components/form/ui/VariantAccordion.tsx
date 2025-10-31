import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
// import SizesOfVariants from "../variantsForm/SizesOfVariants";
import ColorOfVariants from "../variantsForm/ColorOfVariants";
import ImagesOfVariants from "../variantsForm/ImagesOfVariants";
import SizesOfVariants from "../variantsForm/SizesOfVariants";

export default function VariantAccordion({
  index,
  onRemove,
  isOpen,
  onToggle,
  lengthVariants,
}: {
  index: number;
  onRemove: () => void;
  isOpen: boolean;
  onToggle: () => void;
  lengthVariants: number;
}) {
  return (
    <div className="border border-blue-400/20 shadow-md rounded-lg bg-slate-800">
      <div
        className="flex justify-between items-center p-3 cursor-pointer bg-gray-70"
        onClick={onToggle}
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
        <Trash2
          className={`w-5 h-5 text-red-500 ${
            lengthVariants === 1 ? "invisible" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
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
            {/* <ColorOfVariants index={index} /> */}
            <SizesOfVariants variantIndx={index} />
            <ImagesOfVariants index={index} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}