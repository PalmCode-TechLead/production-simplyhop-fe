import React, { forwardRef } from "react";
import clsx from "clsx";

export const InputPrice = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      type="number"
      className={clsx(
        "h-full w-[228px]",
        "bg-[white]",
        "outline-none",
        "text-[56px] text-[black] font-bold",
        props.className
      )}
    />
  );
});

InputPrice.displayName = "InputPrice";
