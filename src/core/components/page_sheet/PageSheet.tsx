import * as React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export type PageSheetDirection = "top" | "bottom" | "left" | "right";

export interface PageSheetAnimationVariant {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
}

export interface PageSheetProps {
  open?: boolean;
  children?: React.ReactNode;
  direction?: PageSheetDirection;
}

export const PageSheet = ({
  open = false,
  children,
  direction = "bottom",
}: PageSheetProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const variants: Record<PageSheetDirection, PageSheetAnimationVariant> = {
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
      {open && (
        <motion.div
          className={clsx(
            "bg-[rgba(255,255,255)]",
            "inset-0",
            "fixed top-0 bottom-0 left-0 right-0",
            "h-[100vh] z-[1000]"
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
