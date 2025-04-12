import * as React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export interface BottomSheetProps {
  isOpen?: boolean;
  children?: React.ReactNode;
}

export const BottomSheet = ({ isOpen = false, children }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(
            "fixed top-0 bottom-0 left-0 right-0",
            "h-[100vh] bg-[rgba(255,255,255)] z-[1000]"
          )}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
