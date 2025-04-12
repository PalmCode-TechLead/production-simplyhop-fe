import React, { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
  }
>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center",
        "w-full",
        props.variant === "secondary" ? "bg-[white]" : "bg-[#5AC53D]",
        "py-[1rem]",
        "rounded-[0.375rem]",
        props.variant === "secondary"
          ? "text-[1rem] text-[#5AC53D] disabled:text-[#767676] font-medium"
          : "text-[1rem] text-[#FFFFFF] disabled:text-[#767676] font-medium",
        props.variant === "secondary"
          ? ""
          : "hover:bg-[#408C2B] disabled:bg-[#F6F6F6] disabled:hover:bg-[#F6F6F6]",
        props.variant === "secondary"
          ? "border border-[#5AC53D]"
          : "border border-[#5AC53D]",
        "cursor-pointer disabled:cursor-default",
        props.className
      )}
    />
  );
});

Button.displayName = "Button";
