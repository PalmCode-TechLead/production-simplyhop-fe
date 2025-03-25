"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import clsx from "clsx";
import { Input } from "../input";
import SVGIcon from "@/core/icons";

export interface PasswordfieldProps {
  inputContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
}

export const Passwordfield = ({
  inputContainerProps,
  inputProps,
  labelProps,
}: PasswordfieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");
  const [type, setType] = React.useState<string>("password");

  const handleClickChangeType = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <InputContainer
      {...inputContainerProps}
      className={clsx("relative", inputContainerProps?.className)}
    >
      <Input
        ref={inputRef}
        {...inputProps}
        type={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
          if (!inputProps?.onChange) return;
          inputProps.onChange(e);
        }}
      />
      <button
        className={clsx(
          "flex items-center justify-center",
          "w-[1rem] h-[1rem]",
          "rounded-[50%]",
          "absolute",
          !!value.length
            ? "top-[75%] right-[1rem] translate-y-[-50%] text-[0.75rem]"
            : "top-[50%] right-[1rem] translate-y-[-50%] text-[0.75rem]",
          "peer-focus:top-[75%]",
          "cursor-pointer"
        )}
        onClick={handleClickChangeType}
      >
        <SVGIcon
          name={type === "password" ? "EyeOff" : "Eye"}
          className={clsx("w-[1rem] h-[1rem]", "text-[#767676]")}
        />
      </button>

      <InputLabel
        {...labelProps}
        className={clsx(
          inputProps?.type === "time"
            ? "top-[25%] left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
            : !!value.length
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
