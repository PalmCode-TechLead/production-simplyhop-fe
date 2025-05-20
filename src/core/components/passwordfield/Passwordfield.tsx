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
  error?: string;
  helper?: React.ReactNode;
}

export const Passwordfield = ({
  inputContainerProps,
  inputProps,
  labelProps,
  error,
  helper,
}: PasswordfieldProps) => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");
  const [type, setType] = React.useState<string>("password");

  const handleClickChangeType = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const showError = error;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
        "w-full"
      )}
    >
      <InputContainer
        {...inputContainerProps}
        className={clsx(
          "relative",
          error && "!border-[#DA2323]",
          inputContainerProps?.className
        )}
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
            !!value.length || !!inputProps?.value
              ? "top-[75%] right-[1rem] translate-y-[-50%] text-[0.75rem]"
              : "top-[50%] right-[1rem] translate-y-[-50%] text-[0.75rem]",
            "peer-focus:top-[75%]",
            "cursor-pointer"
          )}
          onClick={handleClickChangeType}
        >
          <SVGIcon
            name={type === "password" ? "EyeOff" : "Eye"}
            className={clsx("w-[1rem] h-[1rem]", "text-[#5B5B5B]")}
          />
        </button>

        <InputLabel
          {...labelProps}
          className={clsx(
            inputProps?.type === "time"
              ? "top-[25%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
              : !!value.length
              ? "top-[25%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.75rem]"
              : "top-[50%] left-[0.75rem] sm:left-[1.625rem] translate-y-[-50%] text-[0.875rem]",
            "peer-focus:top-[25%] peer-focus:text-[0.75rem] text-[0.75rem]",
            error ? "!text-[#DA2323]" : "!text-[#5B5B5B]"
          )}
          onClick={() => {
            inputRef.current?.focus();
          }}
        />
      </InputContainer>
      <div
        className={clsx(
          "flex items-center",
          !showError && helper ? "justify-end" : "justify-between",
          "w-full"
        )}
      >
        {showError && (
          <span
            className={clsx(
              "text-[0.625rem] text-[#DA2323] font-normal",
              "pl-[0.5rem]"
            )}
          >
            {error}
          </span>
        )}
        {helper && <>{helper}</>}
      </div>
    </div>
  );
};
