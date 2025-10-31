import { motion, AnimatePresence } from "framer-motion";

const ErrorForm = ({ errors }: { errors: any }) => {
  return (
    <AnimatePresence mode="wait">
      {errors && (
        <motion.p
          key={errors.message}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-rose-500 text-sm  "
          id={`${errors}-error`}
        >
          {errors.message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default ErrorForm;