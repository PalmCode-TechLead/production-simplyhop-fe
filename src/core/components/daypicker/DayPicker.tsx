"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

const addYearNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth();

  let newYear = year + number;

  const day = new Date().getDate();
  const newDate = new Date(newYear, month, day);
  return newDate;
};

const subtractYearNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth();

  let newYear = year - number;

  const day = new Date().getDate();
  const newDate = new Date(newYear, month, day);
  return newDate;
};

const addMonthNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth();
  let newMonth = month + number;
  let newYear = year;
  if (newMonth > 12) {
    newMonth = newMonth - 12;
    newYear = year + 1;
  }

  const day = new Date().getDate();
  const newDate = new Date(newYear, newMonth, day);
  return newDate;
};

const subtractMonthNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth();
  let newMonth = month - number;
  let newYear = year;
  if (newMonth < 1) {
    newMonth = 12 - Math.abs(1 - newMonth) + 1;
    newYear = year - 1;
  }

  const day = new Date().getDate();
  const newDate = new Date(newYear, newMonth, day);
  return newDate;
};

type CalendarDate = {
  date: Date;
  isCurrentMonth: boolean;
};

const datesAreEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const generateCalendarDates = (year: number, month: number): CalendarDate[] => {
  const dates: CalendarDate[] = [];

  // Create a date object for the first day of the current month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  // Calculate the day of the week of the first day (0-6, Sunday-Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Calculate the total days in the current month
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Calculate the previous month's last day
  const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();

  // Fill the dates for the previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    dates.push({
      date: new Date(year, month - 2, lastDayOfPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Fill the dates for the current month
  for (let day = 1; day <= totalDaysInMonth; day++) {
    dates.push({
      date: new Date(year, month - 1, day),
      isCurrentMonth: true,
    });
  }

  // Fill the dates for the next month
  const daysInCalendar = dates.length;
  const totalDaysToFill = 42; // Assuming a 6x7 grid (6 weeks)
  for (let i = 1; daysInCalendar + i <= totalDaysToFill; i++) {
    dates.push({
      date: new Date(year, month, i),
      isCurrentMonth: false,
    });
  }

  return dates;
};

export interface DayPickerActivityMobileProps {
  date?: Date;
  onClickDate?: (date: Date) => void;
  onClickMonth?: (date: Date) => void;
  onClickYear?: (date: Date) => void;
}

export const DayPickerActivityMobile = ({
  date = new Date(),

  onClickDate = (date: Date) => {},
  onClickMonth = (date: Date) => {},
  onClickYear = (date: Date) => {},
}: DayPickerActivityMobileProps) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  const monthName = newDate.toLocaleString("en-US", {
    month: "long",
  });

  const yearName = newDate.toLocaleString("en-US", {
    year: "numeric",
  });

  const calendarDates = generateCalendarDates(
    newDate.getFullYear(),
    newDate.getMonth() + 1
  );

  React.useEffect(() => {
    setNewDate(date);
  }, [date]);

  const handleClickNextYear = () => {
    onClickYear(addYearNumber(newDate, 1));
  };

  const handleClickPreviousYear = () => {
    onClickYear(subtractYearNumber(newDate, 1));
  };

  const handleClickNextMonth = () => {
    onClickMonth(addMonthNumber(newDate, 1));
  };

  const handleClickPreviousMonth = () => {
    onClickMonth(subtractMonthNumber(newDate, 1));
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.75rem]",
        "w-full",
        "px-[1rem] py-[1rem]"
      )}
    >
      {/* year */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] items-center content-center justify-start justify-items-start",
          "w-full"
        )}
      >
        <button onClick={handleClickPreviousYear}>
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

        <button onClick={handleClickNextYear}>
          <SVGIcon
            name="ChevronRight"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[#5C5F62]")}
          />
        </button>
      </div>
      {/* end year */}

      {/* month */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] items-center content-center justify-start justify-items-start",
          "w-full"
        )}
      >
        <button onClick={handleClickPreviousMonth}>
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
          {monthName}
        </button>

        <button onClick={handleClickNextMonth}>
          <SVGIcon
            name="ChevronRight"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[#5C5F62]")}
          />
        </button>
      </div>
      {/* end month */}

      {/* body */}
      <div
        className={clsx(
          "grid grid-cols-7 place-content-start place-items-start gap-y-[0.5rem]",
          "w-full"
        )}
      >
        {calendarDates.map((calendarItem, calendarIndex) => (
          <button
            key={calendarIndex}
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "text-[14px] font-semibold",
              "rounded-[50%]",
              "w-[2rem] h-[2rem]",
              datesAreEqual(calendarItem.date, date)
                ? "bg-green-500"
                : "bg-transparent",

              datesAreEqual(calendarItem.date, date)
                ? "text-[white]"
                : calendarItem.isCurrentMonth &&
                  !datesAreEqual(calendarItem.date, date)
                ? "text-[#000000]"
                : "text-[#5C5F62]"
            )}
            disabled={!calendarItem.isCurrentMonth}
            onClick={() => onClickDate(calendarItem.date)}
          >
            {calendarItem.date.toLocaleString("en-US", {
              day: "numeric",
            })}
          </button>
        ))}
      </div>
    </div>
  );
};
