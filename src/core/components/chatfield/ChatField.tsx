"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";

export interface ChatFieldProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const ChatField = ({ inputProps, labelProps }: ChatFieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  React.useEffect(() => {
    if (!inputProps?.disabled) {
      inputRef.current?.focus();
    }
  }, [inputProps?.disabled]);
  return (
    <InputContainer className={clsx("relative", "!border-[0px]", "!h-[48px]")}>
      <Input
        ref={inputRef}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
        onBlur={(e) => {
          inputRef.current?.focus();
          if (!inputProps?.onBlur) return;
          inputProps?.onBlur(e);
        }}
      />
      <InputLabel
        {...labelProps}
        className={clsx(
          inputProps?.disabled
            ? "top-[50%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[25%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]",
          inputProps?.disabled
            ? "!text-[#C7C3C3] text-[0.75rem] lg:text-[1rem]"
            : "!text-[#C7C3C3] text-[0.75rem]"
        )}
      />
    </InputContainer>
  );
};
