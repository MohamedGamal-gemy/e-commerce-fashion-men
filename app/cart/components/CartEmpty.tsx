import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import emptyCart from "@/public/animations/Empty Cart.json";
import Lottie from "lottie-react";

const CartEmpty = () => (
  <div className="min-h-[70vh] flex flex-col justify-center items-center text-center space-y-6 px-4">
    <div className="w-80 sm:w-96 mx-auto">
      <Lottie animationData={emptyCart} autoplay loop  />
      {/* <Lottie animationData={emptyCart} autoplay loop /> */}
    
    </div>

    <motion.h2
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="text-2xl font-semibold text-yellow-500"
    >
      Your cart is empty
    </motion.h2>

    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        asChild
        className="bg-sky-500 text-white hover:bg-sky-600 shadow-md px-6 py-2"
      >
        <Link href="/products/men" className="flex items-center gap-2">
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowBigRight className="text-amber-400" />
          </motion.span>
          Start Shopping
        </Link>
      </Button>
    </motion.div>
  </div>
);

export default CartEmpty;
