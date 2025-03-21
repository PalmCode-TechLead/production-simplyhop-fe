"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";

export interface TextfieldProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const Textfield = ({ inputProps, labelProps }: TextfieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");
  return (
    <InputContainer className={clsx("relative")}>
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
          !!value.length
            ? "top-[25%] left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[50%] left-[1.625rem] translate-y-[-50%] text-[0.875rem]",
          "peer-focus:top-[25%] peer-focus:text-[0.75rem] !text-[#5B5B5B] text-[0.75rem]"
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
    </InputContainer>
  );
};
