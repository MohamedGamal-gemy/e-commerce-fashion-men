// "use client";

// import { motion } from "framer-motion";
// import { Check } from "lucide-react";

// interface Step {
//   id: number;
//   title: string;
// }

// interface StepsFormProps {
//   currentStep: number;
//   steps: Step[];
// }

// const StepsForm: React.FC<StepsFormProps> = ({ currentStep, steps }) => {
//   const progressWidth = () => {
//     if (currentStep <= 0) return "0%";
//     if (currentStep >= steps.length - 1) return "100%";
//     return `${(currentStep / (steps.length - 1)) * 100}%`;
//   };

//   return (
//     <div className="relative py-6 px-6 md:px-8 max-w-4xl mx-auto select-none">
//       <div className="relative flex items-center justify-between">
//         {/* Background Track */}
//         <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700/60 rounded-full transform -translate-y-1/2" />

//         {/* Animated Progress Line */}
//         <motion.div
//           className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"
//           initial={{ width: 0 }}
//           animate={{ width: progressWidth() }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//         />

//         {/* Step Dots */}
//         {steps.map((step) => {
//           const isCompleted = currentStep > step.id;
//           const isCurrent = currentStep === step.id;

//           return (
//             <div
//               key={step.id}
//               className="relative flex flex-col items-center w-16 md:w-20 text-center"
//               aria-current={isCurrent ? "step" : undefined}
//             >
//               <motion.div
//                 whileHover={!isCompleted && !isCurrent ? { scale: 1.1 } : {}}
//                 className={`flex items-center justify-center w-10 h-10 rounded-full border 
//                   transition-all duration-300 ease-in-out
//                   ${isCompleted
//                     ? "bg-gradient-to-tr from-emerald-400 to-green-600 border-emerald-300 text-white shadow-[0_0_10px_rgba(16,185,129,0.6)]"
//                     : isCurrent
//                       ? "bg-gradient-to-tr from-cyan-400 to-blue-700 border-cyan-300 text-white shadow-[0_0_12px_rgba(6,182,212,0.7)]"
//                       : "bg-slate-800 border-slate-600 text-slate-400"
//                   }
//                 `}
//               >
//                 {isCompleted ? (
//                   <Check className="w-5 h-5" strokeWidth={2.5} />
//                 ) : (
//                   step.id + 1
//                 )}
//               </motion.div>

//               <motion.span
//                 className={`mt-2 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-t 
//                   ${isCurrent
//                     ? "from-cyan-300 to-blue-400"
//                     : isCompleted
//                       ? "from-emerald-300 to-green-400"
//                       : "from-slate-400 to-slate-500"
//                   }`}
//                 animate={{ opacity: isCurrent ? 1 : 0.8 }}
//               >
//                 {step.title}
//               </motion.span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default StepsForm;


"use client";

// import { Progress } from "@/components/ui/progress";
// import { Check } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Progress } from "@/components/ui/progress";

// interface Step {
//   id: number;
//   title: string;
// }

// export function StepsForm({ currentStep, steps }: { currentStep: number; steps: Step[] }) {
//   const progress = (currentStep / (steps.length - 1)) * 100;

//   return (
//     <div className="space-y-4 px-6 py-4 max-w-3xl mx-auto">
//       <div className="flex justify-between items-center relative">
//         {steps.map((step, i) => {
//           const isCompleted = i < currentStep;
//           const isCurrent = i === currentStep;

//           return (
//             <div key={i} className="flex flex-col items-center w-16 text-center">
//               <div
//                 className={cn(
//                   "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300",
//                   isCompleted
//                     ? "border-emerald-400 bg-emerald-500 text-white"
//                     : isCurrent
//                       ? "border-cyan-400 bg-cyan-600 text-white"
//                       : "border-slate-700 bg-slate-900 text-slate-400"
//                 )}
//               >
//                 {isCompleted ? <Check className="w-5 h-5" /> : step.id + 1}
//               </div>
//               <span
//                 className={cn(
//                   "text-sm mt-1 font-medium",
//                   isCurrent
//                     ? "text-cyan-400"
//                     : isCompleted
//                       ? "text-emerald-400"
//                       : "text-slate-500"
//                 )}
//               >
//                 {step.title}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <Progress value={progress} className="h-1 bg-slate-800" />
//     </div>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface Step {
  id: number;
  title: string;
}

export function StepsForm({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: Step[];
}) {
  const progress = useMemo(
    () => (currentStep / (steps.length - 1)) * 100,
    [currentStep, steps.length]
  );

  return (
    <div className="relative max-w-3xl mx-auto px-8 py-8">
      {/* الخط الخلفي */}
      <div className="absolute top-[50px] left-8 right-8 h-[3px] bg-slate-700 rounded-full z-0" />

      {/* خط التقدم المتحرك */}
      <motion.div
        className="absolute top-[50px] left-8 h-[3px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full z-10"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <div className="relative flex justify-between items-center z-20">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div key={i} className="flex flex-col items-center w-20">
              {/* الدائرة */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm shadow-md transition-all duration-300",
                  isCompleted
                    ? "border-emerald-400 bg-emerald-500 text-white shadow-emerald-500/40"
                    : isCurrent
                      ? "border-cyan-400 bg-cyan-600 text-white shadow-cyan-500/40"
                      : "border-slate-600 bg-slate-800 text-slate-400"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.id + 1}
              </motion.div>

              {/* العنوان */}
              <span
                className={cn(
                  "mt-2 text-sm font-medium select-none text-center",
                  isCurrent
                    ? "text-cyan-400"
                    : isCompleted
                      ? "text-emerald-400"
                      : "text-slate-500"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

