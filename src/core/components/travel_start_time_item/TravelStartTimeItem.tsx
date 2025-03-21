import * as React from "react";
import clsx from "clsx";

export interface TravelStartTimeItemProps {
  label?: string;
  time?: string;
}

export const TravelStartTimeItem = ({
  label = "",
  time = "",
}: TravelStartTimeItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]"
      )}
    >
      <span className={clsx("text-[#727272] text-[0.625rem] font-medium")}>
        {label}
      </span>
      <p className={clsx("text-[#000000] text-[0.875rem] font-semibold")}>
        {time}
      </p>
    </div>
  );
};
