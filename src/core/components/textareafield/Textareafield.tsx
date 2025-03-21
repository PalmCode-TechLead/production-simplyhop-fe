"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Textarea } from "../textarea/Textarea";

export interface TextareafieldProps {
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  labelProps?: InputLabelProps;
}

export const Textareafield = ({
  inputProps,
  labelProps,
}: TextareafieldProps) => {
  const textareaRef = React.useRef<null | HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState<string>("");
  return (
    <InputContainer className={clsx("relative")}>
      <Textarea
        ref={textareaRef}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          textareaRef.current?.focus();
        }}
      />
    </InputContainer>
  );
};
