import * as React from "react";
import clsx from "clsx";
import { MapPlanRideTrip } from "../fragments/map";
import { BadgePlanRideTrip } from "../fragments/badge";
import { FilterPlanRideTrip } from "../fragments/filter";
import { DetailPlanRideTrip } from "../fragments/detail";
import { NotificationPlanRideTrip } from "../fragments/notification";
import { IncompleteProfilePlaneRideTrip } from "../fragments/inncomplete_profile";

export const PlanRideTripContainer = () => {
  return (
    <>
      <div className={clsx("w-full h-full", "relative")}>
        <MapPlanRideTrip />
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div className={clsx("max-w-container", "w-full")}>
            <div
              className={clsx(
                "flex items-start justify-between",
                "w-full",
                "px-[1rem]"
              )}
            >
              <BadgePlanRideTrip />

              <IncompleteProfilePlaneRideTrip />
            </div>

            <FilterPlanRideTrip />
          </div>
        </div>
      </div>
      <DetailPlanRideTrip />
      <NotificationPlanRideTrip />
    </>
  );
};
