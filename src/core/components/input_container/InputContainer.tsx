import React, { forwardRef } from "react";
import clsx from "clsx";

export const InputContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
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
        "bg-[white]",
        "grid grid-rows-1 grid-cols-1 justify-between justify-items-start",
        "items-end content-end",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});

InputContainer.displayName = "InputContainer";
