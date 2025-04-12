// hooks/useTailwindBreakpoint.ts
import { useMediaQuery } from "usehooks-ts";

export const useTailwindBreakpoint = () => {
  const isXs = useMediaQuery("(max-width: 639px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const is2xl = useMediaQuery("(min-width: 1536px)");

  let current: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | null = null;

  if (isXs) current = "xs";
  else if (isSm) current = "sm";
  else if (isMd) current = "md";
  else if (isLg) current = "lg";
  else if (isXl) current = "xl";
  else if (is2xl) current = "2xl";

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    current,
  };
};
