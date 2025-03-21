import React, { forwardRef } from "react";
import clsx from "clsx";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className={clsx(
        "peer",
        "w-full",
        // "bg-transparent",
        "font-medium text-[0.875rem] leading-[1.25rem]",
        "text-[#000000] disabled:text-[#000000]",
        "placeholder:text-[#666666] placeholder:text-[0.875rem]",
        "outline-none",
        "border-none",
        "appearance-none",
        "resize-none",
        props.className
      )}
    />
  );
});

Textarea.displayName = "Textarea";
