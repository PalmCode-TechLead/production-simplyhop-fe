import * as React from "react";
import clsx from "clsx";
import { MapFindTrip } from "../fragments/map";
import { BadgeFindTrip } from "../fragments/badge";
import { FilterFindTrip } from "../fragments/filter";

export const FindTripContainer = () => {
  return (
    <div className={clsx("W-full h-full", "relative")}>
      <MapFindTrip />
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full"
        )}
      >
        <div className={clsx("max-w-container", "w-full")}>
          <BadgeFindTrip />

          <FilterFindTrip />
        </div>
      </div>
    </div>
  );
};
