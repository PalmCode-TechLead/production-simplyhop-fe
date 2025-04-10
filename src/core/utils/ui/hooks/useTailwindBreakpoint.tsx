// hooks/useTailwindBreakpoint.ts
import { useMediaQuery } from "usehooks-ts";

export const useTailwindBreakpoint = () => {
  const isXs = useMediaQuery("(max-width: 639px)");
  const isSm = useMediaQuery("(min-width: 640px) and (max-width: 767px)");
  const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLg = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isXl = useMediaQuery("(min-width: 1280px) and (max-width: 1535px)");
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
