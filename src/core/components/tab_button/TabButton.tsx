import React, { forwardRef } from "react";
import clsx from "clsx";

export const TabButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
    variant?: "horizontal" | "vertical";
  }
>((props, ref) => {
  const { selected, variant, ...otherProps } = props;
  if (variant === "horizontal") {
    return (
      <button
        ref={ref}
        {...otherProps}
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full",
          selected ? "bg-[#5AC53D0A]" : "bg-[transparent]",
          selected
            ? "text-[#232323] text-[1rem] font-semibold"
            : "text-[#828282] text-[1rem] font-normal",
          selected
            ? "border-b border-b-[#5AC53D]"
            : "border-b border-b-[white]",
          "px-[1rem] py-[0.75rem]",
          "cursor-pointer",
          "whitespace-nowrap",
          "outline-none",
          props.className
        )}
      >
        {props.children}
      </button>
    );
  }
  return (
    <button
      ref={ref}
      {...otherProps}
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
        "w-full",
        selected ? "bg-[#5AC53D0A]" : "bg-[transparent]",
        "rounded-tr-[0.625rem] rounded-br-[0.625rem]",
        selected
          ? "text-[#232323] text-[1rem] font-semibold"
          : "text-[#828282] text-[1rem] font-normal",
        selected ? "border-l border-l-[#5AC53D]" : "border-l border-l-[white]",
        "px-[1rem] py-[0.75rem]",
        "cursor-pointer",
        "outline-none",
        props.className
      )}
    >
      {props.children}
    </button>
  );
});

TabButton.displayName = "TabButton";
