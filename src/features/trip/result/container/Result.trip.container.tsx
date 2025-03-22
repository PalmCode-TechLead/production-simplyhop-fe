import * as React from "react";
import clsx from "clsx";
import { FilterResultTrip } from "../fragments/filter";

export const ResultTripContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-rows-1 place-content-start place-items-start",
        "w-full",
        "pt-[1.5rem] pb-[0.75rem]",
        "relative"
      )}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[2.5rem]",
            "max-w-container w-full h-full"
          )}
        >
          <FilterResultTrip />
        </div>
      </div>
    </div>
  );
};
