import * as React from "react";
import clsx from "clsx";
import { MapPlanRideTrip } from "../fragments/map";
import { BadgePlanRideTrip } from "../fragments/badge";
import { FilterPlanRideTrip } from "../fragments/filter";

export const PlanRideTripContainer = () => {
  return (
    <div className={clsx("w-full h-full", "relative")}>
      <MapPlanRideTrip />
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full"
        )}
      >
        <div className={clsx("max-w-container", "w-full")}>
          <BadgePlanRideTrip />

          <FilterPlanRideTrip />
        </div>
      </div>
    </div>
  );
};
