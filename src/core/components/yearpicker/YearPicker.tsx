"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

const subtractYearNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();
  const newYear = year - number;
  const month = new Date(date).getMonth() + 1;
  const day = new Date().getDate();
  const newDate = new Date(
    `${newYear}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`
  );
  return newDate;
};

const addYearNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();
  const newYear = year + number;
  const month = new Date(date).getMonth() + 1;
  const day = new Date().getDate();
  const newDate = new Date(
    `${newYear}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`
  );
  return newDate;
};

const yearsAreEqual = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

type YearInfo = {
  year: Date; // 0 for January, 1 for February, ..., 11 for December
};

const generateYearList = (date: Date): YearInfo[] => {
  const years: YearInfo[] = [];

  // Loop through each month (0 for January, 1 for February, ..., 11 for December)
  for (let yearIndex = 0; yearIndex < 12; yearIndex++) {
    // months.push({ month, year });

    years.push({
      year: new Date(
        date.getFullYear() + yearIndex,
        date.getMonth(),
        date.getDate()
      ),
    });
  }

  return years;
};

export interface YearPickerActivityMobileProps {
  date?: Date;
  onClickYear?: (date: Date) => void;
}

export const YearPickerActivityMobile = ({
  date = new Date(),
  onClickYear = (date: Date) => {},
}: YearPickerActivityMobileProps) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  const calendarYears = generateYearList(newDate);

  const yearName = `${calendarYears[0].year.getFullYear()}-${calendarYears[
    calendarYears.length - 1
  ].year.getFullYear()}`;

  React.useEffect(() => {
    setNewDate(date);
  }, [date]);

  const handleClickNext = () => {
    setNewDate(addYearNumber(newDate, 12));
  };

  const handleClickPrevious = () => {
    setNewDate(subtractYearNumber(newDate, 12));
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.75rem]",
        "w-full",
        "px-[1rem] py-[1rem]"
      )}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] items-center content-center justify-start justify-items-start",
          "w-full"
        )}
      >
        <button onClick={handleClickPrevious}>
          <SVGIcon
            name="ChevronLeft"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[#5C5F62]")}
          />
        </button>

        <button
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full",
            "text-[15px] text-[#000000] font-medium"
          )}
        >
          {yearName}
        </button>

        <button onClick={handleClickNext}>
          <SVGIcon
            name="ChevronRight"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[#5C5F62]")}
          />
        </button>
      </div>
      {/* end header */}

      {/* body */}
      <div
        className={clsx(
          "grid grid-cols-3 place-content-start place-items-start gap-y-[0.5rem]",
          "w-full"
        )}
      >
        {calendarYears.map((calendarItem, calendarIndex) => (
          <button
            key={calendarIndex}
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full h-[44px]",
              "text-[14px] font-semibold",
              "rounded-[0.625rem]",
              yearsAreEqual(calendarItem.year, date)
                ? "bg-[#EEE9FD]"
                : "bg-transparent",
              yearsAreEqual(calendarItem.year, date)
                ? "text-[#6F47EB]"
                : "text-[#000000]"
            )}
            onClick={() => onClickYear(calendarItem.year)}
          >
            {calendarItem.year.toLocaleString("en-US", {
              year: "numeric",
            })}
          </button>
        ))}
      </div>
    </div>
  );
};
