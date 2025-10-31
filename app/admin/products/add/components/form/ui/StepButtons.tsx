import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function StepButtons({
  currentStep,
  steps,
  onNext,
  onPrev,
  isPending,
}: {
  currentStep: number;
  steps: number;
  onNext: () => void;
  onPrev: () => void;
  isPending: any;
}) {
  return (
    <div className="flex justify-between mt-4">
      {/* Previous Button */}
      <button
        type="button"
        className={`flex items-center gap-1.5 group
         button disabled:!bg-gray-700 disabled:!cursor-not-allowed ${
           currentStep <= 0 ? "invisible" : ""
         }`}
        disabled={currentStep <= 0}
        onClick={onPrev}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
        <span>Previous</span>
      </button>
      {/* Next or Submit */}
      {currentStep < steps - 1 ? (
        <button
          type="button"
          className="group flex items-center gap-1.5 button"
          onClick={onNext}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
        </button>
      ) : (
        <motion.button
          type="submit"
          disabled={isPending}
          className={`button flex gap-1.5 items-center `}
        >
          <span>{isPending ? "Submiting..." : "Submit"} </span>
          <motion.div
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Send className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}