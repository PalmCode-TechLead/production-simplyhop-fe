import React, { forwardRef } from "react";
import clsx from "clsx";

export const InputContainer = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "relative",
        "w-full",
        "cursor-default",
        "overflow-hidden",
        "rounded-[0.375rem]",
        "border border-[#E2E2E2]",
        "px-[1.625rem] py-[0.5rem]",
        "h-[56px]",
        "grid grid-flow-col items-center content-center justify-between justify-items-start"
      )}
    >
      {props.children}
    </div>
  );
});
