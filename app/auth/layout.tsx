// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import React from "react";

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
//       {/* Left side image */}
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="hidden md:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden"
//       >
//         <Image
//           src="https://images.unsplash.com/photo-1604147706283-d7119b5d58b0?q=80&w=1200"
//           alt="Fashion background"
//           fill
//           className="object-cover opacity-60"
//         />
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 to-slate-800/50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 1 }}
//         />
//         <motion.h1
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="z-10 text-4xl font-semibold text-center px-6"
//         >
//           Welcome to <span className="text-sky-400">Your Store</span>
//         </motion.h1>
//       </motion.div>

//       {/* Right side form */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex-1 flex items-center justify-center p-6 md:p-10"
//       >
//         {children}
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React from "react";
import animationData from "@/public/animations/login.json";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Left side with Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden"
      >
        {/* خلفية متدرجة */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 to-slate-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
        {/* Lottie Animation */}
        <div className="z-10 w-3/4 max-w-md ">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-[35rem] " 
          />
        </div>
        {/* العنوان */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="z-10 text-4xl font-semibold text-center px-6 mt-6 absolute top-8"
        >
          Welcome to <span className="text-sky-400">Your Store</span>
        </motion.h1>
      </motion.div>

      {/* Right side form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center "
      >
        {children}
      </motion.div>
    </div>
  );
}
