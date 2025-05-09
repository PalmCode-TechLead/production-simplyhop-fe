"use client";
import * as React from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { DayPicker } from "../daypicker";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import { MonthPicker } from "../monthpicker";
import { YearPicker } from "../yearpicker";

export interface DatePickerProps {
  disabled?: boolean;
  value?: Date;
  labelProps?: InputLabelProps;
  inputContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  onSelect?: (data: Date) => void;
}

export const DatePicker = ({
  disabled = false,
  value = new Date(),
  labelProps,
  inputContainerProps,
  onSelect = () => {},
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [date, setDate] = React.useState<Date>(value);
  const [isDayShow, setIsDayShow] = React.useState<boolean>(false);
  const [isMonthShow, setIsMonthShow] = React.useState<boolean>(false);
  const [isYearShow, setIsYearShow] = React.useState<boolean>(false);

  const [position, setPosition] = React.useState<"above" | "below">("below");

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const updatePosition = React.useCallback(() => {
    const dropdownPosition =
      dropdownRef.current?.getBoundingClientRect().top ?? 0;
    const viewportHeight = window.innerHeight;

    if (dropdownPosition < viewportHeight / 2) {
      setPosition("below");
    } else {
      setPosition("above");
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true); // true supaya dia bisa detect scroll dalam container juga
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
    setIsDayShow(false);
    setIsMonthShow(false);
    setIsYearShow(false);
  });

  const handleClickDropdown = () => {
    setIsOpen((prev) => !prev);
    if (isOpen === true) {
      setIsDayShow(false);
      setIsMonthShow(false);
      setIsYearShow(false);
    } else {
      setIsDayShow(true);
    }
  };

  const handleClickMonth = () => {
    setIsDayShow(false);
    setIsMonthShow(true);
  };

  const handleSelectDate = (data: Date) => {
    setDate(data);
    setIsDayShow(false);
    setIsOpen(false);
    onSelect(data);
  };

  const handleClickYear = () => {
    setIsMonthShow(false);
    setIsYearShow(true);
  };

  const handleSelectMonth = (data: Date) => {
    const newDate = new Date(
      `${date.getFullYear()}-${
        data.getMonth() + 1 < 10
          ? `0${data.getMonth() + 1}`
          : data.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    );
    setDate(newDate);
    setIsMonthShow(false);
    setIsOpen(false);
    onSelect(newDate);
  };

  const handleSelectYear = (data: Date) => {
    const newDate = new Date(
      `${data.getFullYear()}-${
        data.getMonth() + 1 < 10
          ? `0${data.getMonth() + 1}`
          : data.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    );
    setDate(newDate);
    setIsYearShow(false);
    setIsOpen(false);
    onSelect(newDate);
  };

  const formattedValue = new Date(value).toLocaleString("de-DE", {
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
          {...inputContainerProps}
          className={clsx(
            disabled ? "cursor-default" : "cursor-pointer",
            "font-medium text-[0.875rem] leading-[1.25rem]",
            "text-[#000000] whitespace-nowrap",
            "w-full",
            disabled && "!bg-[#F6F6F6]",
            inputContainerProps?.className
          )}
          onClick={() => {
            if (disabled) return;
            handleClickDropdown();
          }}
        >
          {formattedValue}
          <InputLabel
            {...labelProps}
            className={clsx(
              "top-[25%] !left-[0.75rem] sm:!left-[26px] translate-y-[-50%] text-[0.75rem]"
            )}
          />
        </InputContainer>

        {/* body */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={clsx(
              "absolute",
              position === "below" ? "top-[4rem]" : "top-[-300px]",
              "!z-[40]",
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.75rem]",
              "w-full max-w-[306px]",
              "rounded-[0.25rem]",
              "bg-[white]"
            )}
            style={{
              backdropFilter: "blur(20px)",
              boxShadow: "0px 0px 25px 0px #969C9640",
            }}
          >
            <div
              className={clsx(
                "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.75rem]",
                "w-full max-w-[calc(258px+3rem)]",
                "px-[1.5rem] py-[1.5rem]"
              )}
            >
              {isDayShow && (
                <DayPicker
                  disablePast
                  date={date}
                  onClickMonth={handleClickMonth}
                  onClickDate={handleSelectDate}
                />
              )}

              {isMonthShow && (
                <MonthPicker
                  disablePast
                  date={date}
                  onClickYear={handleClickYear}
                  onClickMonth={handleSelectMonth}
                />
              )}

              {isYearShow && (
                <YearPicker
                  disablePast
                  date={date}
                  onClickYear={handleSelectYear}
                />
              )}
            </div>
          </div>
        )}

        {/* end body */}
      </div>
    </div>
  );
};
