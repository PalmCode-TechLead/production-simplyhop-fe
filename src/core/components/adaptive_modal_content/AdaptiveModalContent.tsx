import React, { forwardRef } from "react";
import clsx from "clsx";

export const AdaptiveModalContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full h-full",
        "px-[1rem] py-[2rem] lg:px-[2rem] lg:py-[0rem]",
        "overflow-auto",
        "lg:max-h-[400px]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

AdaptiveModalContent.displayName = "AdaptiveModalContent";
