import React, { forwardRef } from "react";
import clsx from "clsx";

export const AutocompleteOptionsContainer = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "absolute z-9999",
        "w-full",
        "max-h-[160px]",
        "overflow-auto",
        "mt-[0.5rem]",
        "bg-[white]",
        "border border-[#B5B5B5]",
        "focus:outline-none",
        "rounded-[1rem]",
        "z-[20]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});
