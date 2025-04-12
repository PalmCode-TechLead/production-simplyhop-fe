import * as React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export type BottomSheetDirection = "top" | "bottom" | "left" | "right";

export interface BottomSheetAnimationVariant {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
}

export interface BottomSheetProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  direction?: BottomSheetDirection;
}

export const BottomSheet = ({
  isOpen = false,
  children,
  direction = "bottom",
}: BottomSheetProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const variants: Record<BottomSheetDirection, BottomSheetAnimationVariant> = {
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    },
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
  };

  const animation = variants[direction];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx(
            "bg-[rgba(255,255,255)]",
            "fixed bottom-0 left-0 right-0",
            "h-fit z-[1000]",
            "rounded-tr-[1.25rem] rounded-tl-[1.25rem]"
          )}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
