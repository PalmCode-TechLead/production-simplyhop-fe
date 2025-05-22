import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");

export const weekdaysName = [...Array(7)].map((_, i) =>
  dayjs()
    .day((i + 1) % 7)
    .format("dd")
);

export const checkIsToday = (date: Date): boolean => {
  const inputDate = dayjs(date).startOf("day");
  const today = dayjs().startOf("day");

  return inputDate.isSame(today, "day") || inputDate.isBefore(today, "day");
};

export const checkIsBefore = (date: Date): boolean => {
  const inputDate = dayjs(date).startOf("day");
  const today = dayjs().startOf("day");

  return inputDate.isBefore(today, "day");
};

export const checkIsPreviousMonth = (date: Date): boolean => {
  const inputMonth = dayjs(date).startOf("month");
  const thisMonth = dayjs().startOf("month");

  return inputMonth.isBefore(thisMonth, "month");
};

export const checkIsPreviousYear = (date: Date): boolean => {
  const inputYear = dayjs(date).startOf("year");
  const thisYear = dayjs().startOf("year");

  return inputYear.isBefore(thisYear, "year");
};
