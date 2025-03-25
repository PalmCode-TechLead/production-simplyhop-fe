import React, { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center",
        "w-full",
        "bg-[#5AC53D]",
        "py-[1rem]",
        "rounded-[0.375rem]",
        "text-[1rem] text-[#FFFFFF] font-medium",
        "hover:bg-[#408C2B] disabled:bg-[#F6F6F6] disabled:hover:bg-[#F6F6F6]",
        "cursor-pointer disabled:cursor-default",
        props.className
      )}
    />
  );
});

Button.displayName = "Button";
