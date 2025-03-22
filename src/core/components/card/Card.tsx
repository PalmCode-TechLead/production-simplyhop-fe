import React, { forwardRef } from "react";
import clsx from "clsx";

export const Card = forwardRef<
  HTMLDivElement,
  React.InputHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1.5rem]",
        "w-full",
        "px-[1rem] py-[0.75rem]",
        "rounded-[0.375rem]",
        "border border-[#EFEFEF]",
        props.className
      )}
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 25px 0px #969C9640",
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
});

Card.displayName = "Card";
