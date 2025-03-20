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
  return (
    <InputContainer className={clsx("relative", "!border-[0px]")}>
      <Input ref={inputRef} {...inputProps} />
      <InputLabel
        {...labelProps}
        className={clsx(
          !!inputProps?.value
            ? "top-[25%] left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[50%] left-[1.625rem] translate-y-[-50%] text-[1rem]",
          "peer-focus:top-[25%] peer-focus:text-[0.75rem] !text-[#C7C3C3] text-[1rem]"
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
    </InputContainer>
  );
};
