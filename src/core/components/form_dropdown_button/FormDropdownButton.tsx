import React, { forwardRef } from "react";
import clsx from "clsx";

export const FormDropdownButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "relative",
        "w-full",
        "cursor-pointer",
        "font-medium text-[0.875rem] leading-[1.25rem]",
        "text-[#000000] whitespace-nowrap",
        "overflow-hidden",
        "rounded-[0.375rem]",
        "border border-[#E2E2E2]",
        "px-[0.75rem] sm:px-[1.625rem] py-[0.5rem]",
        "h-[56px]",
        "bg-[white]",
        "grid grid-rows-1 grid-cols-1 justify-between justify-items-start",
        "items-end content-end",
        props.className
      )}
    />
  );
});

FormDropdownButton.displayName = "FormDropdownButton";
