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
  const [value, setValue] = React.useState<string>("");

  return (
    <InputContainer className={clsx("relative", "!border-[0px]", "!h-[48px]")}>
      <Input
        ref={inputRef}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
      />
      <InputLabel
        {...labelProps}
        className={clsx(
          !!value.length || !!inputProps?.value
            ? "top-[25%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[50%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]",
          "peer-focus:top-[25%] peer-focus:text-[0.75rem] !text-[#C7C3C3] text-[0.75rem] lg:text-[1rem]"
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
    </InputContainer>
  );
};
