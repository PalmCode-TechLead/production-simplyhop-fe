"use client";
import * as React from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { DayPickerActivityMobile } from "../daypicker";
import Skeleton from "react-loading-skeleton";

export interface DatePickerProps {
  label?: string;
  value?: Date;
  disabled?: boolean;
  isLoading?: boolean;
  onSelect?: (data: Date) => void;
}

export const DatePicker = ({
  label = "",
  value = new Date(),
  disabled = false,
  isLoading = false,
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

  if (isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        {label.length > 0 && (
          <p className={clsx("text-[15px] text-[#212121] font-normal")}>
            {label}
          </p>
        )}

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full",
            "relative"
          )}
        >
          <div className="w-full">
            <Skeleton width={"100%"} height={39.5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {label.length > 0 && (
        <p className={clsx("text-[0.875rem] text-[#212121] font-semibold")}>
          {label}
        </p>
      )}

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full",
          "relative"
        )}
        ref={ref}
      >
        <button
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.75rem]",
            "w-full",
            "rounded-[0.75rem]",
            "px-[1rem] py-[0.625rem]",
            "bg-[#F9FAFB]",
            "text-[0.875rem] text-[#1D2939] font-normal",
            "border border-[#D0D5DD]"
          )}
          disabled={disabled}
          onClick={handleClickDropdown}
        >
          {formattedValue}

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.44444 7.55556V4M15.5556 7.55556V4M7.55556 11.1111H16.4444M5.77778 20H18.2222C19.2041 20 20 19.2041 20 18.2222V7.55556C20 6.57372 19.2041 5.77778 18.2222 5.77778H5.77778C4.79594 5.77778 4 6.57372 4 7.55556V18.2222C4 19.2041 4.79594 20 5.77778 20Z"
              stroke="#7857E0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* body */}
        {isOpen && (
          <div
            className={clsx(
              "absolute top-[60px]",
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
