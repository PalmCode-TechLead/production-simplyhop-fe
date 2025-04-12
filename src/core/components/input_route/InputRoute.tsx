import React, { useRef } from "react";
import clsx from "clsx";
import { Input } from "../input/Input";
import { InputLabel, InputLabelProps } from "../input_label";

export interface InputRoute {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const InputRoute = ({ inputProps, labelProps }: InputRoute) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-cols-[1fr_auto_1fr] gap-[1rem]",
        "items-end content-end",
        "w-full h-full",
        "relative"
      )}
    >
      <Input ref={ref} {...inputProps} />

      <InputLabel
        {...labelProps}
        className={clsx(
          !!inputProps?.value
            ? "top-[25%] translate-y-[-50%] text-[0.75rem]"
            : "left-0 top-[50%] translate-y-[-50%] text-[0.75rem]",
          "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
        )}
        onClick={() => {
          ref.current?.focus();
        }}
      />
    </div>
  );
};
