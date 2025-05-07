import * as React from "react";
import clsx from "clsx";
import { useIntersectionObserver } from "usehooks-ts";

export interface InfiniteScrollWrapperProps {
  children?: React.ReactNode;
  loader?: React.ReactNode;
  isPaused?: boolean;
  isEndReached?: boolean;
  position?: "bottom" | "top";
  onLoadMore?: () => void;
}

export const InfiniteScrollWrapper = ({
  children,
  loader,
  isPaused = false,
  isEndReached = false,
  position = "bottom",
  onLoadMore,
}: InfiniteScrollWrapperProps) => {
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (ref && loaderRef.current) {
      ref(loaderRef.current);
    }
  }, [ref]);

  React.useEffect(() => {
    if (isIntersecting && !isPaused && !isEndReached) {
      if (!onLoadMore) return;
      onLoadMore();
    }
  }, [isIntersecting, isPaused, isEndReached]);

  return (
    <div className={clsx("w-full")}>
      {position === "top" && (
        <div
          ref={ref}
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
            "w-full",
            isEndReached ? "h-[0px]" : "h-[400px]"
          )}
        >
          {!isEndReached && loader}
        </div>
      )}
      {children}

      {position === "bottom" && (
        <div
          ref={ref}
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
            "w-full",
            isEndReached ? "h-[0px]" : "h-[400px]"
          )}
        >
          {!isEndReached && loader}
        </div>
      )}
    </div>
  );
};
