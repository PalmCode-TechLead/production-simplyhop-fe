"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";

export interface ChatFieldProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const ChatField = ({ inputProps, labelProps }: ChatFieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const { isLg } = useTailwindBreakpoint();
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => {
    if (!inputProps?.disabled && !isLg) {
      inputRef.current?.focus();
    }
  }, [inputProps?.disabled, isLg]);

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
        onBlur={(e) => {
          if (!isLg) {
            inputRef.current?.focus();
          }

          if (!inputProps?.onBlur) return;
          inputProps?.onBlur(e);
        }}
      />
      <InputLabel
        {...labelProps}
        className={clsx(
          inputProps?.disabled
            ? "top-[50%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : isLg
            ? "top-[50%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[25%] left-[0.75rem] lg:left-[1.625rem] translate-y-[-50%] text-[0.75rem]",
          inputProps?.disabled
            ? "!text-[#C7C3C3] text-[0.75rem] lg:text-[1rem]"
            : isLg && !!value.length
            ? "peer-focus:top-[25%] peer-focus:text-[0.75rem] !text-[#C7C3C3] text-[0.75rem]"
            : "!text-[#C7C3C3] text-[0.75rem]"
        )}
        onClick={() => {
          if (isLg) {
            inputRef.current?.focus();
          }
        }}
      />
    </InputContainer>
  );
};
