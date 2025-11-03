"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { Category, Subcategory } from "../../types/category-subcategory";
import useProductForm from "../../hooks/useProductForm";
import { StepsForm } from "./steps/steps";
import BasicInfo from "./steps/Basic";
import VariantsForm from "./steps/VariantsForm";
import ReviewForm from "./steps/ReviewForm";
import StepButtons from "./ui/StepButtons";

export default function ProductForm({
  categories,
  subcategories,
  page,
  product,
}: {
  categories: any;
  subcategories: any;
  page: "edit" | "add";
  product?: any;
}) {
  const { currentStep, steps, next, onSubmit, prev, methods, isPending } =
    useProductForm({ page, product });

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <FormProvider {...methods}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-700/10 relative borde border-sky-400 
          max-w-4xl mx-auto rounded-2xl pb-4 w-full"
        >
          <StepsForm currentStep={currentStep} steps={steps} />

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {currentStep === 0 && (
                  <BasicInfo
                    selectedSub={product?.subcategory}
                    selectedCat={product?.category || "mens"}
                    subcategories={subcategories}
                    categories={categories}
                  />
                )}

                {currentStep === 1 && <VariantsForm />}
                {currentStep === 2 && (
                  <ReviewForm
                    categories={categories}
                    subcategories={subcategories}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <StepButtons
              currentStep={currentStep}
              steps={steps.length}
              onNext={next}
              onPrev={prev}
              isPending={isPending}
            />
          </form>
        </motion.div>
      </FormProvider>
    </div>
  );
}
