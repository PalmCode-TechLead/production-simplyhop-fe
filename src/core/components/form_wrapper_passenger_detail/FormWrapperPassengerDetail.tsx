import React, { forwardRef } from "react";
import clsx from "clsx";

export const FormWrapperPassengerDetail = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }
>((props, ref) => {
  const { isOpen, ...restProps } = props;
  if (!isOpen) {
    return null;
  }
  return (
    <div
      ref={ref}
      {...restProps}
      className={clsx(
        "absolute",
        "top-[-200px] right-0",
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "px-[1rem] py-[0.75rem]",
        "min-w-[255px]",
        "bg-[white]",
        "rounded-[0.625rem]"
      )}
      style={{
        boxShadow: "0px 0px 25px 0px #365F2B66",
      }}
    >
      {props.children}
    </div>
  );
});

FormWrapperPassengerDetail.displayName = "FormWrapperPassengerDetail";
