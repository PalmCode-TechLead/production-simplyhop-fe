"use client";
import * as React from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { DayPickerActivityMobile } from "../daypicker";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";

export interface DatePickerProps {
  value?: Date;
  disabled?: boolean;
  labelProps?: InputLabelProps;
  onSelect?: (data: Date) => void;
}

export const DatePicker = ({
  value = new Date(),
  disabled = false,
  labelProps,
  onSelect = (data: Date) => {},
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [date, setDate] = React.useState<Date>(value);

  // React.useEffect(() => {
  //   if (value) {
  //     setDate(new Date(value));
  //   }
  // }, [value]);

  // useOnClickOutside(ref, () => {
  //   setIsOpen((_) => false);
  // });

  const handleClickDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectDate = (data: Date) => {
    setDate(data);
    setIsOpen(false);
    onSelect(data);
  };

  const handleSelectMonth = (data: Date) => {
    setDate(data);
  };

  const handleSelectYear = (data: Date) => {
    setDate(data);
  };

  const formattedValue = new Date(value).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full",
          "relative"
        )}
        ref={ref}
      >
        <InputContainer
          className={clsx(
            "cursor-pointer",
            "font-medium text-[0.875rem] leading-[1.25rem]",
            "text-[#000000] whitespace-nowrap",
            "w-full"
          )}
          onClick={handleClickDropdown}
        >
          {formattedValue}
          <InputLabel
            {...labelProps}
            className={clsx(
              "top-[25%] !left-[26px] translate-y-[-50%] text-[0.75rem]"
            )}
          />
        </InputContainer>

        {/* body */}
        {isOpen && (
          <div
            className={clsx(
              "absolute top-[-360px]",
              "z-10",
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.75rem]",
              "w-full",
              "rounded-[0.25rem]",
              "bg-[white]"
            )}
            style={{
              boxShadow: "0px 1px 8px 0px #1F293714",
            }}
          >
            <DayPickerActivityMobile
              date={date}
              onClickDate={handleSelectDate}
              onClickMonth={handleSelectMonth}
              onClickYear={handleSelectYear}
            />
          </div>
        )}

        {/* end body */}
      </div>
    </div>
  );
};
