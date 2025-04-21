import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const setDurationTime = (value: number) => {
  const dur = dayjs.duration(value ?? 0, "seconds");

  const hours = String(dur.hours());
  const minutes = String(dur.minutes());

  const formatted = `${hours}h ${minutes}m`;
  return formatted;
};
