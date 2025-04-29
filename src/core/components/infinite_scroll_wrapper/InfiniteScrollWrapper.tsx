import * as React from "react";
import clsx from "clsx";
import { ListLoader, ListLoaderProps } from "../list_loader";
import { useIntersectionObserver } from "usehooks-ts";

export interface InfiniteScrollWrapperProps {
  children?: React.ReactNode;
  loader?: ListLoaderProps;
  isPaused?: boolean;
  isEndReached?: boolean;
  onLoadMore?: () => void;
}

export const InfiniteScrollWrapper = ({
  children,
  loader,
  isPaused = false,
  isEndReached = false,
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
    if (isIntersecting && !isPaused) {
      if (!onLoadMore) return;
      onLoadMore();
    }
  }, [isIntersecting]);

  return (
    <div className={clsx("w-full")}>
      {children}

      <div
        ref={ref}
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full",
          isEndReached ? "h-[0px]" : "h-[400px]"
        )}
      >
        {!isEndReached && <ListLoader {...loader} />}
      </div>
    </div>
  );
};
