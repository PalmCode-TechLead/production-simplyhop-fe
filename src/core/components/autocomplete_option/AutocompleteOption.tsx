import React, { forwardRef } from "react";
import clsx from "clsx";

export const AutocompleteOption = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        `relative cursor-pointer select-none p-[1rem]`,
        "bg-[white]",
        "text-[1rem]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
});
