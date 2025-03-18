import * as React from "react";
import clsx from "clsx";
import { MapFindRide } from "../fragments/map";
import { BadgeFindRide } from "../fragments/badge";
import { FilterFindRide } from "../fragments/filter";

export const FindRideContainer = () => {
  return (
    <div className={clsx("W-full h-full", "relative")}>
      <MapFindRide />
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full"
        )}
      >
        <div className={clsx("max-w-[1344px]", "w-full")}>
          <BadgeFindRide />

          <FilterFindRide />
        </div>
      </div>
    </div>
  );
};
