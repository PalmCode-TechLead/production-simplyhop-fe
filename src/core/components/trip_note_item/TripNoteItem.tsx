import * as React from "react";
import clsx from "clsx";

export interface TripNoteItemProps {
  label?: string;
  note?: string;
}

export const TripNoteItem = ({ label = "", note = "" }: TripNoteItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
        {label}
      </p>
      <p className={clsx("text-[#606060] text-[0.75rem] font-normal")}>
        {note}
      </p>
    </div>
  );
};
