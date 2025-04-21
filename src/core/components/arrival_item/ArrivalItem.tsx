import * as React from "react";
import clsx from "clsx";

export interface ArrivalItemProps {
  place?: string;
  time?: string;
}

export const ArrivalItem = ({ place = "", time = "" }: ArrivalItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full"
      )}
    >
      <p
        className={clsx(
          "text-[0.75rem] font-normal text-[#8C8D89] truncate text-ellipsis",
          "w-full"
        )}
      >
        {place}
      </p>
      <p className={clsx("text-[0.875rem] font-semibold text-[black]")}>
        {time}
      </p>
    </div>
  );
};
