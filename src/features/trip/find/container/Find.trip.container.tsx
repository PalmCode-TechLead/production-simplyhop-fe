import * as React from "react";
import clsx from "clsx";
import { MapFindTrip } from "../fragments/map";
import { BadgeFindTrip } from "../fragments/badge";
import { FilterFindTrip } from "../fragments/filter";

export const FindTripContainer = () => {
  return (
    <div className={clsx("w-full h-full", "relative")}>
      <MapFindTrip />
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-stretch content-between justify-center justify-items-center",
          "absolute z-[10]",
          "w-full top-[0rem] h-[calc(100vh-90px)]",
          "pt-[1.5rem] pb-[0rem] lg:pb-[1.5rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 items-stretch content-between justify-start justify-items-start",
            "max-w-container",
            "w-full h-full"
          )}
        >
          <div
            className={clsx(
              "flex flex-col lg:flex-row items-start justify-between",
              "w-full h-full",
              "px-[1rem] lg:px-[0rem] pb-[1rem] lg:pb-[0rem]",
              "max-w-container"
            )}
          >
            <BadgeFindTrip />
          </div>

          <FilterFindTrip />
        </div>
      </div>
    </div>
  );
};
